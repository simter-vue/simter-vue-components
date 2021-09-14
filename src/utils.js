const g = window || global

/**
 * Flatten all leaf object to simple object array.
 *
 * Example :
 * 1. [{id: 1}, {id: 2}]
 *    flatten to
 *    [{id: 1}, {id: 2}]
 * 2. [{id: 1}, {children: [{id: 2}, {id: 3}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}]
 * 3. [{id: 1}, {children: [{id: 2}, {children: [{id: 3}, {id: 4}]}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
 */
function flatten(columns) {
  return columns.reduce(
    (a, b) => a.concat(b.children ? flatten(b.children) : b),
    []
  );
}

/** Get global key's value */
function getGlobalVariable(key, defaultValue) {
  if (g.hasOwnProperty(key)) return g[key]
  let p = g, value
  for (const k of key.split(".")) {
    if (p.hasOwnProperty(k)) value = p = p[k]
    else {
      value = undefined
      break
    }
  }
  return typeof value === "undefined" ? defaultValue : value
}

/** 
 * concat all class.
 * 
 * each class is String, Array or undefined.
 */
function concatClasses(...classes) {
  return classes.reduce((a, b) => {
    if (typeof b === "undefined") return a
    else {
      a = a.concat(b)
      return a
    }
  }, [])
}

/** 
 * concat all style.
 * 
 * each style is Json-Object or undefined.
 */
function concatStyles(...styles) {
  return styles.reduce((a, b) => {
    if (typeof b === "undefined") return a
    else return Object.assign(a, b)
  }, {})
}

/**
 * Get the file extension.
 * 
 * @param {String} filename the file name with extension, sucs as 'my.png'.
 * @returns the extension, such as 'png'
 */
 function getFileExtension(filename) {
  let i = filename.lastIndexOf(".");
  if (i !== -1) return filename.substring(i + 1);
  else return '';
}

/**
 * Format the byte size to a human reading size.
 * 
 * @param {Number} size the byte size
 * @returns human reading size, such as '2 KB'
 */
function getPrettySize(size) {
  if (size < 1024)
    return `${size} B`;
  else if (size < 1024 * 1024)
    return `${Math.round(size / 1024)} KB`;
  else if (size < 1024 * 1024 * 1024)
    return `${Math.round(size / 1024 / 1024)} MB`;
  else
    return `${Math.round(size / 1024 / 1024 / 1024)} GB`;
}

/**
 * Upload one file.
 *  
 * @param {Object} options 
 * @options {String} url - upload file to this server
 * @options {String} method - default POST
 * @options {Array} headers - external headers to send
 * @returns {Promise}
 */
function uploadOneFile(options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    // upload progress
    // don't use `xhr.addEventListener("progress", function (e) {...})`
    xhr.upload.addEventListener("progress", function (e) {
      let percent = Math.round((e.loaded / e.total) * 100); // 0~100
      if (options.progress) options.progress.call(this, {
        index: options.index,
        name: options.file.name,
        size: options.file.size,
        percent: percent
      });
    });

    // cancel upload
    xhr.addEventListener("abort", function (e) {
      reject(e);
    });

    // upload finished
    xhr.addEventListener("load", function (e) {
      let contentType = xhr.getResponseHeader('Content-Type');
      let result;
      if (contentType) {
        contentType = contentType.toLowerCase();
        if (contentType.indexOf('application/json') !== -1) // json
          if (xhr.responseText) result = JSON.parse(xhr.responseText)
          else result = null
        else if (contentType.startsWith('text/')) // text/plain、text/html
          result = xhr.responseText
        else // default text
          result = xhr.responseText
      } else result = xhr.responseText; // default text

      if (xhr.readyState === 4) resolve(result);
      else reject(result);
    });

    // upload error
    xhr.addEventListener("error", function (e) {
      reject(e);
    });

    // start upload
    xhr.open(options.method || "POST", options.url);
    if (options.headers) {
      options.headers.forEach(h => xhr.setRequestHeader(h.name, h.value));
    } else {
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    }
    xhr.send(options.file);
  });
}

export { g, getGlobalVariable as gv, flatten, concatClasses, concatStyles, getFileExtension, getPrettySize, uploadOneFile }
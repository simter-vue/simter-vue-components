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

export { g, getGlobalVariable as gv, flatten, concatClasses, concatStyles }
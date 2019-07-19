<template>
  <colgroup>
    <col v-for="(width, index) in widthArray" :style="{width: width}" :key="index" />
  </colgroup>
</template>

<script>
const component = {
  replace: true,
  props: {
    // The column's 'width' config array, like ['20px', '40px', ...]
    columns: { type: Array, required: true }
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     */
    widthArray() {
      return flatten(this.columns);
    }
  }
};

/**
 * Flatten complex object array to simple string array.
 *
 * Just deal with object's 'width' and 'children' key.
 *
 * Example :
 * 1. ['20px', '40px', ...] flatten to ['20px', '40px', ...]
 * 2. [{width: '20px'}, {width: '40px'}, ...] flatten to ['20px', '40px', ...]
 * 3. [{width: '20px'}, {children: [{width: '40px'}, {width: '60px'}]}, ...]
 *    flatten to ['20px', '40px', '60px', ...]
 */
const flatten = columns =>
  columns
    .reduce(
      (a, b) => a.concat(b.children ? flatten(b.children) : b.width || b),
      []
    )
    .map(a => (typeof a === "object" ? a.width : a));

export { flatten };
export default component;
</script>
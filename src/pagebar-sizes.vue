<script>
/**
 * Events: change(newValue, newIndex)
 */
import { gv } from "./utils";
import stButtonGroup from "./button-group.vue";
export default {
  extends: stButtonGroup,
  props: {
    rootClass: { type: String, required: false, default: "st-pagebar-sizes" },
    items: {
      type: Array,
      required: false,
      default: () => gv("simter.pagebar.pageSizes", [25, 50, 100])
    },
    value: {
      required: false,
      default: () => gv("simter.pagebar.pageSize", 25)
    },
    classes: {
      type: Object,
      required: false,
      default: () =>
        gv("simter.pagebarSizes.classes", {
          first: "first",
          last: "last"
        })
    },
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.pagebarSizes.styles", {})
    }
  }
};
</script>

<style>
.st-page-sizes {
  display: inline-flex;
}
.st-page-sizes > * {
  margin: 0;
}
</style>
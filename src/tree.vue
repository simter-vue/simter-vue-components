<template>
  <div :class="['st-tree', classes.root]">
    <div :class="{self: true, 'ui-state-hover': hover, 'ui-state-focus': node.selected}"
      @mouseenter="hover = true" @mouseleave="hover = false" @click.stop.prevent="clickMe($event)">
	  	<span class="indent" :style="{width: (depth * 16) + 'px'}"></span>
      <span @click.stop="toggle" class="toggle ui-icon"
        :class="collapsed ? 'ui-icon-triangle-1-e' : 'ui-icon-triangle-1-se'"
        :style="{visibility: leaf ? 'hidden' : 'visible'}">
      </span>
      <span :class="['icon', 'ui-icon', icon]"></span>
      <span class="label">{{node.label || node.id}}</span>
    </div>
    <div v-if="!leaf && !collapsed" class="children">
      <st-tree v-for="child in node[childrenKey]" :key="child.id || child.label" :node="child"></st-tree>
    </div>
  </div>
</template>

<script>
import { gv, concatClasses, concatStyles } from "./utils";

/** 递归计算节点的深度：顶层节点的深度为 0 */
function caculateDepth(node) {
  if (node.$parent && node.$parent.isNode)
    return 1 + caculateDepth(node.$parent);
  else return 0;
}

/** 获取节点所在树的根节点 */
function getRoot(node) {
  const p = node.$parent;
  if (p && p.isNode) return getRoot(p);
  else return node;
}

// node-structure: {id, label, leaf, collapsed, selected, children: [node1, node2, ..., nodeN]}
export default {
  name: 'st-tree',
  props: {
    node: { type: Object, required: true },
    defaultCollapsed: { type: Boolean, default: true },
    childrenKey: { type: String, default: 'children' },
    // All dom element class
    classes: {
      type: Object,
      required: false,
      default: () => gv("simter.tree.classes", {})
    },
    // All dom element style
    styles: {
      type: Object,
      required: false,
      default: () => gv("simter.tree.styles", {})
    }
  },
  data: function() {
    return {
      hover: false, // 节点是否处于鼠标悬停状态
      isNode: true,
      isRootNode: false,
      selectedNode: null
    };
  },
  created(){
    // 标记自身是否是根节点
    this.isRootNode = !this.$parent || (this.$parent && !this.$parent.isNode);

    // 如果设置为选中，则在树根上记录此节点
    const root = getRoot(this);
    if (this.node.selected) this.$set(root, 'selectedNode', this.node);
  },
  computed: {
    /** 是否是叶子节点 */
    leaf() {
      return Object.hasOwn(this.node, 'leaf') ? this.node.leaf : !Array.isArray(this.node[this.childrenKey]);
    },
    /** 是否展开节点 */
    collapsed() {
      return Object.hasOwn(this.node, 'collapsed') ? this.node.collapsed : this.defaultCollapsed;
    },
    /** 节点图标  */
    icon() {
      return this.node.icon ? this.node.icon : this.leaf ? "ui-icon-document" 
      : this.collapsed ? "ui-icon-folder-collapsed" : "ui-icon-folder-open";
    },
    /** 节点所在的深度：顶层节点的深度为 0 */
    depth() {
      return caculateDepth(this);
    }
  },
  methods: {			
    /** 折叠展开节点 */
    toggle() {
      this.$set(this.node, 'collapsed', !this.collapsed);
    },
    /** 用户点击节点的处理：选中节点并触发 change 事件 */
    clickMe($event) {
      // 避免重复触发 change 事件
      if (this.node.selected) return; 

      // 设置当前节点选中
      this.$set(this.node, 'selected', true);

      // 解除前一选中节点的选择
      const treeRoot = getRoot(this);
      const preSelectedNode = treeRoot.selectedNode;
      if (preSelectedNode) this.$set(preSelectedNode, 'selected', false);
      if (this !== treeRoot && treeRoot.node.selected) treeRoot.$set(treeRoot.node, 'selected', false);

      // 记录当前节点为新的选择节点
      treeRoot.selectedNode = this.node;

      // 在跟节点触发 change 事件
      treeRoot.$emit("change", this.node, preSelectedNode);
    }
  }
};
</script>

<style>
/** 树节点样式 */
.st-tree {
  min-width: 8em;
  overflow: auto;
}
.st-tree > div.self {
	position: relative;
	display: flex;
	flex-direction: row;
	border-width: 0;
	cursor: default;
	line-height: 1.8em;
}
.st-tree > .self > span {
	display: inline-block;
	flex: none;
}
.st-tree > .self > span:last-child {
	flex: 1 1 0%;
	padding-right: 0.25em;
}
.st-tree > .self > span.ui-icon {
	margin: calc((1.8em - 16px) / 2) 0;
}

/** 带树视图的样式 */
.st-tree-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;
  font-weight: normal;
}
.st-tree-view > .content {
  overflow: hidden;
  flex: 1 1 0%;
  display: flex;
  flex-direction: row;
}
.st-tree-view > .content > .st-tree {
  flex: none;
  overflow: auto;
}
.st-tree-view > .content > .st-grid {
  flex: 1 1 0%;
  overflow: auto;
}
.st-tree-view > .st-toolbar.ui-widget-content {
  border-width: 0 0 1px 0;
}
.st-tree-view > .content > .st-tree.ui-widget-content {
  border-width: 0 1px 0 0;
}
</style>

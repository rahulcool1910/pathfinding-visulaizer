<template>
  <div
    class="w-12 h-12 border border-1 border-black m-1"
    :class="getNodeClass()"
  ></div>
</template>
<script lang="ts">
import Vue from "vue";
import { INode } from "../utils/types/index";
export default Vue.extend({
  name: "Node",
  props: {
    nodeData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    typedNodeData(): INode {
      return this.nodeData as INode;
    },
  },
  methods: {
    getNodeClass() {
      let classes =
        (this.typedNodeData.isEndNode && `bg-red-100`) ||
        (this.typedNodeData.isStartNode && "bg-green-100") ||
        (this.typedNodeData.isBlock && "bg-black");
      return (
        classes + ` node-${this.typedNodeData.posX}-${this.typedNodeData.posY}`
      );
    },
  },
});
</script>
<style lang="scss"></style>

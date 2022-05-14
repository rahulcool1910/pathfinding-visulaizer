<!-- Please remove this file from your project -->
<template>
  <div class="">
    <div v-for="(row, index) in nodes" :key="index" class="flex flex-wrap">
      <Node
        v-for="(currNode, index) in row"
        :key="index"
        :nodeData="currNode"
      />
    </div>
    <button @click="getVisitedNodes">Visualize</button>
    <button @click="refreshNodes">Refresh</button>
  </div>
</template>

<script lang="ts">
import { thisTypeAnnotation } from "@babel/types";
import Vue from "vue";
import { mapState, Store } from "vuex";
import { createNodes } from "~/utils/Nodes";
import { INode } from "~/utils/types/index";
import { depthFirstSearch } from "~/utils/algorithms/DFS";

export default Vue.extend({
  name: "Grid",
  data() {
    return {
      gridRowSize: process.env.NODE_SIZE,
      gridColSize: process.env.NODE_SIZE,
    };
  },
  created() {
    this.$store.dispatch("node/getNodes");
  },
  computed: {
    nodes: function (): Array<Array<INode>> {
      return this.$store.state.node.nodes;
    },
  },
  watch: {
    nodes: function (updatedNodes: Array<Array<INode>>) {
      this.$store.commit("node/setNodes", updatedNodes);
    },
  },
  methods: {
    getVisitedNodes() {
      const deepClone = JSON.parse(JSON.stringify(this.nodes));
      const visitedNodes = depthFirstSearch(deepClone);
      console.log(
        "🚀 ~ file: Grid.vue ~ line 50 ~ visualize ~ depthFirstSearch(deepClone);",
        visitedNodes
      );
      this.visualize(visitedNodes);
    },
    visualize(visitedNodes: Array<INode>) {
      visitedNodes.forEach((node, index) => {
        console.log(
          "🚀 ~ file: Grid.vue ~ line 57 ~ visitedNodes.forEach ~ node",
          node.posX,
          node.posY
        );
        setTimeout(() => {
          if (!node.isEndNode || !node.isStartNode) {
            document
              .querySelector(`.node-${node.posX}-${node.posY}`)
              ?.classList.add("visited");
          }
        }, index * 30);
      });
    },
    refreshNodes() {
      this.nodes.forEach((row, index) => {
        row.forEach((node) => {
          if (!node.isEndNode || !node.isStartNode) {
            document
              .querySelector(`.node-${node.posX}-${node.posY}`)
              ?.classList.remove("visited");
          }
        }, index * 10);
      });
      this.$store.dispatch("node/getNodes");
    },
  },
});
</script>

<style scoped>
.visited {
  background-color: red;
  transition: all 1s;
}
</style>

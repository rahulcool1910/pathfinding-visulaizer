<!-- Please remove this file from your project -->
<template>
  <div class="w-full h-full">
    <Header :refreshNodes="refreshNodes" :getVisitedNodes="getVisitedNodes" :algorithms="algorithms"
      :disableButtons="disableButtons" />
    <!-- flex justify-center items-center w-[60%] -->
    <div class="flex justify-center items-center">
      <div class="grid-container">
        <div v-for="(row, index) in nodes" :key="index" class="flex flex-wrap">
          <Node v-for="(currNode, index) in row" :key="index" :nodeData="currNode" />
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, Store } from "vuex";
import { INode } from "~/utils/types/index";
import { depthFirstSearch } from "~/utils/algorithms/DFS";
import { breathFirstSearch } from "~/utils/algorithms/BFS";
import { AStar } from "~/utils/algorithms/AStar";
import Header from "./Header.vue";

export default Vue.extend({
  name: "Grid",
  data() {
    return {
      gridRowSize: process.env.NODE_SIZE,
      gridColSize: process.env.NODE_SIZE,
      algorithms: [
        "Breath First Search",
        "Depth First Search",
        "A Star algorithm",
      ],
      algorithmMap: {
        BFS: "Breath First Search",
        DFS: "Depth First Search",
        AStar: "A Star algorithm",
      },
      disableButtons: false,
      alreadyRendered: false
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
    getVisitedNodes(algorithm: string) {
      if (this.alreadyRendered) {
        this.refreshNodes(this.alreadyRendered)
      }
      this.alreadyRendered = true;
      this.disableButtons = true;
      const deepClone = JSON.parse(JSON.stringify(this.nodes));
      let visitedNodes: INode[] = []
      switch (algorithm) {
        case this.algorithmMap.BFS:
          visitedNodes = breathFirstSearch(deepClone);
          break;
        case this.algorithmMap.DFS:
          visitedNodes = depthFirstSearch(deepClone);
          break;
        case this.algorithmMap.AStar:
          visitedNodes = AStar(deepClone);
          break;
      }
      this.visualizeVisitedNode(deepClone, visitedNodes);
    },
    visualizeVisitedNode(nodes: Array<Array<INode>>, visitedNodes: Array<INode>) {
      let maxDelay = 0;
      nodes.forEach((row, index) => {
        row.forEach((node) => {
          maxDelay = Math.max(maxDelay, node.delay * 100);
          setTimeout(() => {
            if ((!node.isEndNode && !node.isStartNode && !node.isBlock) && node.isVisited) {
              document
                .querySelector(`.node-${node.posX}-${node.posY}`)
                ?.classList.add("node-visited");
            }
          }, node.delay * 100);
        });
      });
      setTimeout(() => {
        this.visualize(visitedNodes);
      }, maxDelay);
    },
    visualize(visitedNodes: Array<INode>) {
      let maxDelay = 0
      visitedNodes.forEach((node, index) => {

        setTimeout(() => {
          if (!node.isEndNode && !node.isStartNode) {
            document
              .querySelector(`.node-${node.posX}-${node.posY}`)
              ?.classList.add("visited");
          }
          maxDelay = Math.max(maxDelay, index * 30);
        }, index * 30);
      });
      setTimeout(() => {
        this.disableButtons = false;
      }, maxDelay)
    },
    refreshNodes(resetVisitedNodes: boolean = false) {
      console.log("🚀 ~ file: Grid.vue ~ line 118 ~ refreshNodes ~ resetVisitedNodes", resetVisitedNodes)

      this.nodes.forEach((row, index) => {
        row.forEach((node) => {
          node.isVisited = false;
          node.prev = undefined
          node.gScore = Infinity
          node.fScore = Infinity
          node.hScore = Infinity
          node.isPath = false
          node.delay = 0
          if (!node.isEndNode || !node.isStartNode) {

            document
              .querySelector(`.node-${node.posX}-${node.posY}`)
              ?.classList.remove("visited");
            document
              .querySelector(`.node-${node.posX}-${node.posY}`)
              ?.classList.remove("node-visited");
          }
        }, index * 10);
      });
      if (!resetVisitedNodes) {
        console.log("🚀 ~ file: Grid.vue ~ line 140 ~ refreshNodes ~ resetVisitedNodes", resetVisitedNodes)
        this.$store.dispatch("node/getNodes");

      }
    },
  },
  components: { Header }
});
</script>

<style scoped>
.node-visited {
  background-color: rgb(72, 247, 250);
  transition: all 1s;
}

.visited {
  background-color: red;
  transition: all 1s;
}

.grid-container {
  width: fit-content;
}
</style>

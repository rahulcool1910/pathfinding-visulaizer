import { INode } from "~/utils/types";
import { createNodes } from "~/utils/Nodes";
import { GetterTree, ActionTree, MutationTree } from "vuex";

// interface IRootState{
//   nodes:Array<Array<INode>>
// }
export const state = () => ({
  nodes: [] as Array<Array<INode>>,
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  setNodes(state, payload: Array<Array<INode>>) {
    state.nodes = payload;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  getNodes({ commit }) {
    const nodes = createNodes();
    nodes.forEach((row, index) => {
      row.forEach((node) => {
        if (Math.random() < 0.2) {
          node.isBlock = true;
        }
      });
    });
    const gridRowSize = parseInt(process.env.NODE_SIZE || "10"),
      gridColSize = parseInt(process.env.NODE_SIZE || "10");
    nodes[0][0].isStartNode = true;
    nodes[gridRowSize - 1][gridColSize - 1].isEndNode = true;
    commit("setNodes", nodes);
  },
};

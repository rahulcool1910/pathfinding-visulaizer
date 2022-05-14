import { INode } from "./types";

export const createNodes = () => {
  const nodeSize = parseInt(process.env.NODE_SIZE as string) || 50;
  const nodes: Array<Array<INode>> = [];
  // const rows = Math.floor(5.height / nodeSize);
  // const cols = Math.floor(p5.width / nodeSize);

  const rows = (process.env.NODE_SIZE || 10) as number;
  const cols = (process.env.NODE_SIZE || 10) as number;
  let nodeRow: Array<INode> = [];
  for (let indX = 0; indX < rows; indX++) {
    nodeRow = [];
    for (let indY = 0; indY < cols; indY++) {
      nodeRow.push(constructNode(indX, indY));
    }
    nodes.push(nodeRow);
  }
  return nodes;
};

const constructNode = (
  posX: number,
  posY: number,
  isVisited: boolean = false,
  isStartNode: boolean = false,
  isEndNode: boolean = false,
  isBlock: boolean = false,
  isPath: boolean = false
): INode => {
  return {
    posX,
    posY,
    isEndNode,
    isStartNode,
    isVisited,
    isPath,
    isBlock,
    toggleBlock: () => {
      (this as any).isBlock = !(this as any).isBlock;
    },
  };
};

import { INode } from "../types";

export const depthFirstSearch = (nodes: Array<Array<INode>>) => {
  console.log("🚀 ~ file: DFS.ts ~ line 4 ~ depthFirstSearch ~ nodes", nodes);
  const startNode = getStops(nodes, true);
  console.log(
    "🚀 ~ file: DFS.ts ~ line 6 ~ depthFirstSearch ~ startNode",
    startNode
  );
  const endNode = getStops(nodes);
  const visited: Array<INode> = [];
  let gridRowSize = 10;
  let gridColSize = 10;
  if (process.env.NODE_SIZE) {
    console.log(
      "🚀 ~ file: DFS.ts ~ line 15 ~ depthFirstSearch ~ process.env.NODE_SIZE",
      process.env.NODE_SIZE
    );
    gridRowSize = parseInt(process.env.NODE_SIZE);
    gridColSize = parseInt(process.env.NODE_SIZE);
  }
  const getNeightbours = (currNode: INode): Array<INode> => {
    const neightbours: Array<INode> = [];
    if (
      currNode.posX > 0 &&
      !nodes[currNode.posX - 1][currNode.posY].isBlock &&
      !nodes[currNode.posX - 1][currNode.posY].isVisited
    ) {
      neightbours.push(nodes[currNode.posX - 1][currNode.posY]);
    }
    if (
      currNode.posX < gridRowSize - 1 &&
      !nodes[currNode.posX + 1][currNode.posY].isBlock &&
      !nodes[currNode.posX + 1][currNode.posY].isVisited
    ) {
      neightbours.push(nodes[currNode.posX + 1][currNode.posY]);
    }
    if (
      currNode.posY > 0 &&
      !nodes[currNode.posX][currNode.posY - 1].isBlock &&
      !nodes[currNode.posX][currNode.posY - 1].isVisited
    ) {
      neightbours.push(nodes[currNode.posX][currNode.posY - 1]);
    }
    if (
      currNode.posY < gridColSize - 1 &&
      !nodes[currNode.posX][currNode.posY + 1].isBlock &&
      !nodes[currNode.posX][currNode.posY + 1].isVisited
    ) {
      neightbours.push(nodes[currNode.posX][currNode.posY + 1]);
    }
    return neightbours;
  };
  let pathFound = false;
  const visitNodes = (currNode: INode) => {
    console.log(
      "🚀 ~ file: DFS.ts ~ line 56 ~ visitNodes ~ currNode",
      currNode
    );
    if (currNode.isVisited) return;
    if (currNode.posX == endNode.posX && currNode.posY == endNode.posY) {
      pathFound = true;
      return;
    }
    currNode.isVisited = true;
    const neighbours = getNeightbours(currNode);
    for (let neighbour of neighbours) {
      console.log(
        "🚀 ~ file: DFS.ts ~ line 65 ~ visitNodes ~ neighbour",
        neighbour.posX,
        neighbour.posY,
        neighbour.prev,
        neighbour.isVisited
      );
    }
    for (let neighbour of neighbours) {
      //   console.log(
      //     "🚀 ~ file: DFS.ts ~ line 64 ~ visitNodes ~ neighbour",
      //     currNode.posX,
      //     currNode.posY,
      //     neighbour.posX,
      //     neighbour.posY
      //   );
      if (!neighbour.prev) {
        neighbour.prev = currNode;
        visitNodes(neighbour);
      }
    }
  };
  const visitNodeSet: Set<INode> = new Set();
  const getPath = (currEndNode: INode) => {
    if (visitNodeSet.has(currEndNode)) return;
    visitNodeSet.add(currEndNode);
    visited.unshift(currEndNode);
    if (currEndNode == startNode) return;
    if (currEndNode.prev) {
      getPath(currEndNode.prev);
    }
  };
  visitNodes(startNode);
  console.log(
    "🚀 ~ file: DFS.ts ~ line 69 ~ depthFirstSearch ~ startNode",
    startNode
  );
  console.log(
    "🚀 ~ file: DFS.ts ~ line 26 ~ visitNodes ~ pathFound",
    pathFound
  );
  console.log("🚀 ~ file: DFS.ts ~ line 115 ~ depthFirstSearch ~ nodes", nodes);
  if (pathFound) {
    getPath(endNode);
    return visited;
  }
  return [];
};

const getStops = (
  nodes: Array<Array<INode>>,
  getFirst: boolean = false
): INode => {
  for (let row of nodes) {
    if (getFirst) {
      const fileteredNodes = row.filter((node) => node.isStartNode);
      if (fileteredNodes.length > 0) {
        return fileteredNodes[0];
      }
    } else {
      const fileteredNodes = row.filter((node) => node.isEndNode);
      if (fileteredNodes.length > 0) {
        return fileteredNodes[0];
      }
    }
  }
  return nodes[0][0];
};

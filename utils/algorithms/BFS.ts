import Queue from "../DataStructures/Queue";
import { INode } from "../types";

export const breathFirstSearch = (nodes: Array<Array<INode>>) => {
  const startNode = getStops(nodes, true);
  const endNode = getStops(nodes);
  const visited: Array<INode> = [];
  let gridRowSize = 0;
  let gridColSize = 0;
  if (process.env.NODE_SIZE) {
    gridRowSize = parseInt(process.env.NODE_SIZE);
    gridColSize = parseInt(process.env.NODE_SIZE);
  }
  const getNeightbours = (currNode: INode): Array<INode> => {
    const neightbours: Array<INode> = [];
    if (
      currNode.posY < gridColSize - 1 &&
      !nodes[currNode.posX][currNode.posY + 1].isBlock &&
      !nodes[currNode.posX][currNode.posY + 1].isVisited
    ) {
      neightbours.push(nodes[currNode.posX][currNode.posY + 1]);
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
      currNode.posX > 0 &&
      !nodes[currNode.posX - 1][currNode.posY].isBlock &&
      !nodes[currNode.posX - 1][currNode.posY].isVisited
    ) {
      neightbours.push(nodes[currNode.posX - 1][currNode.posY]);
    }
    return neightbours;
  };
  let pathFound = false;
  const visitNodes = (currNode: INode) => {
    let queue = new Queue();
    queue.enqueue(currNode);
    while (!queue.isEmpty()) {
      const lastNode = queue.poll();
      if (!lastNode) break;
      if (lastNode.isVisited || pathFound) return;
      if (lastNode.posX == endNode.posX && lastNode.posY == endNode.posY) {
        pathFound = true;
        return;
      }
      lastNode.isVisited = true;
      const neighbours = getNeightbours(lastNode);
      for (let neighbour of neighbours) {
        if (!neighbour.prev) {
          neighbour.prev = lastNode;
          neighbour.delay = lastNode.delay + 1;
          queue.enqueue(neighbour);
        }
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

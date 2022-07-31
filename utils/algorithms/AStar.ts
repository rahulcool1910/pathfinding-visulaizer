import { INode } from "../types";

export const AStar = (nodes: Array<Array<INode>>) => {
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
      }
      const fileteredNodes = row.filter((node) => node.isEndNode);
      if (fileteredNodes.length > 0) {
        return fileteredNodes[0];
      }
    }
    return nodes[0][0];
  };
  const startNode = getStops(nodes, true);
  console.log("🚀 ~ file: AStar.ts ~ line 43 ~ AStar ~ startNode", startNode);
  const endNode = getStops(nodes);
  console.log("🚀 ~ file: AStar.ts ~ line 45 ~ AStar ~ endNode", endNode);
  let openSet: Array<INode> = new Array();
  const visited: Array<INode> = [];

  openSet.push(startNode);
  startNode.gScore = 0;
  startNode.fScore = 0;
  let gridRowSize = 10;
  let gridColSize = 10;
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

  const getHeuristicCost = (currNode: INode, endNode: INode) => {
    return Math.sqrt(
      Math.pow(endNode.posX - currNode.posX, 2) +
        Math.pow(endNode.posY - currNode.posY, 2)
    );
  };

  let pathFound = false;
  const visitNodes = (currNode: INode) => {
    if (currNode.isVisited) return;
    if (currNode.posX == endNode.posX && currNode.posY == endNode.posY) {
      pathFound = true;
      return;
    }

    while (openSet.length != 0) {
      openSet = openSet.sort((a, b) => a.fScore - b.fScore);
      const lowestFScoreNode = openSet[0];
      if (lowestFScoreNode == endNode) {
        pathFound = true;
        break;
      }
      openSet = openSet.filter((x) => x != lowestFScoreNode);
      lowestFScoreNode.isVisited = true;
      for (let neighbour of getNeightbours(lowestFScoreNode)) {
        const tentativeScore = lowestFScoreNode.gScore + 1;
        if (!openSet.some((x) => x == neighbour)) {
          openSet.push(neighbour);
        } else if (tentativeScore >= neighbour.gScore) continue;
        neighbour.prev = lowestFScoreNode;
        neighbour.gScore = tentativeScore;
        neighbour.fScore =
          neighbour.gScore + getHeuristicCost(neighbour, endNode);
      }
      // break;
      // const currNode=
    }
  };
  visitNodes(startNode);
  if (pathFound) {
    getPath(endNode);
    return visited;
  }
  return [];
};

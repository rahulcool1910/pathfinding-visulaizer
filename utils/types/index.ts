export interface INode {
  isVisited: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  isPath: boolean;
  isBlock: boolean;
  posX: number;
  posY: number;
  prev?: INode;
  toggleBlock: () => void;
  gScore: number;
  fScore: number;
  hScore: number;
}

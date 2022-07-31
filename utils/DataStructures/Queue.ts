import { INode } from "../types";

class Queue {
  private nodes: INode[];
  constructor() {
    this.nodes = [];
  }

  enqueue(node: INode) {
    this.nodes.push(node);
  }
  dequeue() {
    if (this.nodes.length > 0) return this.nodes[0];
    return null;
  }
  peek() {
    return this.nodes.length == 0 ? null : this.nodes[0];
  }
  poll() {
    return this.nodes.shift();
  }
  isEmpty() {
    return this.nodes.length == 0;
  }
}

export default Queue;

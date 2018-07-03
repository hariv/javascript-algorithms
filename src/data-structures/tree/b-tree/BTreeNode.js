export default class BTreeNode {
  constructor(degree = 0, isLeaf = true) {
    this.degree = degree;
    this.isLeaf = isLeaf;
    this.keys = new Array((2 * this.degree) - 1);
    this.children = new Array(2 * this.degree);
    this.numKeys = 0;
  }
}

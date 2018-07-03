export default class BTreeNode {
  constructor(degree = 0, isLeaf = true) {
    this.degree = degree;
    this.isLeaf = isLeaf;
    this.keys = new Array((2 * this.degree) - 1);
    this.children = new Array(2 * this.degree);
    this.numKeys = 0;
  }

  traversal() {
    let i;
    let traverse = [];
    for (i = 0; i < this.numKeys; i += 1) {
      if (!this.isLeaf) {
        traverse = traverse.concat(this.children[i].traversal());
      }
      traverse.push(this.keys[i]);
    }
    if (!this.isLeaf) {
      traverse = traverse.concat(this.children[i].traversal());
    }
    return traverse;
  }
}

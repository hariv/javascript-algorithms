import Comparator from '../../../utils/comparator/Comparator';

export default class BTreeNode {
  constructor(degree = 0, isLeaf = true) {
    this.degree = degree;
    this.isLeaf = isLeaf;
    this.keys = new Array((2 * this.degree) - 1);
    this.children = new Array(2 * this.degree);
    this.numKeys = 0;
    this.nodeComparator = new Comparator();
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

  find(value) {
    let i = 0;
    while (i < this.numKeys && value > this.keys[i]) {
      i += 1;
    }
    if (this.nodeComparator.equal(value, this.keys[i])) {
      return this;
    }
    if (this.isLeaf) {
      return null;
    }
    return this.children[i].find(value);
  }
}

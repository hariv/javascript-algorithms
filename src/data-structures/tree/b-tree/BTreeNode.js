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

  setKeys(value) {
    this.numKeys = value;
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

  insert(value) {
    let i = this.numKeys - 1;
    if (this.isLeaf) {
      while (i >= 0 && this.keys[i] > value) {
        this.keys[i + 1] = this.keys[i];
        i -= 1;
      }
      this.keys[i + 1] = value;
      this.numKeys += 1;
    } else {
      while (i >= 0 && this.keys[i] > value) {
        i -= 1;
      }
      if (this.children[i + 1].numKeys === (2 * this.degree) - 1) {
        this.splitChild(i + 1, this.children[i + 1]);
        if (this.keys[i + 1] < value) {
          i += 1;
        }
      }
      this.children[i + 1].insert(value);
    }
  }

  splitChild(i, node) {
    const temp = new BTreeNode(node.degree, node.isLeaf);
    let j;
    temp.numKeys = this.degree - 1;
    for (j = 0; j < this.degree - 1; j += 1) {
      temp.keys[j] = node.keys[j + this.degree];
    }
    if (!node.isLeaf) {
      for (j = 0; j < this.degree; j += 1) {
        temp.children[j] = node.children[j + this.degree];
      }
    }
    node.setKeys(this.degree - 1);
    for (j = this.numKeys; j >= i + 1; j -= 1) {
      this.children[j + 1] = this.children[j];
    }
    this.children[i + 1] = temp;
    for (j = this.numKeys - 1; j >= i; j -= 1) {
      this.keys[j + 1] = this.keys[j];
    }
    this.keys[i] = node.keys[this.degree - 1];
    this.numKeys = this.numKeys + 1;
  }
}

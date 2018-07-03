import BTreeNode from './BTreeNode';

export default class BTree {
  constructor(degree = 0) {
    this.root = null;
    this.degree = degree;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new BTreeNode(this.degree, true);
      this.root.keys[0] = value;
      this.root.numKeys = 1;
    } else {
      if (root.numKeys === (2 * this.degree) - 1) {
        let i = 0;
        const newRoot = new BTreeNode(this.degree, false);
        newRoot.children[0] = this.root;
        newRoot.splitChild(0, this.root);
        if (newRoot.keys[0] < value) {
          i += 1;
        }
        newRoot.children[i].insert(value);
        this.root = newRoot;
      } else {
        this.root.insert(value);
      }
    }
  }
}

import { BinaryTreeNode } from './tree/node';
import { dfsRecursive } from './tree/operators';

const root = new BinaryTreeNode<number>(
	10,
	new BinaryTreeNode<number>(
		5,
		new BinaryTreeNode<number>(
			3,
			new BinaryTreeNode<number>(1),
			new BinaryTreeNode<number>(-3)
		),
		new BinaryTreeNode<number>(2)
	),
	new BinaryTreeNode<number>(
		7,
		new BinaryTreeNode<number>(
			3,
			new BinaryTreeNode<number>(-10),
			new BinaryTreeNode<number>(-20)
		),
		new BinaryTreeNode<number>(
			2,
			new BinaryTreeNode<number>(-100),
			new BinaryTreeNode<number>(-200)
		)
	)
);

dfsRecursive(
	root,
	(value) => console.log(value)
	//	(value) => console.log(value)
);

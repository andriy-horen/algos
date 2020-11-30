import { BinaryTreeNode } from './tree/node';
import { dfs } from './tree/operators';

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

const preValues: number[] = [];
dfs(root, (value) => preValues.push(value), { recursive: true, order: 'pre' });
console.log(`pre-order: ${preValues}`);

const inValues: number[] = [];
dfs(root, (value) => inValues.push(value), { recursive: true, order: 'in' });
console.log(`in-order: ${inValues}`);

const postValues: number[] = [];
dfs(root, (value) => postValues.push(value), {
	recursive: true,
	order: 'post',
});
console.log(`post-order: ${postValues}`);

const iterativeValues: number[] = [];
dfs(root, (value) => iterativeValues.push(value), {
	recursive: false,
	order: 'post',
});
console.log(`iterative: ${iterativeValues}`);

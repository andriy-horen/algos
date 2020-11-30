import { BinaryTreeNode } from './node';

export function dfs<T>(
	root: BinaryTreeNode<T>,
	callback: (
		value: T,
		node: BinaryTreeNode<T>,
		root: BinaryTreeNode<T>
	) => void,
	options: {
		recursive: boolean;
		order: 'pre' | 'in' | 'post';
	} = { recursive: false, order: 'in' }
): void {
	if (options.recursive) {
		return dfsRecursive(root, callback, options.order);
	}
	return dfsIterative(root, callback);
}

function dfsRecursive<T>(
	root: BinaryTreeNode<T>,
	callback: (
		value: T,
		node: BinaryTreeNode<T>,
		root: BinaryTreeNode<T>
	) => void,
	order: 'pre' | 'in' | 'post'
) {
	if (!root) {
		return;
	}
	const recursive = (node: BinaryTreeNode<T>) => {
		if (order === 'pre') {
			callback(node.value, node, root);
		}
		if (node.left) {
			recursive(node.left);
		}
		if (order === 'in') {
			callback(node.value, node, root);
		}
		if (node.right) {
			recursive(node.right);
		}
		if (order === 'post') {
			callback(node.value, node, root);
		}
	};

	recursive(root);
}

function dfsIterative<T>(
	root: BinaryTreeNode<T>,
	callback: (
		value: T,
		node: BinaryTreeNode<T>,
		root: BinaryTreeNode<T>
	) => void
) {
	if (!root) {
		return;
	}

	const stack = [root];
	while (stack.length > 0) {
		const current = stack.pop() as BinaryTreeNode<T>;
		callback(current.value, current, root);
		if (current.right) {
			stack.push(current.right);
		}
		if (current.left) {
			stack.push(current.left);
		}
	}
}

export function bfs<T>(
	root: BinaryTreeNode<T>,
	callback: (
		value: T,
		node: BinaryTreeNode<T>,
		root: BinaryTreeNode<T>
	) => void
): void {
	console.log(root);
	console.log(callback);
}

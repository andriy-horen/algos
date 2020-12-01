import { BinaryTreeNode } from './node';

export type NodeVisitCallback<T> = (
	value: T,
	node: BinaryTreeNode<T>,
	root: BinaryTreeNode<T>
) => void;

export function dfsRecursive<T>(
	root: BinaryTreeNode<T>,
	preOrderCallback?: NodeVisitCallback<T> | null,
	inOrderCallback?: NodeVisitCallback<T> | null,
	postOrderCallback?: NodeVisitCallback<T> | null
): void {
	if (!root) {
		return;
	}

	const dfsInternal = (node: BinaryTreeNode<T>) => {
		preOrderCallback?.(node.value, node, root);
		if (node.left) {
			dfsInternal(node.left);
		}
		inOrderCallback?.(node.value, node, root);
		if (node.right) {
			dfsInternal(node.right);
		}
		postOrderCallback?.(node.value, node, root);
	};

	dfsInternal(root);
}

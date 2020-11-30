import { LinkedList } from './list';
import { LinkedListNode } from './node';

export function checkArgument(
	arg: unknown,
	name: string,
	predicate: (arg: unknown) => boolean = (arg) => arg == null
): void {
	if (predicate(arg)) {
		throw new Error(
			`Wrong argument '${name}', reason: ${predicate.toString()}`
		);
	}
}

export function from<T>(values: T[]): LinkedList<T> {
	checkArgument(values, 'values');

	const list = new LinkedList<T>();
	values.forEach((v) => list.addLast(v));

	return list;
}

export function includes<T>(list: LinkedList<T>, value: T): boolean {
	checkArgument(list, 'list');

	const node = find(list, (v) => value === v);
	return node !== undefined;
}

export function entries<T>(list: LinkedList<T>): LinkedListNode<T>[] {
	checkArgument(list, 'list');

	const result: LinkedListNode<T>[] = [];
	traverse(list, (_, node) => {
		result.push(node);
	});

	return result;
}

export function values<T>(list: LinkedList<T>): T[] {
	checkArgument(list, 'list');

	const result: T[] = [];
	traverse(list, (value) => {
		result.push(value);
	});

	return result;
}

export function traverse<T>(
	list: LinkedList<T>,
	callback: (
		element: T,
		node: LinkedListNode<T>,
		list: LinkedList<T>
	) => boolean | void,
	nodeSelector: (
		node: LinkedListNode<T>
	) => LinkedListNode<T> | null | undefined = (node) => node.next
): void {
	checkArgument(list, 'list');
	checkArgument(callback, 'callback');

	let current = list.head;
	while (current != null) {
		if (callback(current.value, current, list)) {
			break;
		}

		current = nodeSelector(current) ?? null;
	}
}

export function reverse<T>(list: LinkedList<T>): LinkedList<T> {
	checkArgument(list, 'list');

	let prevNode: LinkedListNode<T> | null = null;
	let nextNode: LinkedListNode<T> | null = null;
	traverse(
		list,
		(_, currNode) => {
			nextNode = currNode.next;
			prevNode = currNode.prev;

			currNode.next = prevNode;
			currNode.prev = nextNode;

			prevNode = currNode;
		},
		() => nextNode
	);

	[list['_head'], list['_tail']] = [list['_tail'], list['_head']];

	return list;
}

export function find<T>(
	list: LinkedList<T>,
	callback: (
		element: T,
		node: LinkedListNode<T>,
		list: LinkedList<T>
	) => boolean
): LinkedListNode<T> | undefined {
	checkArgument(list, 'list');
	checkArgument(callback, 'callback');

	let result: LinkedListNode<T> | undefined;
	traverse(list, (value, node) => {
		if (callback(value, node, list)) {
			result = node;
			return true;
		}
	});

	return result;
}

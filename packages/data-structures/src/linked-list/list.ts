import { LinkedListNode } from './node';
import { checkArgument, values } from './operators';

export class LinkedList<T> {
	private _head: LinkedListNode<T> | null = null;
	private _tail: LinkedListNode<T> | null = null;
	private _size = 0;

	constructor(values?: T[]) {
		values?.forEach((v) => this.addLast(v));
	}

	get head(): LinkedListNode<T> | null {
		return this._head;
	}

	get tail(): LinkedListNode<T> | null {
		return this._tail;
	}

	get size(): number {
		return this._size;
	}

	addFirst(value: T): void {
		const node = new LinkedListNode(value, this._head, null, this);
		if (this._size === 0) {
			this._head = this._tail = node;
			this._size++;
			return;
		}

		if (!this._head) {
			throw new Error(
				"Wrong linked list state. Head node can't be null or undefined"
			);
		}

		this._head.prev = node;
		this._head = node;
		this._size++;
	}

	addLast(value: T): void {
		const node = new LinkedListNode(value, null, this._tail, this);
		if (this._size === 0) {
			this._head = this._tail = node;
			this._size++;
			return;
		}

		if (!this._tail) {
			throw new Error(
				"Wrong linked list state. Tail node can't be null or undefined"
			);
		}

		this._tail.next = node;
		this._tail = node;
		this._size++;
	}

	delete(node: LinkedListNode<T>): void {
		checkArgument(node, 'node');

		if (node.list !== this) {
			return;
		}

		if (this._size === 0) {
			return;
		}

		const nextNode = node.next;
		const prevNode = node.prev;

		if (node === this._head) {
			this._head = nextNode;
			if (this._head) {
				this._head.prev = null;
			}
		} else if (node === this._tail) {
			this._tail = prevNode;
			if (this._tail) {
				this._tail.next = null;
			}
		} else {
			if (!nextNode || !prevNode) {
				throw new Error(
					"Wrong linked list state. Adjacent nodes can't be null or undefined"
				);
			}

			prevNode.next = nextNode;
			nextNode.prev = prevNode;
		}
		this._size--;
	}

	deleteFirst(): void {
		if (this._head) {
			this.delete(this._head);
		}
	}

	deleteLast(): void {
		if (this._tail) {
			this.delete(this._tail);
		}
	}

	toString(): string {
		return values(this).toString();
	}
}

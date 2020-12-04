import { mod, nextPow2 } from '../utils';

export class Deque<T> implements Iterable<T> {
	private readonly _minCapacity = 16;
	private readonly _maxCapacity = Math.pow(2, 32) - 1;
	private _head = 0;
	private _capacity = this._minCapacity;
	private _length = 0;

	private get _tail(): number {
		return mod(this._head + this._length - 1, this._capacity);
	}

	private get _tailNext(): number {
		return mod(this._head + this._length, this._capacity);
	}

	[key: number]: T | undefined;

	constructor(array?: T[]) {
		if (array != null) {
			this.ensureCapacity(array.length);
			for (let i = 0; i < array.length; i++) {
				this[i] = array[i];
			}
			this._length = array.length;
		}
	}

	get capacity(): number {
		return this._capacity;
	}

	get length(): number {
		return this._length;
	}

	public push(value: T): number {
		this.ensureCapacity(this._length + 1);
		this[this._tailNext] = value;

		return ++this._length;
	}

	public pop(): T | undefined {
		if (this._length === 0) {
			return undefined;
		}

		const deleted = this[this._tail];
		this[this._tail] = undefined;
		this._length--;

		return deleted;
	}

	public shift(): T | undefined {
		if (this._length === 0) {
			return undefined;
		}
		const deleted = this[this._head];
		this[this._head] = undefined;
		this._head = mod(this._head + 1, this._capacity);
		this._length--;

		return deleted;
	}

	public unshift(value: T): number {
		this.ensureCapacity(this._length + 1);
		const index = mod(this._head - 1, this._capacity);
		this[index] = value;
		this._head = index;

		return ++this._length;
	}

	public toString(): string {
		return [...this].toString();
	}

	[Symbol.iterator](): Iterator<T> {
		let index = 0;
		return {
			next: (): IteratorResult<T> => {
				if (index < this._length) {
					const result = {
						value: this[
							mod(index + this._head, this._capacity)
						] as T,
						done: false,
					};
					index++;
					return result;
				}
				return { value: undefined, done: true };
			},
		};
	}

	private moveValues(
		srcIndex: number,
		destIndex: number,
		length: number
	): void {
		for (let i = 0; i < length; i++) {
			this[i + destIndex] = this[i + srcIndex];
			this[i + srcIndex] = undefined;
		}
	}

	private ensureCapacity(capacity: number): void {
		if (this._capacity < capacity) {
			let nextCapacity = nextPow2(Math.max(capacity, this._minCapacity));
			nextCapacity = Math.min(nextCapacity, this._maxCapacity);

			this.moveValues(0, this._capacity, this._head);
			this._capacity = nextCapacity;
		}
	}
}

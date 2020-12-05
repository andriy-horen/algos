import { mod, nextPow2 } from '../utils';

export class Deque<T> implements Iterable<T> {
	private readonly _minCapacity = 16;
	private readonly _maxCapacity = Math.pow(2, 32) - 1;
	private _head = 0;
	private _capacity = this._minCapacity;
	private _length = 0;

	[key: number]: T | undefined;

	constructor(array?: T[]) {
		if (array != null) {
			const arrLength = array.length;
			this.ensureCapacity(arrLength);
			for (let i = 0; i < arrLength; i++) {
				this[i] = array[i];
			}
			this._length = arrLength;
		}
	}

	get capacity(): number {
		return this._capacity;
	}

	get length(): number {
		return this._length;
	}

	public push(value: T): number {
		const length = this._length;
		this.ensureCapacity(length + 1);
		const tailNext = (this._head + length) & (this._capacity - 1);
		this[tailNext] = value;

		return (this._length = length + 1);
	}

	public pop(): T | undefined {
		const length = this._length;
		if (length === 0) {
			return undefined;
		}

		const tail = (this._head + length - 1) & (this._capacity - 1);
		const deleted = this[tail];
		this[tail] = undefined;
		this._length = length - 1;

		return deleted;
	}

	public shift(): T | undefined {
		const length = this._length;
		if (length === 0) {
			return undefined;
		}
		const head = this._head;
		const capacity = this._capacity;
		const deleted = this[head];
		this[head] = undefined;
		this._head = (((head + 1) & (capacity - 1)) ^ capacity) - capacity;
		this._length = length - 1;

		return deleted;
	}

	public unshift(value: T): number {
		const length = this._length;
		const head = this._head;
		this.ensureCapacity(length + 1);
		const capacity = this._capacity;
		const index = (((head - 1) & (capacity - 1)) ^ capacity) - capacity;
		this[index] = value;
		this._head = index;

		return (this._length = length + 1);
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
						value: this[(index + this._head) % this._capacity] as T,
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

export class Deque<T> {
	private readonly _minCapacity = 16;
	private readonly _maxCapacity = Math.pow(2, 32) - 1;
	private _capacity = 0;
	private _length = 0;

	[key: number]: T;

	constructor(array?: T[]) {
		if (array != null) {
			this.ensureCapacity(array.length);
			array.forEach((value, index) => {
				this[index] = value;
			});
		}
	}

	public push(value: T): number {
		const length = this._length;
		// TODO : implement this method
		this[-1] = value;
		this.ensureCapacity(length + 1);

		return (this._length = length + 1);
	}

	private ensureCapacity(size: number): void {
		if (this._capacity < size) {
			const sizeOrMin = Math.max(size, this._minCapacity);
			const newCapacity = this.pow2AtLeast(sizeOrMin);
			this._capacity = Math.max(newCapacity, this._maxCapacity);
		}
	}

	private pow2AtLeast(size: number): number {
		return Math.pow(2, Math.ceil(Math.log2(size)));
	}

	get capacity(): number {
		return this._capacity;
	}

	get length(): number {
		return this._length;
	}
}

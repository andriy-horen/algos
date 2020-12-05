import { Deque } from './deque';

describe('Deque constructor', () => {
	test('it should create an empty collection', () => {
		const deq = new Deque();
		expect(deq).toBeDefined();
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16);
	});

	test('it should create collection from an array', () => {
		const deq = new Deque([0, 10, 100, 1000]);
		expect(deq).toBeDefined();
		expect(deq.length).toEqual(4);
		expect(deq.capacity).toEqual(16);
	});

	test('it should create collection from an empty array', () => {
		const deq = new Deque([]);
		expect(deq).toBeDefined();
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16);
	});

	test('it should create collection from an array bigger than default capacity', () => {
		const deq = new Deque(Array(100).fill(0));
		expect(deq).toBeDefined();
		expect(deq.length).toEqual(100);
		expect(deq.capacity).toEqual(128);
	});
});

describe('Symbol.iterator', () => {
	test('it should return all values', () => {
		const deq = new Deque([1, 2, 3, 4, 5, 6, 7]);

		expect([...deq]).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});

	test('it should return an empty array', () => {
		const deq1 = new Deque();
		const deq2 = new Deque([]);

		expect([...deq1]).toEqual([]);
		expect([...deq2]).toEqual([]);
	});

	test('it should return an empty array when all elements were removed', () => {
		const deq = new Deque([1, 2, 3]);

		deq.shift();
		deq.shift();
		deq.shift();

		expect([...deq]).toEqual([]);
	});

	test('it should return values in correct order when the buffer is rotated <==', () => {
		const deq = new Deque([1, 2, 3]);
		deq.unshift(-10);
		deq.unshift(-100);

		expect([...deq]).toEqual([-100, -10, 1, 2, 3]);
	});

	test('it should return values in correct order when the buffer is rotated ==>', () => {
		// prettier-ignore
		const deq = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
		deq.shift();
		deq.shift();
		deq.push(1000);
		deq.push(10_000);

		// prettier-ignore
		expect([...deq]).toEqual([3,4,5,6,7,8,9,10,11,12,13,14,15,16,1000,10000]);
	});

	test('it should return values in correct order when an array is bigger than initial capacity', () => {
		// prettier-ignore
		const deq = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32]);

		// prettier-ignore
		expect([...deq]).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32]);
	});

	test('it should return values in correct order when elements were removed from both ends', () => {
		const deq = new Deque([1, 2, 3, 4, 5]);
		deq.shift();
		deq.pop();

		expect([...deq]).toEqual([2, 3, 4]);
	});

	test('it should return values in correct order when elements were added to both ends', () => {
		const deq = new Deque([1, 2, 3, 4, 5]);
		deq.unshift(-100);
		deq.push(100);

		expect([...deq]).toEqual([-100, 1, 2, 3, 4, 5, 100]);
	});
});

describe('Push method', () => {
	test('it should push elements into a collection', () => {
		const deq = new Deque();
		const len1 = deq.push(1);

		expect(len1).toEqual(1);
		expect(deq.length).toEqual(1);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([1]);

		const len2 = deq.push(2);

		expect(len2).toEqual(2);
		expect(deq.length).toEqual(2);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([1, 2]);

		const len3 = deq.push(3);

		expect(len3).toEqual(3);
		expect(deq.length).toEqual(3);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([1, 2, 3]);
	});

	test('it should push elements into a collection with pre-existing elements', () => {
		const deq = new Deque([-100, -10, 0]);
		const len1 = deq.push(1);

		expect(len1).toEqual(4);
		expect(deq.length).toEqual(4);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([-100, -10, 0, 1]);

		const len2 = deq.push(2);

		expect(len2).toEqual(5);
		expect(deq.length).toEqual(5);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([-100, -10, 0, 1, 2]);

		const len3 = deq.push(3);

		expect(len3).toEqual(6);
		expect(deq.length).toEqual(6);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([-100, -10, 0, 1, 2, 3]);
	});

	test('it should push element when capacity is reached', () => {
		// prettier-ignore
		const deq = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
		expect(deq.length).toEqual(deq.capacity);
		const len = deq.push(100);

		expect(len).toEqual(17);
		expect(deq.length).toEqual(17);
		expect(deq.capacity).toEqual(32);
		// prettier-ignore
		expect([...deq]).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,100]);
	});

	test('it should push elements when the buffer is rotated ==>', () => {
		// prettier-ignore
		const deq = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
		deq.shift();
		deq.shift();
		deq.push(-1000);
		deq.push(-100);

		expect(deq.length).toEqual(16);
		expect(deq.capacity).toEqual(16);
		// prettier-ignore
		expect([...deq]).toEqual([3,4,5,6,7,8,9,10,11,12,13,14,15,16,-1000,-100]);
	});

	test('it should push many elements', () => {
		const deq = new Deque();
		for (let i = 0; i < 10_000; i++) {
			deq.push(Math.random());
		}

		expect(deq.length).toEqual(10_000);
		expect(deq.capacity).toEqual(16384);
	});
});

describe('Pop method', () => {
	test('it should do nothing when collection is empty', () => {
		const deq = new Deque();
		const result = deq.pop();

		expect(result).toBeUndefined();
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16);
	});

	test('it should remove and return elements from the back', () => {
		const deq = new Deque([100, -10, -100]);

		const el1 = deq.pop();

		expect(el1).toEqual(-100);
		expect(deq.length).toEqual(2);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([100, -10]);

		const el2 = deq.pop();

		expect(el2).toEqual(-10);
		expect(deq.length).toEqual(1);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([100]);

		const el3 = deq.pop();

		expect(el3).toEqual(100);
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([]);
	});

	test('it should remove many elements', () => {
		const deq = new Deque(Array(10_000).fill(0));

		for (let i = 0; i < 5000; i++) {
			deq.pop();
		}
		expect(deq.length).toEqual(5000);
		expect(deq.capacity).toEqual(16384);

		for (let i = 0; i < 5000; i++) {
			deq.pop();
		}
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16384);
	});
});

describe('Unshift method', () => {
	test('it should add elements into a collection', () => {
		const deq = new Deque();
		const len1 = deq.unshift(1);

		expect(len1).toEqual(1);
		expect(deq.length).toEqual(1);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([1]);

		const len2 = deq.unshift(2);

		expect(len2).toEqual(2);
		expect(deq.length).toEqual(2);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([2, 1]);

		const len3 = deq.unshift(3);

		expect(len3).toEqual(3);
		expect(deq.length).toEqual(3);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([3, 2, 1]);
	});

	test('it should add elements into a collection with pre-existing elements', () => {
		const deq = new Deque([-100, -10, 0]);
		const len1 = deq.unshift(1);

		expect(len1).toEqual(4);
		expect(deq.length).toEqual(4);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([1, -100, -10, 0]);

		const len2 = deq.unshift(2);

		expect(len2).toEqual(5);
		expect(deq.length).toEqual(5);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([2, 1, -100, -10, 0]);

		const len3 = deq.unshift(3);

		expect(len3).toEqual(6);
		expect(deq.length).toEqual(6);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([3, 2, 1, -100, -10, 0]);
	});

	test('it should add element when capacity is reached', () => {
		// prettier-ignore
		const deq = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
		expect(deq.length).toEqual(deq.capacity);
		const len = deq.unshift(100);

		expect(len).toEqual(17);
		expect(deq.length).toEqual(17);
		expect(deq.capacity).toEqual(32);
		// prettier-ignore
		expect([...deq]).toEqual([100,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
	});

	test('it should add elements when the buffer is rotated <==', () => {
		// prettier-ignore
		const deq = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
		deq.unshift(-1000);
		deq.unshift(-100);

		expect(deq.length).toEqual(16);
		expect(deq.capacity).toEqual(16);
		// prettier-ignore
		expect([...deq]).toEqual([-100,-1000,1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
	});

	test('it should add many elements', () => {
		const deq = new Deque();
		for (let i = 0; i < 10_000; i++) {
			deq.unshift(Math.random());
		}

		expect(deq.length).toEqual(10_000);
		expect(deq.capacity).toEqual(16384);
	});
});

describe('Shift method', () => {
	test('it should do nothing when collection is empty', () => {
		const deq = new Deque();
		const result = deq.shift();

		expect(result).toBeUndefined();
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16);
	});

	test('it should remove and return elements from the front', () => {
		const deq = new Deque([100, -10, -100]);

		const el1 = deq.shift();

		expect(el1).toEqual(100);
		expect(deq.length).toEqual(2);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([-10, -100]);

		const el2 = deq.shift();

		expect(el2).toEqual(-10);
		expect(deq.length).toEqual(1);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([-100]);

		const el3 = deq.shift();

		expect(el3).toEqual(-100);
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16);
		expect([...deq]).toEqual([]);
	});

	test('it should remove many elements', () => {
		const deq = new Deque(Array(10_000).fill(0));

		for (let i = 0; i < 5000; i++) {
			deq.shift();
		}
		expect(deq.length).toEqual(5000);
		expect(deq.capacity).toEqual(16384);

		for (let i = 0; i < 5000; i++) {
			deq.shift();
		}
		expect(deq.length).toEqual(0);
		expect(deq.capacity).toEqual(16384);
	});
});

describe('ToString method', () => {
	test('should convert collection to a string', () => {
		const deq = new Deque([100, 10, 0, -9, -99, -999]);

		expect(deq.toString()).toEqual('100,10,0,-9,-99,-999');
	});
});

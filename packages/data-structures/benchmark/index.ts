import { add, complete, cycle, save, suite } from 'benny';
import { Deque } from '../src/deque/deque';

[100, 1000, 10_000, 100_000, 1_000_000].forEach((size) => {
	const pow10 = Math.log10(size);

	const deq = new Deque<number>();
	const array: number[] = [];

	for (let i = 0; i < size; i++) {
		deq.push(i);
		array.push(i);
	}

	suite(
		`shift and then push element - ${size} elements`,
		add('deque', () => {
			const p1 = deq.shift() as number;
			const p2 = deq.shift() as number;
			const p3 = deq.shift() as number;

			deq.push(p1 >> 1);
			deq.push(p2 >> 1);
			deq.push(p3 >> 1);
		}),
		add('built-in array', () => {
			const p1 = array.shift() as number;
			const p2 = array.shift() as number;
			const p3 = array.shift() as number;

			array.push(p1 >> 1);
			array.push(p2 >> 1);
			array.push(p3 >> 1);
		}),
		complete(),
		cycle(),
		save({ file: `shift-push-10pow${pow10}` })
	);

	suite(
		`pop and then unshift element - ${size} elements`,
		add('deque', () => {
			const p1 = deq.pop() as number;
			const p2 = deq.pop() as number;
			const p3 = deq.pop() as number;

			deq.unshift(p1 >> 1);
			deq.unshift(p2 >> 1);
			deq.unshift(p3 >> 1);
		}),
		add('built-in array', () => {
			const p1 = array.pop() as number;
			const p2 = array.pop() as number;
			const p3 = array.pop() as number;

			array.unshift(p1 >> 1);
			array.unshift(p2 >> 1);
			array.unshift(p3 >> 1);
		}),
		complete(),
		cycle(),
		save({ file: `pop-unshift-10pow${pow10}` })
	);

	suite(
		`pop and then push element - ${size} elements`,
		add('deque', () => {
			const p1 = deq.pop() as number;
			const p2 = deq.pop() as number;
			const p3 = deq.pop() as number;

			deq.push(p1 >> 1);
			deq.push(p2 >> 1);
			deq.push(p3 >> 1);
		}),
		add('built-in array', () => {
			const p1 = array.pop() as number;
			const p2 = array.pop() as number;
			const p3 = array.pop() as number;

			array.push(p1 >> 1);
			array.push(p2 >> 1);
			array.push(p3 >> 1);
		}),
		complete(),
		cycle(),
		save({ file: `pop-push-10pow${pow10}` })
	);
});

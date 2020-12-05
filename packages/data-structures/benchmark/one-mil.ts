import { add, complete, cycle, save, suite } from 'benny';
import { Deque } from '../src/deque/deque';

const deq = new Deque<number>();
const array: number[] = [];

for (let i = 0; i < 1_000_000; i++) {
	deq.push(i);
	array.push(i);
}

suite(
	'1mil: shift and then push element',
	add('deque', () => {
		deq.push(deq.shift() as number);
	}),
	add('built-in array', () => {
		array.push(array.shift() as number);
	}),
	complete(),
	cycle(),
	save({ file: 'shift-push-1mil' })
);

suite(
	'1mil: pop and then unshift element',
	add('deque', () => {
		deq.unshift(deq.pop() as number);
	}),
	add('built-in array', () => {
		array.unshift(array.pop() as number);
	}),
	complete(),
	cycle(),
	save({ file: 'pop-unshift-1mil' })
);

suite(
	'1mil: pop and then push element',
	add('deque', () => {
		deq.push(deq.pop() as number);
	}),
	add('built-in array', () => {
		array.push(array.pop() as number);
	}),
	complete(),
	cycle(),
	save({ file: 'pop-unshift-1mil' })
);

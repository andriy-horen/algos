export function mod(value: number, modulus: number): number {
	return ((value % modulus) + modulus) % modulus;
}

export function nextPow2(value: number): number {
	return Math.pow(2, Math.ceil(Math.log2(value)));
}

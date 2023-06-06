export function capitalize(str: string) {
	return str[0].toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string) {
	return str
		.split(" ")
		.map((word: string) => capitalize(word))
		.join(" ");
}


// TODO: fix this, time is funky
export function formatTimeDiff(futureDate: Date) {
	const formatter = new Intl.RelativeTimeFormat("fr-ca", { style: "short" });
	return formatter.format(
		Math.ceil(Math.abs((Date.now() - futureDate.getTime()) / 1000)),
		"minutes",
	);
}

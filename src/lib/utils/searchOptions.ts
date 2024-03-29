import fuzzysort from "fuzzysort";
import type { Option } from "$lib/types";

/**
 * Search the given list of options with indices for the given input, returning a ranked
 * list of results. If given, results with scores less than the threshold are excluded.
 */
export default function searchOptions<T extends Option>(
	input: string,
	options: T[],
	threshold: number = -100000,
) {
	const results: { option: T; score: number }[] = [];

	options.forEach((option) => {
		const result = fuzzysort.single(input, option.label);
		if (result !== null && result.score >= threshold) {
			results.push({ option, score: result.score });
		}
	});

	return results
		.sort(({ score: s1 }, { score: s2 }) => s2 - s1)
		.map(({ option }) => option);
}

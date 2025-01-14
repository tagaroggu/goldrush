import { escape } from './escapeCodes.ts';

const spinnerChars = ['|', '/', '-', '\\'];

/**
 * Configuration options for the {@link spinner}.
 */
export type SpinnerOptions = {
	speed: number;
	spinnerChars: string[];
	reverse: boolean;
};

/**
 * Simple defaults for the {@link spinner}.
 */
export const spinnerDefaultOptions: SpinnerOptions = Object.freeze({
	speed: 100,
	spinnerChars: spinnerChars,
	reverse: false,
});

/**
 * Renders a spinner to stdout until signal promise settles.
 * @param { Promise<unknown> } signal A promise that ends the spinner when settled
 * @param { SpinnerOptions } options Configuration options with simple defaults
 */
export function spinner(
	signal: Promise<unknown>,
	options: SpinnerOptions = spinnerDefaultOptions,
) {
	let spinnerChars;
	if (options.reverse) {
		spinnerChars = options.spinnerChars.toReversed();
	} else {
		spinnerChars = Array.from(options.spinnerChars);
	}
	const encoder = new TextEncoder();
	let counter = 0;
	const interval = setInterval(() => {
		Deno.stdout.write(
			encoder.encode(`${escape}2K\r${spinnerChars[counter]}`),
		);
		counter = (counter + 1) % spinnerChars.length;
	}, options.speed);

	signal.finally(() => {
		clearInterval(interval);
		Deno.stdout.write(encoder.encode(`${escape}2K\r`));
	});
}

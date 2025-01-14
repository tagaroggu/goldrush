import { escape } from './escapeCodes.ts';

/**
 * Renders a loading bar to the console. Once all dependencies resolve or
 * one rejects, the returned promise resolves or rejects accordingly.
 * @param { Promise<unknown>[] } dependencies Array of dependencies as promises
 * @returns { Promise<void> } When dependencies have all resolved or one rejects
 */
export function loadingBar(dependencies: Promise<unknown>[]) {
	const promise = Promise.withResolvers();
	const statuses = Array.from({ length: dependencies.length }).fill(false) as boolean[];
	const encoder = new TextEncoder();
	function render() {
		const count = statuses.reduce((acc, current) => acc + (current ? 1 : 0), 0);
		// Out of 20 instead of out of 100. 100 is too wide. Maybe I should make a big one?
		const percentage = Math.round(count / statuses.length * 20);
		Deno.stdout.write(encoder.encode(`${escape}2K\r[${'>'.repeat(percentage)}|${'<'.repeat(20 - percentage)}] ${count}/${statuses.length}`));
	}
	render();

	dependencies.forEach((p, idx) => p.then(() => { statuses[idx] = true; render() }, promise.reject));

	Promise.all(dependencies).finally(() => {
		// I think final render of loading bar is handled by deps?
		//render()
		Deno.stdout.write(encoder.encode(`\r\n`));
		promise.resolve(void 0)
	});

	return promise.promise;
}

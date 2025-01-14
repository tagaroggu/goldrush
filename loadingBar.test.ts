import { loadingBar } from './loadingBar.ts';

loadingBar(
	Array.from({ length: 10 }).map((_, idx) => {
		return new Promise((res) =>
			setTimeout(() => res(null), (idx + 1) * 1000)
		);
	}),
);

import { spinner, spinnerDefaultOptions } from './spinner.ts';

const p = Promise.withResolvers();

spinner(p.promise, { ...spinnerDefaultOptions, reverse: true });

setTimeout(() => {
	p.resolve(null);
}, 10000);

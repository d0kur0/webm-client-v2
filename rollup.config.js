import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import autoPreprocess from 'svelte-preprocess';
import rootImport from 'rollup-plugin-root-import';
import { terser } from 'rollup-plugin-terser';
import replace from "@rollup/plugin-replace";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		rootImport({
			// Will first look in `client/src/*` and then `common/src/*`.
			root: `${__dirname}/src`,
			useInput: 'prepend',

			// If we don't find the file verbatim, try adding these extensions
			extensions: ['.js', '.css', '.scss', '.svelte'],
		}),

		svelte({
			preprocess: autoPreprocess({ /* options */ }),
			// enable run-time checks when not in production
			dev: !production
		}),

		replace({
			'process.env.API_GATEWAY': process.env.API_GATEWAY,
			__buildDate__: () => JSON.stringify(new Date()),
			__buildVersion: 15
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}

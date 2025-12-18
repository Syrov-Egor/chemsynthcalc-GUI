export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "chemsynthcalc-web/_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.2JbXyX50.js",app:"_app/immutable/entry/app.3IlxcDJU.js",imports:["_app/immutable/entry/start.2JbXyX50.js","_app/immutable/chunks/BFZTVHB9.js","_app/immutable/chunks/B6W70GN8.js","_app/immutable/chunks/D5UXVDI6.js","_app/immutable/chunks/CLYxfnS6.js","_app/immutable/chunks/B7Q5PLhJ.js","_app/immutable/entry/app.3IlxcDJU.js","_app/immutable/chunks/D5UXVDI6.js","_app/immutable/chunks/CLYxfnS6.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/B6W70GN8.js","_app/immutable/chunks/BY-H0LNi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/chemsynthcalc-web/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

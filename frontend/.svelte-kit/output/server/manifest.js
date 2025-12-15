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
		client: {start:"_app/immutable/entry/start.B6snR8XV.js",app:"_app/immutable/entry/app.VQuSJ7-Y.js",imports:["_app/immutable/entry/start.B6snR8XV.js","_app/immutable/chunks/ZyG7EKGz.js","_app/immutable/chunks/BtsWN2a7.js","_app/immutable/chunks/D3naMzxk.js","_app/immutable/entry/app.VQuSJ7-Y.js","_app/immutable/chunks/D3naMzxk.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BtsWN2a7.js","_app/immutable/chunks/DUUgjQVT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

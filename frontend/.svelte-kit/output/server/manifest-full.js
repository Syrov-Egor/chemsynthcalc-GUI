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
		client: {start:"_app/immutable/entry/start.Bwy_30wd.js",app:"_app/immutable/entry/app.DaTBrgw2.js",imports:["_app/immutable/entry/start.Bwy_30wd.js","_app/immutable/chunks/yz89to6n.js","_app/immutable/chunks/CLOWO3cj.js","_app/immutable/chunks/x_oHaOdR.js","_app/immutable/chunks/DSpi4xlk.js","_app/immutable/entry/app.DaTBrgw2.js","_app/immutable/chunks/x_oHaOdR.js","_app/immutable/chunks/DSpi4xlk.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CLOWO3cj.js","_app/immutable/chunks/Bf6NhmA2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

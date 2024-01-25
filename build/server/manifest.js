const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.AuYjqhQ2.js","app":"_app/immutable/entry/app.00bRKE5S.js","imports":["_app/immutable/entry/start.AuYjqhQ2.js","_app/immutable/chunks/entry.Q8sIUFoN.js","_app/immutable/chunks/scheduler.NkQNw4MU.js","_app/immutable/entry/app.00bRKE5S.js","_app/immutable/chunks/scheduler.NkQNw4MU.js","_app/immutable/chunks/index.4AO7vsMF.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-shnDtHHP.js')),
			__memo(() => import('./chunks/1-DJBdjQHR.js')),
			__memo(() => import('./chunks/2-TYlAO8pU.js')),
			__memo(() => import('./chunks/3-S0Q0LxP0.js')),
			__memo(() => import('./chunks/4--UDMg8Dy.js')),
			__memo(() => import('./chunks/5-MAc0WW6d.js')),
			__memo(() => import('./chunks/6-6HWjGuRW.js')),
			__memo(() => import('./chunks/7-qP11kv_l.js')),
			__memo(() => import('./chunks/8-RavYrAiX.js')),
			__memo(() => import('./chunks/9-918yBqP4.js')),
			__memo(() => import('./chunks/10-wa2bar3J.js')),
			__memo(() => import('./chunks/11-z2LSuyFn.js')),
			__memo(() => import('./chunks/12-3i8xg5PQ.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/racer/edit",
				pattern: /^\/racer\/edit\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/racer/list",
				pattern: /^\/racer\/list\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/racer/new",
				pattern: /^\/racer\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/racer/view",
				pattern: /^\/racer\/view\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/race/edit",
				pattern: /^\/race\/edit\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/race/list",
				pattern: /^\/race\/list\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/race/new",
				pattern: /^\/race\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/race/view",
				pattern: /^\/race\/view\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/user/view",
				pattern: /^\/user\/view\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map

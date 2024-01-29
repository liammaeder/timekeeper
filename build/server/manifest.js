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
		client: {"start":"_app/immutable/entry/start.ys8hFgPa.js","app":"_app/immutable/entry/app.7KBZ6UAF.js","imports":["_app/immutable/entry/start.ys8hFgPa.js","_app/immutable/chunks/entry.ZhzxUwSn.js","_app/immutable/chunks/scheduler.VJAV7p4G.js","_app/immutable/entry/app.7KBZ6UAF.js","_app/immutable/chunks/scheduler.VJAV7p4G.js","_app/immutable/chunks/index.HE3XRmx2.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-OB46BIQn.js')),
			__memo(() => import('./chunks/1-hS7v-lgz.js')),
			__memo(() => import('./chunks/2-H4xGYCS1.js')),
			__memo(() => import('./chunks/3-6IzhazDW.js')),
			__memo(() => import('./chunks/4-JJB8Zmzg.js')),
			__memo(() => import('./chunks/5-Xa83zxBL.js')),
			__memo(() => import('./chunks/6-wniuWTQD.js')),
			__memo(() => import('./chunks/7-ITUj4_81.js')),
			__memo(() => import('./chunks/8-gHa1rvwZ.js')),
			__memo(() => import('./chunks/9-rY_VKE7r.js')),
			__memo(() => import('./chunks/10-T3j0V3_F.js')),
			__memo(() => import('./chunks/11-A1nbO7Cu.js')),
			__memo(() => import('./chunks/12-8ZFgiZ7s.js'))
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

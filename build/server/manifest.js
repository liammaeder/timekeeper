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
        client: {
            "start": "_app/immutable/entry/start.Ez2s9RjM.js",
            "app": "_app/immutable/entry/app.sscIjeim.js",
            "imports": ["_app/immutable/entry/start.Ez2s9RjM.js", "_app/immutable/chunks/entry.gv6I8rP8.js", "_app/immutable/chunks/scheduler.uLYmYrce.js", "_app/immutable/chunks/index._ceT3Oor.js", "_app/immutable/entry/app.sscIjeim.js", "_app/immutable/chunks/scheduler.uLYmYrce.js", "_app/immutable/chunks/index.UMDBvbzV.js"],
            "stylesheets": [],
            "fonts": [],
            "uses_env_dynamic_public": false
        },
        nodes: [
            __memo(() => import('./chunks/0-KqJ3nWYl.js')),
            __memo(() => import('./chunks/1-eSTe8CFN.js')),
            __memo(() => import('./chunks/2-QtbmKgGH.js')),
            __memo(() => import('./chunks/3-mlRIa_PF.js')),
            __memo(() => import('./chunks/4-alAWZM3O.js')),
            __memo(() => import('./chunks/5-w6LUbgz8.js')),
            __memo(() => import('./chunks/6-Ma7IgYdr.js')),
            __memo(() => import('./chunks/7-MHn8uVh_.js')),
            __memo(() => import('./chunks/8-MWwrBACe.js')),
            __memo(() => import('./chunks/9-Ls3ICNLk.js')),
            __memo(() => import('./chunks/10-mwSA9q9L.js')),
            __memo(() => import('./chunks/11-I6MZRk5v.js')),
            __memo(() => import('./chunks/12-BeVYboxg.js'))
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

            return {};
        },
        server_assets: {}
    }
}
})();

const prerendered = new Set([]);

const base = "";

export {base, manifest, prerendered};
//# sourceMappingURL=manifest.js.map

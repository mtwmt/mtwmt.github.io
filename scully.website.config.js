"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var scully_1 = require("@scullyio/scully");
var scully_plugin_time_to_read_1 = require("scully-plugin-time-to-read");
scully_1.setPluginConfig('md', { enableSyntaxHighlighting: true });
scully_1.setPluginConfig(scully_plugin_time_to_read_1.timeToRead, {
    path: '',
});
exports.config = {
    projectRoot: './src',
    projectName: 'website',
    outDir: './dist/static',
    routes: {
        '/blog/:slug': {
            type: scully_1.RouteTypes.contentFolder,
            slug: {
                folder: './blog',
            },
        },
    },
};

const { build } = require("esbuild");

const { config } = require("./common");
build(Object.assign(config, { watch: true }));

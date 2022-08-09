const { copy } = require("esbuild-plugin-copy");

const entries = {
  background: "src/background/background.ts",
  app: "src/app/index.tsx",
};

module.exports.config = {
  bundle: true,
  // drop: ["console", "debugger"],

  entryPoints: entries,
  ignoreAnnotations: true,
  inject: ["./scripts/react-shim.js"],
  loader: { ".ts": "ts", ".tsx": "tsx" },
  logLevel: "info",
  metafile: true,
  minify: process.env.NODE_ENV !== "development",
  outdir: "dist",
  platform: "browser",
  sourcemap: false,
  target: "es2020",
  tsconfig: "./tsconfig.json",

  plugins: [
    copy({
      assets: {
        from: ["./public/*"],
        to: ["./"],
      },
    }),
  ],
};

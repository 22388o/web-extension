const { build } = require("esbuild");
const { copy } = require("esbuild-plugin-copy");

const entries = {
  extension: "src/extension/index.tsx",
};

build({
  bundle: true,
  drop: ["console", "debugger"],
  entryPoints: entries,
  ignoreAnnotations: true,
  loader: { ".ts": "ts", ".tsx": "tsx" },
  logLevel: "info",
  metafile: true,
  minify: process.env.NODE_ENV !== "development",
  outdir: "dist",
  platform: "browser",
  sourcemap: process.env.NODE_ENV === "development",
  target: "es2020",
  tsconfig: "./tsconfig.json",

  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./public/*"],
      },
    }),
  ],
});

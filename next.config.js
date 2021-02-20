//const withTM = require('next-transpile-modules')(['@babylonjs']);
const withTM = require("next-transpile-modules")(["@babylonjs/core"]);
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  target: "serverless",
  webpack: function (config) {
    /// below is not required for the problem described. Just for reference.(es6)
    config.module.rules.push({ test: /\.yml$/, use: "raw-loader" });
    return config;
  },
};

module.exports = withPlugins([withTM], nextConfig);

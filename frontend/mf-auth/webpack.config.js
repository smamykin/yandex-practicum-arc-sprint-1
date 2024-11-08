const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "fourcheese-pizza",
    projectName: "mf-auth",
    argv,
    webpackConfigEnv: {
      ...webpackConfigEnv,
      standalone: true
    },
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: [
      ...defaultConfig.externals,
      "@fourcheese-pizza/mf-common",
    ]
  });
};

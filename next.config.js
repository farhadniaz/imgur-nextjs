require("dotenv").config();
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const path = require("path");
module.exports = withCSS(
  withLess(
    withSass({
      cssModules: false /** antd doesn't implement by using cssModule */,
      lessLoaderOptions: {
        /** for enabling less to use antd */
        javascriptEnabled: true,
      },
      serverRuntimeConfig: {
        IMGURClientID: process.env.IMGURClientID,
        IMGURClientSecret: process.env.IMGURClientSecret,
        IMGUR_BASE_API_URL: process.env.IMGUR,
      },
      publicRuntimeConfig: {
        BASE_API_URL: process.env.BASE_API_URL,
      },
      webpack: (config, { isServer }) => {
        config.resolve.alias["~"] = path.resolve(__dirname);

        /*  https://stackoverflow.com/questions/57542802/how-to-configure-nextjs-9-and-ant-design-less-compatibility/57543812#57543812 */
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
          });
        }
        return config;
      },
    })
  )
);

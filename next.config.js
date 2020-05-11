const withSourceMaps = require('@zeit/next-source-maps')();
const TerserPlugin = require('terser-webpack-plugin');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX(
  withSourceMaps({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    target: 'serverless',
    webpack: (config, options) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
      };

      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
        config.resolve.alias['react-dom$'] = 'react-dom/profiling';
        config.resolve.alias['scheduler/tracing'] =
          'scheduler/tracing-profiling';
        // config.optimization.minimizer = [
        //   new TerserPlugin({
        //     terserOptions: {
        //       keep_classnames: true,
        //       keep_fnames: true,
        //     },
        //   }),
        // ];
      }
      /* config.module.rules.push({
        test: /\.mdx?$/,
        use: 'raw-loader',
      }); */

      return config;
    },
    experimental: {
      async rewrites() {
        return [{ source: '/sitemap.xml', destination: '/api/sitemap.xml' }];
      },
      catchAllRouting: true,
    },
  })
);

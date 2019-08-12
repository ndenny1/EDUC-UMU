module.exports = {
  transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/],
  // When running in VueCLI development mode (npm run serve) proxy calls through the intended backend API route
  // To override, see .env.development file
  devServer: {
    host: "localhost",
    proxy: {
    // Using reduce syntax to represent multiple mount points
    // https://github.com/vuejs/vue-cli/issues/2285#issuecomment-462061125
      ...['/api', '/getok/api'].reduce(
        (acc, ctx) => ({
          ...acc,
          [ctx]: {
            target: process.env.VUE_APP_API_ROOT,
            changeOrigin: true,
            ws: false
          }
        }),
        {}
      ),
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/test/'
};

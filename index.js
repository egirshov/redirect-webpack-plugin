const { RawSource } = require("webpack-sources");

module.exports = class RedirectWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const { redirects } = this.options;

    compiler.plugin("emit", (compilation, cb) => {
      Object.keys(redirects).forEach(from => {
        const to = redirects[from];

        const html = `<!DOCTYPE html lang='en'>
<html>
  <head>
    <meta charset="utf-8">
    <noscript><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${to}" /></noscript>
    <script>window.location = window.location.origin + '${to}' + window.location.search</script>
  </head>
</html>`

        compilation.assets[`${from}/index.html`] = new RawSource(html)
      });

      cb();
    });
  }
};

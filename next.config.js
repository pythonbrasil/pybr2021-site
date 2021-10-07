module.exports = {
  distDir: "build",
  target: "serverless",
  async rewrites() {
    return [
      {
        source: "/doacoes",
        destination: "/doacoes.html",
      },
      {
        source: "/doacoes.html",
        destination: "/doacoes.html",
      },
      {
        source: "/",
        destination: "/index.html",
      },
    ];
  },
}

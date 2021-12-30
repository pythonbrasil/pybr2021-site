module.exports = {
  target: "serverless",
  async rewrites() {
    return [
      {
        source: "/doacoes",
        destination: "/doacoes.html",
      },
      {
        source: "/prestacao-contas",
        destination: "/prestacao-contas.html",
      },
      {
        source: "/perguntas-frequentes",
        destination: "/perguntas-frequentes.html",
      },
      {
        source: "/",
        destination: "/index.html",
      },
    ];
  },
}

/**
 * Proxies localhost to the Feb 19, 2026 Vercel deployment only.
 * No local Next app is run; every request is forwarded to the deployment.
 */
const http = require("http");
const https = require("https");

const FEB19_URL = "https://beckford-site-napp8yiz2-michelle-ackers.vercel.app";
const PORT = Number(process.env.PORT) || 3001;

function requestBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

const server = http.createServer(async (req, res) => {
  const path = (req.url || "/").replace(/^\/$/, "") || "";
  const targetUrl = `${FEB19_URL}${path.startsWith("/") ? path : "/" + path}`;

  const headers = { ...req.headers };
  headers.host = new URL(FEB19_URL).host;
  delete headers["proxy-connection"];

  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await requestBody(req);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
    });

    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (k === "location" && value.startsWith(FEB19_URL)) {
        responseHeaders[k] = value.replace(FEB19_URL, `http://localhost:${PORT}`);
      } else if (k !== "transfer-encoding" && k !== "connection") {
        responseHeaders[k] = value;
      }
    });
    Object.entries(responseHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.writeHead(response.status);
    const buf = await response.arrayBuffer();
    res.end(Buffer.from(buf));
  } catch (err) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end(`Proxy error: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Feb 19 deployment proxy: http://localhost:${PORT} -> ${FEB19_URL}`);
});

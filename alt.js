import Parser from "rss-parser";
let parser = new Parser();

const proxyUrl = `https://cors-anywhere.herokuapp.com`;
const feedUrl = `https://us8.campaign-archive.com/feed?u=27254aa398528ab9c6d2ae7df&id=ce7a5d8e0f`;
const requestUrl = `${proxyUrl}/${feedUrl}`;

(async () => {
  const feed = await parser.parseURL(requestUrl);
  const latest = feed.items[0];
  document.title = latest.title;
  document.getElementById("latest").innerHTML = latest.content;
})();

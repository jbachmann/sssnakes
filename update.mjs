import fs from "fs";
import Parser from "rss-parser";

const template = (location) =>
  `<html><head><meta http-equiv="REFRESH" content="0;url=${location}"/></head><body></body></html>`;
// `<html><head><script>window.location='${location}'</script></head><body></body></html>`;

const FEED_URL =
  "https://us8.campaign-archive.com/feed?u=27254aa398528ab9c6d2ae7df&id=ce7a5d8e0f";

const FILE_NAME = "index.html";

const existing = fs.readFileSync(FILE_NAME, "utf8");

new Parser()
  .parseURL(FEED_URL)
  .then((feed) => feed.items[0])
  .then((item) => {
    const html = template(item.link);
    if (existing === html) {
      console.log("No update necessary.");
      return Promise.resolve();
    } else {
      console.log(`Updating ${FILE_NAME}.`);
      return fs.writeFileSync(FILE_NAME, html);
    }
  });

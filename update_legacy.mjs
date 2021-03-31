import fs from "fs";
import Parser from "rss-parser";

const template = (location) =>
  `<html><head><meta http-equiv="REFRESH" content="0;url=${location}"/></head><body></body></html>`;

const FEED_URL =
  "https://us8.campaign-archive.com/feed?u=27254aa398528ab9c6d2ae7df&id=ce7a5d8e0f";

const FILE_NAME = "index.html";

const current = fs.readFileSync(FILE_NAME, "utf8");

new Parser()
  .parseURL(FEED_URL)
  .then((feed) => feed.items[0])
  .then((item) => template(item.link))
  .then((latest) =>
    current !== latest ? fs.writeFileSync(FILE_NAME, latest) : Promise.resolve()
  );

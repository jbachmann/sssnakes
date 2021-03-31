import fs from "fs";
import fetch from "node-fetch";
import pkg from "jsdom";
const { JSDOM } = pkg;

const template = (location) =>
  `<html><head><meta http-equiv="REFRESH" content="0;url=${location}"/></head><body></body></html>`;

const FEED_URL = "https://singlestone.activehosted.com/archive/2";

const FILE_NAME = "index.html";

const current = fs.readFileSync(FILE_NAME, "utf8");

fetch(FEED_URL)
  .then((response) => response.text())
  .then((html) => {
    const found = new JSDOM(html).window.document.querySelectorAll(
      "._option a"
    )[0].href;
    console.log(found);
    return found;
  })
  .then((href) => template(href))
  .then((latest) =>
    current !== latest ? fs.writeFileSync(FILE_NAME, latest) : Promise.resolve()
  )
  .catch((err) => console.warn("Something went wrong.", err));

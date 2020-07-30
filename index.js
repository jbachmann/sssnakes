const proxyUrl = `https://cors-anywhere.herokuapp.com`;
const feedUrl = `https://us8.campaign-archive.com/feed?u=27254aa398528ab9c6d2ae7df&id=ce7a5d8e0f`;
const requestUrl = `${proxyUrl}/${feedUrl}`;

fetch(requestUrl)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((doc) => doc.getElementsByTagName("item")[0])
  .then((item) => item.getElementsByTagName("link")[0])
  .then((link) => (document.location = link.textContent));

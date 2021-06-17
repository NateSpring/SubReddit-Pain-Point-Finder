const express = require("express");
const snoowrap = require("snoowrap");
let port = 5555;
let app = express(port);

const scrapeSub = async () => {
  const r = new snoowrap({
    /////////////////////
  });
  const sub = await r.getSubreddit("webdev");
  const newPosts = await sub.getNew();
  return newPosts;
};

app.get("/", async (req, res) => {
  let postContainer = await scrapeSub();
  let data = [];
  let substrings = [
    "difficulty",
    "difficult",
    "problem",
    "hard",
    "help",
    "struggling",
    "struggle",
  ];
  let str;
  postContainer.map((post) => {
    if (substrings.some((v) => post.selftext.includes(v))) {
      data.push({
        title: post.title,
        comment_count: post.num_comments,
        post: post.selftext,
        link: post.url,
      });
    }
  });
  res.send({ found_count: data.length + " posts", post: data });
});

app.listen(port, () => {
  `${port} : ONLINE`;
});

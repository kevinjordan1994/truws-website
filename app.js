`use strict`;

const express = require(`express`);
const bodyParser = require(`body-parser`);
const ejs = require(`ejs`);
const lodash = require(`lodash`);
const content = require(__dirname + "/content.js");

const app = express();

app.set(`view engine`, `ejs`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//POSTS ARRAY
const posts = [];

// APP.GET

app.get("/", function (req, res) {
  res.render("home", { content: content.homeContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { content: content.aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: content.contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/articles/:articleName", function (req, res) {
  const { articleName } = req.params;
  const article = posts.find(
    (post) => lodash.lowerCase(post.title) === lodash.lowerCase(articleName)
  );
  if (!article) {
    res.redirect(`/`);
    return;
  }
  res.render("post", { title: article.title, content: article.content });
});

//APP.POST

app.post("/compose", function (req, res) {
  const { articleTitle, articleContent } = req.body;
  const post = {
    title: articleTitle,
    content: articleContent,
    link: "articles/" + lodash.lowerCase(articleTitle).split(" ").join("-"),
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Listening to port 3000.");
});

const fs = require("fs");
// 😵 Callback Hell কী?
// 👉 Callback Hell হলো এমন একটা situation যেখানে
// অনেকগুলো callback একটার ভিতরে আরেকটা nested হয়ে যায় 😬
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  const modifyFileData = data.toUpperCase();

  fs.writeFile("output.txt", modifyFileData, (err) => {
    if (err) {
      console.error("Error writing file", err);
      return;
    }

    console.log("data written to the new file");

    fs.readFile("output.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file", err);
        return;
      }

      console.log(data);
    });
  });
});
const fs = require("fs");
const { resolve } = require("path");

const readJsonFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) =>
      err ? reject(err) : resolve(JSON.parse(data.toString()))
    )
  );

const writeJsonFile = (path, JsonObj) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, JSON.stringify(JsonObj, null, 2), (err) =>
      err ? reject(err) : resolve(JsonObj)
    )
  );

module.exports = {
  readJsonFile,
  writeJsonFile,
};

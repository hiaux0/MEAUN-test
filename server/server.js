const MongoClient = require('mongodb').MongoClient,
      express = require('express'),
      assert = require('assert'),
      path = require('path');

const app = express()

const __serverDir = path.resolve(path.dirname(''));
const __srcDir = path.join(__serverDir, "../", "skeleton-esnext")

app.use(express.static(__srcDir))

//////////////////////////////////
//
//      MONGO SETUP
// 

// Connection URL
const url = 'mongodb://dbtest:dbtest@localhost:27017/dbtest';
// const url = 'mongodb://dbtest:dbtest@localhost:27017';

// Database Name
const dbName = 'dbtest';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection('dbtest');

  client.close();
});

//////////////////////////////////
//
//      ROUTES
// 

// skeleton-esnext/index.html
const index = path.join(__srcDir, 'index.html')

app.get("/", function (req, res) {
  res.sendFile(index);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started")
})

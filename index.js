const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eydub.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello, It is working");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const postCollections = client.db("joblist").collection("postCollection");
  // const orderList = client.db("roxcePainting").collection("orders");
  // const adminList = client.db("roxcePainting").collection("admins");
  // const reviewList = client.db("roxcePainting").collection("reviews");

  app.post("/createPost", (req, res) => {
    const data = req.body;
    postCollections.insertOne(data).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/postShow", (req, res) => {
    postCollections.find({}).toArray((err, items) => {
      console.log(err);
      res.send(items);
    });
  });

  // app.delete("/delete/:id", (req, res) => {
  //   const id = ObjectId(req.params.id);
  //   serviceCollection.deleteOne({ _id: id }).then((document) => {
  //     res.send(document);
  //   });
  // });

  // app.get("/singleService/:id", (req, res) => {
  //   serviceCollection
  //     .find({ _id: ObjectId(req.params.id) })
  //     .toArray((err, document) => {
  //       console.log(err);
  //       res.send(document);
  //     });
  // });

  // app.post("/placeOrder", (req, res) => {
  //   const userInfo = req.body;
  //   console.log(req.body);
  //   orderList.insertOne(userInfo).then((result) => {
  //     console.log(result);
  //     res.send(result.insertedCount > 0);
  //   });
  // });

  // app.get("/orderList", (req, res) => {
  //   orderList.find({}).toArray((err, document) => {
  //     res.send(document);
  //   });
  // });

  // app.get("/singleOrder/:id", (req, res) => {
  //   const id = ObjectId(req.params.id);
  //   orderList.find({ _id: id }).toArray((err, document) => {
  //     console.log(err);
  //     res.send(document);
  //   });
  // });

  // app.patch("/updateStatus/:id", (req, res) => {
  //   const newInfo = req.body;
  //   const id = ObjectId(req.params.id);
  //   orderList
  //     .findOneAndUpdate({ _id: id }, { $set: { status: newInfo.status } })
  //     .then((err, result) => {
  //       console.log(err);
  //       console.log(result);
  //     });
  // });

  // app.post("/addAdmin", (req, res) => {
  //   const admin = req.body;
  //   adminList.insertOne(admin).then((result) => {
  //     console.log(result);
  //     res.send(result.insertedCount > 0);
  //   });
  // });

  // app.get("/adminList", (req, res) => {
  //   adminList.find({}).toArray((err, result) => {
  //     res.send(result);
  //   });
  // });

  // app.post("/addReview", (req, res) => {
  //   const data = req.body;
  //   reviewList.insertOne(data).then((result) => {
  //     console.log(result);
  //     res.send(result.insertedCount > 0);
  //   });
  // });

  // app.get("/reviewList", (req, res) => {
  //   reviewList.find({}).toArray((err, document) => {
  //     console.log(err);
  //     res.send(document);
  //   });
  // });

  // app.get("/bookingList", (req, res) => {
  //   const email = req.query.email;
  //   orderList.find({ email: email }).toArray((err, document) => {
  //     res.send(document);
  //   });
  // });
});

app.listen(process.env.PORT || port);

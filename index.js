const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3600;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@touring.uoxy8h0.mongodb.net/?retryWrites=true&w=majority&appName=touring`;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const touristDB = client.db("tourist").collection("spot");
    // const countryCollection = touristDB.collection("country");
    app.post("/spot", async (req, res) => {
      const data = req.body;
      const result = await touristDB.insertOne(data);
      res.send(result);
      // console.log(data)
    });
    app.get("/spot", async (req, res) => {
      const query = {};
      const option = {
        projection: {
          spot: 1,
          time: 1,
          cost: 1,
          visitor: 1,
          season: 1,
          photo: 1,
        },
      };
      const spotCollection = touristDB.find(query, option);
      const result = await spotCollection.toArray();
      res.send(result);
      console.log(result);
    });
    app.get("/spot/:mail", async (req, res) => {
      const email = req.params.mail;
      const query = { userEmail: email };
      const option = {
        projection: {
          spot: 1,
          time: 1,
          cost: 1,
          visitor: 1,
          season: 1,
          photo: 1,
        },
      };
      const spotCollection = touristDB.find(query, option);
      const result = await spotCollection.toArray();
      res.send(result);
      console.log(result);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome to our tourist spot.");
});

app.listen(port, () => {
  console.log(`server is running port ${port}`);
});

// rahiurp20
// C2GwroCh81l0vqmB

// {"_id":{"$oid":"662f646c20dade7955e6c3f4"},"country":"Bangladesh","spot":"Hakaluki Romance Spot","time":{"$numberInt":"12"},"visitor":{"$numberInt":"10000"},"photo":"https://i.postimg.cc/qqCvc3Fz/card-01.jpg","location":"Bandarban,bangladesh","cost":{"$numberInt":"27000"},"season":"thailand","comment":"Nestled in Bangladesh's southeastern hills, Bandarban captivates with lush forests, tribal culture, and the majestic peaks of the Chittagong Hill Tracts. Explore its beauty through trekking, indigenous crafts, and serene landscapes.","userName":"Adbur Rahaman Rahi","userEmail":"rahiurp20@gmail.com"}

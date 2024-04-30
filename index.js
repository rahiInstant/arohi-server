const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    app.get("/spot/:mail", async (req, res) => {
      const email = req.params.mail;
      const query = { userEmail: email };
      const option = {
        projection: {
          country: 1,
          spot: 1,
          location: 1,
          cost: 1,
        },
      };
      const spotCollection = touristDB.find(query, option);
      const result = await spotCollection.toArray();
      res.send(result);
      // console.log(result);
    });
    app.get("/card/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristDB.findOne(query);
      res.send(result);
      console.log(result);
    });
    app.put("/spot/:id", async (req, res) => {
      const data = req.body
      const id = req.params.id
      const updateDoc = {
        $set:{
          country:data.country,
          spot:data.spot,
          time: data.time,
          visitor: data.visitor,
          photo:data.photo,
          location:data.location,
          cost: data.cost,
          season:data.season,
          comment:data.comment,
        }
      }
      const option = {upsert:true}
      const query = {_id: new ObjectId(id)}
      const result = await touristDB.updateOne(query,updateDoc,option)
      res.send(result)
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
    });

    app.post("/spot", async (req, res) => {
      const data = req.body;
      const result = await touristDB.insertOne(data);
      res.send(result);
      // console.log(data)
    });

    app.delete("/spot/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await touristDB.deleteOne(query);
      res.send({ ...result, id });
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

// {"_id":{"$oid":"662fa82eab44b4375fd07b63"},"country":"Thiland","spot":"Patiya Relax Center","time":{"$numberInt":"16"},"visitor":{"$numberInt":"26000"},"photo":"https://images.unsplash.com/photo-1625492206717-61c584a8b11e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","location":"Chinku, Thiland","cost":{"$numberInt":"15700"},"season":"Winter","comment":"Thailand's vibrant coastal city, Pattaya, captivates with its lively beaches, bustling nightlife, and cultural charm. Sun-soaked shores to electrifying entertainment, Pattaya offers an unforgettable blend of relaxation and excitement against Thiland.","userName":"Adbur Rahaman Rahi","userEmail":"rahiurp20@gmail.com"}

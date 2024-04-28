const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3600
const uri = `mongodb+srv://rahiurp20:C2GwroCh81l0vqmB@touring.uoxy8h0.mongodb.net/?retryWrites=true&w=majority&appName=touring`;


app.use(cors())
app.use(express.json())



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req, res) => {
    console.log('welcome to our tourist spot.')
    res.send('welcome to our tourist spot.')
})

app.listen(port, () => {
    console.log(`server is running port ${port}`)
})



// rahiurp20
// C2GwroCh81l0vqmB
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

const uri = process.env.MongoAtlas;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function queryDatabase(collectionName, query) {
  const db = client.db();

  try {
    const collection = db.collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    return [];
  }
}

module.exports = { connectToDatabase, client };

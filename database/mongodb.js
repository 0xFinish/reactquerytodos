import { MongoClient, ObjectId } from "mongodb";
require("dotenv").config()

const Mongo = process.env.MONGODB

const url = Mongo

const client = new MongoClient(url)
const collection = client.db("todos").collection("todos")

export async function getTodos(req, res) {
    const result = await collection.find()
    const items = []
    await result.forEach(key => items.push(key))
    await res.status(200).json(items)
}

export async function postTodo(req, res) {
  console.dir(req.body)
  await collection.insertOne(req.body)
  res.status(200).json({"Added": true})
  }


export async function deleteTodo(req, res) {
  await console.dir(req.body)
  await collection.deleteOne({"_id": ObjectId(req.body._id)})
  res.status(200).json({"Added": true})
}

export async function updateTodo(req, res) {
  await console.dir(req.body.data)
  await console.log(req.body.data._id, req.body.data.status)
  const updateDocument = {
    $set: {
      status: req.body.data.status
    }
  }
  await collection.updateOne({"_id": ObjectId(req.body.data._id)}, updateDocument)
  res.status(200).json({"Updated": true})
}
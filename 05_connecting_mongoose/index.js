import express from 'express'
import mongoose from "mongoose";

const app = express()
const port = 3000;
app.use(express.json())

mongoose.connect("mongodb://mozamqurexhi007:mongoDB098@ac-5ksgvdy-shard-00-00.j5dngby.mongodb.net:27017,ac-5ksgvdy-shard-00-01.j5dngby.mongodb.net:27017,ac-5ksgvdy-shard-00-02.j5dngby.mongodb.net:27017/?ssl=true&replicaSet=atlas-wa0nlg-shard-0&authSource=admin&appName=Cluster0")
.then(()=>{
    console.log("Mango connected")
})
.catch((err)=>{
    console.error(err)
})


app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})
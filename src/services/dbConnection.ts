import mongoose from "mongoose"

const { MONGO_URL } = process.env

const connection: any = {}

async function dbConnection() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(MONGO_URL as string)

  connection.isConnected = db.connections[0].readyState
}

export default dbConnection;
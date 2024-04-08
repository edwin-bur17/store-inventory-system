import mongoose, { Promise } from "mongoose";

const { MONGODB_URI } = process.env;

// Si no hay una variable de entorno
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

// conexion de la base de datos
const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    const url = `${db.connection.host}:${db.connection.port}`
    console.log("Mongo db is running In: " + url)
  } catch (error) {
    console.log("Error al conectar mongo DB: " + error);
  }
};

export default connectDB;

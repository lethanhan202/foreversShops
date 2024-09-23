import mongoose from "mongoose";

let connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB connected')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDB

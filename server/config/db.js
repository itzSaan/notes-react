import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connect successful!")
    } catch (error) {
        console.error("Error connecting DB: ", error)
        process.exit()
    }
}



import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI || '';

if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            // bufferCommands: true,
        };

        cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoos) => {
            return mongoos;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
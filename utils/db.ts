import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define MongoDB_URI")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null,promise: null};
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const options = {
            bufferCommands: true,
            maxPoolSize: 10  // 1 baar mai kitne connections ho skte hai mongodb se
        }

        cached.promise = mongoose.connect(MONGODB_URI, options).then(() => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn;
}




// basically hamko ye sab isliye karna pada because nextjs works on edges matlab alag alag location par request jati hai
// so, we can have a conn, we may not have promise or we can have a promise.
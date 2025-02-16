import {Connection} from "mongoose";

// mere mongoose type ke andar ya to connection hoga ya phir Promise hoga 
declare global {
    var mongoose: {
        conn: Connection | null
        promise: Promise | null
    }
}

export {};
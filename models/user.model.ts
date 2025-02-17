import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date 
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true})

userSchema.pre("save",async function(next){    // ye pre hook hamesha chalega before saving data in database
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const User = mongoose.models?.User || mongoose.model<IUser>("User",userSchema);   // agar User model already hai to de do otherwise ek fresh user model create karo aur de do

export default User;
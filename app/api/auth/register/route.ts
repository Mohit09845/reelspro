import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest){
    try {
        const {email, password} = await req.json();

        if(!email || !password){
            return NextResponse.json({
                error: "Email and password is required",
                status: 400
            })
        }

        await connectToDatabase();

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json({
                error: "Email already registered",
                status: 400
            })
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json({
            message: "user registered successfully",
            status: 201
        })

    } catch (error) {
        return NextResponse.json({
            error: "Failed to register User",
            status: 500
        })
    }
}


import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url)
        const id = searchParams.get('id')
        if(!id){
            return NextResponse.json({message:'No user found',success:false},{status:400})
        }
        const response = await Post.find({userId:id})
        return NextResponse.json({todos:response,success:true},{status:200})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unexpected error occurred", success: false },
            { status: 500 }
        );
    }
}
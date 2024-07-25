// app/api/topics/route.js
import { connectToDB } from "@mongodb/database";
import Topic from "@models/Topic";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
    const topics = await Topic.find().populate('creator', 'username profileImagePath');
    return NextResponse.json(topics);
}

export async function POST(req) {
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, description } = await req.json();
        await connectToDB();

        const existingTopic = await Topic.findOne({ title });
        if (existingTopic) {
            return NextResponse.json({ error: 'Topic title already exists' }, { status: 409 });
        }

        const newTopic = new Topic({ title, description, creator: token.userId });
        await newTopic.save();
        const populatedTopic = await newTopic.populate('creator', 'username profileImagePath');
        return NextResponse.json(populatedTopic, { status: 201 });
    } catch (error) {
        console.error('Error creating topic:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

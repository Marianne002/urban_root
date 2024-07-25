// app/api/topics/[slug]/route.js
import { connectToDB } from "@mongodb/database";
import Topic from "@models/Topic";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectToDB();
    const topic = await Topic.findOne({ slug: params.slug }).populate('creator', 'username profileImagePath');
    if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(topic);
}

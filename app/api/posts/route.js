// app/api/posts/route.js
import { connectToDB } from "@mongodb/database";
import Post from "@models/Post";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get('topicId');

  const query = topicId ? { topic: topicId } : {};

  const posts = await Post.find(query)
    .populate('creator', 'username profileImagePath')
    .sort({ createdAt: -1 });

  return NextResponse.json(posts);
}

export async function POST(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { topicId, title, content } = await req.json();
    if (!topicId || !title || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    await connectToDB();

    const newPost = new Post({ topic: topicId, title, content, creator: token.userId });
    await newPost.save();
    const populatedPost = await newPost.populate('creator', 'username profileImagePath');
    return NextResponse.json(populatedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

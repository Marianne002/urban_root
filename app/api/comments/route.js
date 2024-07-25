// app/api/comments/route.js
import { connectToDB } from "@mongodb/database";
import Comment from "@models/Comment";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const comments = await Comment.find({ post: postId })
    .populate("creator", "username profileImagePath")
    .sort({ createdAt: -1 });

  return NextResponse.json(comments);
}

export async function POST(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { postId, content } = await req.json();
    if (!postId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await connectToDB();

    const newComment = new Comment({
      post: postId,
      content,
      creator: token.userId,
    });
    await newComment.save();
    const populatedComment = await newComment.populate(
      "creator",
      "username profileImagePath"
    );
    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

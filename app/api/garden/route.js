// app/api/garden/route.js
import { connectToDB } from '../../../mongodb/database';
import Garden from '../../../models/Garden';

export async function GET(req, res) {
    await connectToDB();

    const gardens = await Garden.find({});

    return new Response(JSON.stringify(gardens), { status: 200 });
}

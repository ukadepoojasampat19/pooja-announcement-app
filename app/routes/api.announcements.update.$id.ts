import { connectDB } from "../lib/mongodb.server";
import { Announcement } from "../models/announcement.model";

export async function action({ request, params }: any) {
  try {
    await connectDB();

    const body = await request.json();

    const updated = await Announcement.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return Response.json({
      success: true,
      announcement: updated,
    });
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
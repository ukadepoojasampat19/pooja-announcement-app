import { connectDB } from "../lib/mongodb.server";
import { Announcement } from "../models/announcement.model";

export async function action({ params }: any) {
  try {
    await connectDB();

    await Announcement.findByIdAndDelete(params.id);

    return Response.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
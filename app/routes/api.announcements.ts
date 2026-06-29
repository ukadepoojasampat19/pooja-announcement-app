import { connectDB } from "../lib/mongodb.server";
import { Announcement } from "../models/announcement.model";

export async function loader({ request }: any) {
    try {
    await connectDB();

    const url = new URL(request.url);
    const shopId = url.searchParams.get("shopId");

    const data = await Announcement.find(shopId ? { shopId } : {});

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}

export async function action({ request }: any) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("REQUEST BODY:", body);

    const announcement = await Announcement.create(body);

    return Response.json({
      success: true,
      announcement,
    });
  } catch (err: any) {
    console.error("POST ERROR:", err);

    return Response.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
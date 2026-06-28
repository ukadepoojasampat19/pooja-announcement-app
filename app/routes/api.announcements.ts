import { connectDB } from "../lib/mongodb.server";
import { Announcement } from "../models/announcement.model";

export async function loader({ request }: any) {
  await connectDB();

  const url = new URL(request.url);
  const shopId = url.searchParams.get("shopId");

  const announcements = await Announcement.find({ shopId });

  return Response.json(announcements);
}

export async function action({ request }: any) {
  await connectDB();

  const body = await request.json();

  const announcement = await Announcement.create(body);

  return Response.json({
    success: true,
    announcement,
  });
}
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    revalidatePath("/chats/" + body.id);
  } catch (error) {
    console.log("Clear Chats");
    console.error(error);
  }
}

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

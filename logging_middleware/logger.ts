import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export async function Log(
  stack: string,
  level: string,
  packageName: string,
  message: string
) {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log("Log success:", response.data);
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

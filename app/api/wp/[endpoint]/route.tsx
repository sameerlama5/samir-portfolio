import { NextRequest } from "next/server";

const WORDPRESS_API =
  "https://lamaitclub.wuaze.com/wp-json/wp/v2";

export async function GET(
  request: NextRequest,
  context: { params: { endpoint: string } }
) {

  try {

    const endpoint = context.params.endpoint;

    const searchParams =
      request.nextUrl.searchParams.toString();

    const apiUrl =
      `${WORDPRESS_API}/${endpoint}?${searchParams}`;

    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    console.log("Response Status:", response.status);

    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {

    console.error("FULL ERROR:", error);

    return Response.json(
      {
        error: "Internal Server Error",
        details:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}
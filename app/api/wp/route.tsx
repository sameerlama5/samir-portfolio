import { NextRequest } from "next/server";

const WORDPRESS_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {

  try {

    const { endpoint } = await params;

    const searchParams =
      request.nextUrl.searchParams.toString();

    const response = await fetch(
      `${WORDPRESS_API}/${endpoint}?${searchParams}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {

      return Response.json(
        {
          error: "Failed to fetch WordPress data",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return Response.json(data);

  } catch (error) {

    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
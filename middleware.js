import { NextResponse } from "next/server";
import { sendGETRequest } from "./utilities/requests";
import { verifyToken } from "./lib/auth";

export async function middleware(request) {
  const verifiedToken = await verifyToken(request).catch((err) =>
    console.error(err.message)
  );
  let reqClient = null;
  if (verifiedToken) {
    const path = {
      q: "clients",
      SiteId: process.env.NEXT_PUBLIC_SITE_ID,
    };
    const clients = await sendGETRequest(path);
    reqClient = clients.find(
      (client) => client.ClientId === verifiedToken.data
    );
  }

  if (!verifiedToken || !reqClient) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/personal",
};

import { serialize } from "cookie";
import { SignJWT, jwtVerify } from "jose";

export const getDataFromToken = async (token) => {
  const data = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
  );
  return data.payload;
};

export const verifyToken = async (request) => {
  const token = request.cookies.get("token");
  try {
    return await getDataFromToken(token);
  } catch (err) {
    throw new Error(err);
  }
};

export const createToken = async (data) => {
  return await new SignJWT({ data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(
      new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
    );
};

export const setCookies = (token) => {
  return serialize("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 3000,
  });
};
export const deleteCookies = (token) => {
  return serialize("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
};

import { parse } from "cookie";
import { deleteCookies } from "../../lib/auth";

export default async function logout(request, response) {
  try {
    const cookies = parse(request.headers.cookie || "");
    const accessToken = cookies.token;
    console.log(accessToken);
    if (accessToken) {
      const token = deleteCookies(accessToken);
      response.setHeader("Set-Cookie", token);
      response.send({ success: true });
    } else response.send({ value: "You are not loged in" });
  } catch (err) {
    console.error(err);
    response.send({ success: false });
  }
}

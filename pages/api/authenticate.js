import { parse } from "cookie";
import { sendGETRequest } from "../../utilities/requests";
import { getDataFromToken } from "../../lib/auth";

export default async function authenticate(request, response) {
  try {
    const cookies = parse(request.headers.cookie || "");
    const token = cookies.token;
    if (token) {
      const { data: clientId } = await getDataFromToken(token);
      const path = {
        q: "clients",
        Id: clientId,
      };
      const client = await sendGETRequest(path);
      response.send({ client });
    } else response.send({ client: null });
  } catch (err) {
    response.send({ error: err.message });
  }
}

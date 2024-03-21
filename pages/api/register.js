import { createToken, setCookies } from "../../lib/auth";
import {
  checkClientAlreadyExist,
  sendPOSTRequest,
} from "../../utilities/requests";

export default async function register(request, response) {
  try {
    const clientExist = await checkClientAlreadyExist(request.query.email);
    if (clientExist) {
      throw new Error("Client with such email already exists");
    }
    const path = {
      q: "clients",
      SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
    };
    const newClient = await sendPOSTRequest(path, JSON.parse(request.body));

    if (newClient.Value) {
      const accessToken = await createToken(newClient.Value);
      console.log(accessToken);
      const token = setCookies(accessToken);
      response.setHeader("Set-Cookie", token);
      response.send({ success: true });
    } else throw new Error("Some error occured");
  } catch (err) {
    response.send({ error: err.message });
  }
}

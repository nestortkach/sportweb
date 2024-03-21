import crypto from "crypto";
import {
  checkClientAlreadyExist,
  sendGETRequest,
} from "../../utilities/requests";
import { createToken, setCookies } from "../../lib/auth";

const sha512 = async (str) => {
  const buf = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder("utf-8").encode(str)
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};

export default async function login(request, response) {
  try {
    const clientId = await checkClientAlreadyExist(request.query.username);
    if (!clientId) {
      throw new Error("Wrong email");
    }
    const path = {
      q: "clients",
      Id: clientId,
    };

    const client = await sendGETRequest(path);
    const clientPassHashed = client.AccountPassword;
    const passwordHashed = await sha512(request.query.password);

    if (clientPassHashed === passwordHashed) {
      try {
        const accessToken = await createToken(clientId);
        const token = setCookies(accessToken);
        response.setHeader("Set-Cookie", token);
        response.send({ success: true });
      } catch (err) {
        throw new Error("Some error occurred");
      }
    } else throw new Error("Wrong email orpassword");
  } catch (err) {
    response.send({ error: err.message });
    console.error(err);
  }
}

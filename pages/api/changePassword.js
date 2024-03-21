import { sendPUTRequest } from "../../utilities/requests";

export default async function changePassword(request, response) {
  try {
    const body = request.body;
    console.log(body.password);

    const path = {
      q: "/clients",
      ClientId: "",
    };

    const changedClient = await sendPUTRequest();

    response.send({ value: true });
  } catch (err) {
    response.send({ error: err.message });
  }
}

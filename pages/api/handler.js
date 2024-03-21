import { createRoute } from "../../utilities/helperFunctions";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default async function handler(request, response) {
  const route = createRoute(request.query);

  if (request.method === "GET") {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_CHIDESK_API}${request.query.q}/?${route}`,
      {
        method: "GET",
        headers: {
          ChiDeskApiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const json = await data.json();
    if (typeof json === "string") {
      response.send({ value: json });
    } else if (!json) {
      response.send({ value: json });
    } else response.send(json);
  }
  if (request.method === "POST") {
    try {
      const route = createRoute(request.query);
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_CHIDESK_API}${request.query.q}/?${route}`,
        {
          method: "POST",
          headers: {
            ChiDeskApiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request.body),
        }
      );
      try {
        const json = await data.json();
        if (typeof json === "string") {
          response.send({ value: json });
        } else response.send(json);
      } catch (err) {
        if (request.query.q === "appointments/validate") {
          console.error(err.message);
          response.send({ value: null });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
    if (request.method === "PUT") {
      try {
        const route = createRoute(request.query);
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_CHIDESK_API}${request.query.q}/?${route}`,
          {
            method: "PUT",
            headers: {
              ChiDeskApiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request.body),
          }
        );
        const json = await data.json();
        if (typeof json === "string") {
          response.send({ value: json });
        } else response.send(json);
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}
module.exports = allowCors(handler);

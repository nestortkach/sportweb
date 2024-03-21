import getUrl from "../lib/baseUrl";
import {
  createNewClientBody,
  createValidationBody,
} from "./createRequestbodies";
import { createPath } from "./helperFunctions";

// GET
export const sendGETRequest = async (path) => {
  const res = await fetch(
    `${getUrl(process.env.NEXT_PUBLIC_HANDLER)}${createPath(path)}`
  );
  const data = await res.json();
  return data;
};

//POST
export const sendPOSTRequest = async (path, body) => {
  try {
    const res = await fetch(
      `${getUrl(process.env.NEXT_PUBLIC_HANDLER)}${createPath(path)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// PUT
export const sendPUTRequest = async (path, body) => {
  try {
    const res = await fetch(
      `${getUrl(process.env.NEXT_PUBLIC_HANDLER)}${createPath(path)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// validate available hours
export const validateTimes = async (appointmentInfo) => {
  try {
    const path = {
      q: "appointments/validate",
      SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
    };
    const reqBody = createValidationBody(appointmentInfo);
    const { value: isDataBusy } = await sendPOSTRequest(path, reqBody);
    return isDataBusy;
  } catch (err) {
    console.error(err);
  }
};

// check if client already exist
export const checkClientAlreadyExist = async (email) => {
  const path = {
    q: "clients/emailexists",
    SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
    Email: email,
  };
  const res = await fetch(
    `${getUrl(process.env.NEXT_PUBLIC_HANDLER)}${createPath(path)}`
  );
  const json = await res.json();
  console.log("json", json);
  return json.value;
};

// create new client
export const createNewClient = async (personalData) => {
  const path = {
    q: "clients",
    SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
  };
  const reqBody = createNewClientBody(personalData);
  return sendPOSTRequest(path, reqBody);
};

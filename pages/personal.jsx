import { useEffect, useState } from "react";
import getUrl from "../lib/baseUrl";

export default function Personal({}) {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const getClient = async () => {
      try {
        const response = await fetch(
          `${getUrl(process.env.NEXT_PUBLIC_AUTHENTICATE)}`
        );
        const { client } = await response.json();
        setClient(client);
      } catch (err) {
        console.error(err);
      }
    };
    getClient();
  }, []);
  return (
    <>
      {client && (
        <div>
          Hello, {client?.FirstName} {client?.LastName}
        </div>
      )}
    </>
  );
}

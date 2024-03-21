import { useEffect, useState } from "react";
import { createPath } from "../../utilities/helperFunctions";
import style from "./LocationDropDown.module.scss";
import getUrl from "../../lib/baseUrl";

export const LocationDropDown = ({ appointmentInfo, setAppointmentInfo }) => {
  const [sites, setSites] = useState();
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const path = {
        q: "sites",
        SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
      };
      const getSites = async () => {
        const res = await fetch(
          `${getUrl(process.env.NEXT_PUBLIC_HANDLER)}${createPath(path)}`
        );
        const sites = await res.json();
        setSites(sites);
      };
      getSites();
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, []);

  const selectLocation = (site) => {
    setShow(false);
    setAppointmentInfo({
      ...appointmentInfo,
      location: site,
      personalData: {
        ...appointmentInfo.personalData,
        country: {
          ...appointmentInfo.personalData.country,
          text: site.Country,
        },
      },
    });
  };
  return (
    <div className={style.container}>
      <div className={style.location}>
        <button
          onClick={() => setShow(!show)}
          className={`${style.location__current} button`}
        >
          {appointmentInfo.location
            ? appointmentInfo.location?.Name
            : "Location"}
        </button>
        <div
          className={`${style.location__list} ${show ? style.showList : ""}`}
        >
          {sites?.map((site) => (
            <div onClick={() => selectLocation(site)} key={site.SiteId}>
              {site.Name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

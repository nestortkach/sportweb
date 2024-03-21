import { daysWeek, months } from "./dataTemplates";

// creates params route to pass it to vercel serveless function
export const createPath = (paths) => {
  let finalPath = [];
  for (const [key, value] of Object.entries(paths)) {
    finalPath.push(`${key}=${value}`);
  }
  return `?${finalPath.join("&")}`;
};

// creates path, which passed into request url
export const createRoute = (paths) => {
  let finalPath = [];
  for (const [key, value] of Object.entries(paths)) {
    if (key === "q") continue;
    finalPath.push(`${key}=${value}`);
  }
  return finalPath.length === 0 ? "" : finalPath.join("&");
};

// create services types
export const createServiceTypes = (services, preselectedService) => {
  if (preselectedService) {
    services = services.filter(
      (service) => service.ServiceId !== preselectedService.ServiceId
    );
  }
  const servicesTypes = services.map((service) => service.ServiceTypeName);
  let servicesTypesUnique = [...new Set(servicesTypes)];
  const servicesPerType = servicesTypesUnique.map((service) => {
    return {
      name: service,
      data: services.filter(
        (singleService) => singleService.ServiceTypeName === service
      ),
    };
  });
  return servicesPerType;
};

// correct days, hours and minutes
export const correctDate = (num) => (num < 10 ? "0" + num : num);

// creates object iof services ids for request
export const createServicesIdsObj = (servicesArray) => {
  const services = {};
  servicesArray.forEach((service, index) => {
    services[`Services[${index}]`] = service?.ServiceId;
  });
  return services;
};
// create array with days of the week beginning from today
export const getDayOfWeek = (ind) => {
  const week = daysWeek.slice();
  const currentWeek = week.splice(new Date().getDay()).concat(week);
  return currentWeek[ind];
};

// create week array with dates
export const createWeek = (counter) => {
  const addHours = (quantity) => {
    return new Date().setHours(
      new Date().getHours() + (24 * quantity + counter * 24 * 7)
    );
  };
  return [...Array(7).keys()].map((day) => new Date(addHours(day)));
};

// helpds to indicate which months user currently observs
export const handleMonthSelection = (counter) => {
  const currentMonthIndexes = [createWeek(counter)[0].getMonth()];
  for (let i = 0; i < createWeek(counter).length; i++) {
    if (
      currentMonthIndexes.indexOf(createWeek(counter)[i].getMonth()) ===
      currentMonthIndexes.lastIndexOf(createWeek(counter)[i])
    )
      currentMonthIndexes.push(createWeek(counter)[i].getMonth());
  }
  const currentMonthString = currentMonthIndexes.map((month) => months[month]);
  return currentMonthString.join("/");
};

export const fixUTC = (availableHours) => {
  availableHours.forEach((hour) => {
    if (!hour.Start.endsWith("Z")) {
      hour.Start += "Z";
    }
    if (!hour.End.endsWith("Z")) {
      hour.End += "Z";
    }
  });
};

export const convertTZ = (date, timeZone, numeric) => {
  const convertedDate = new Date(date).toLocaleString("en-US", {
    timeZone: timeZone,
    hour: numeric ? "numeric" : undefined,
    minute: numeric ? "numeric" : undefined,
  });
  return { time: convertedDate, date: new Date(convertedDate) };
};

// creates periods for booking date section
export const createDatePeriods = (allAvailableHours) => {
  const getLocalHours = (hour, timezone) =>
    convertTZ(hour, timezone).date.getHours();
  const morning = allAvailableHours?.filter(
    (hour) => getLocalHours(hour.Start, "Asia/Dubai") < 12
  );
  const afternoon = allAvailableHours?.filter(
    (hour) =>
      getLocalHours(hour.Start, "Asia/Dubai") >= 12 &&
      getLocalHours(hour.Start, "Asia/Dubai") < 17
  );
  const evening = allAvailableHours?.filter(
    (hour) => getLocalHours(hour.Start, "Asia/Dubai") >= 17
  );
  return [
    { name: "morning", hours: morning },
    { name: "afternoon", hours: afternoon },
    { name: "evening", hours: evening },
  ];
};

// convert date in UTC into string
export const formatDate = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}-${correctDate(month)}-${correctDate(day)}`;
};

// convertsDate into string
export const configureDate = (date) => {
  const selectedDate = new Date(date);
  if (!selectedDate) return;
  return `${daysWeek[selectedDate.getDay()]}, ${
    months[selectedDate.getMonth()]
  } ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
};

// creates correct resource data for post request
export const correctResourcesData = (resources) => {
  return resources?.map((resource) => {
    return { ...resource, Name: "Name" };
  });
};

// creates correct employee data for post request
export const correctEmployeeData = (employees) => {
  return employees?.map((employee) => {
    return { ...employee, firstName: "Name", lastName: "Name" };
  });
};

export const capitalize = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);
export const lowerCase = (str) => str.slice(0, 1).toLowerCase() + str.slice(1);

// get keys of the object
export const getKeys = (object) => {
  const sections = [];
  for (const [key, value] of Object.entries(object)) {
    sections.push(key);
  }
  return sections;
};

// sort array of objects
export const sortByProperty = (data, prop) =>
  data.sort((a, b) => (!!data.length ? a[prop].localeCompare(b[prop]) : []));

export const convertString = (str) => {
  return str ? str : null;
};

// Password hash
export const sha512 = async (str) => {
  const buf = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder("utf-8").encode(str)
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};
// creates data for form autocompletion
export const createClientPersonalData = (client) => {
  const clientsData = {
    FirstName: client.FirstName,
    LastName: client.LastName,
    Email: client.Email,
    MobilePhone: client.MobilePhone,
    Country: client.PhysicalAddress.Country,
  };
  let personalData = {
    comments: {
      text: "",
      type: "text",
    },
  };
  for (const [key, value] of Object.entries(clientsData)) {
    personalData[lowerCase(key)] = {
      text: value,
      type: key === "MobilePhone" ? "tel" : key === "Email" ? "email" : "text",
    };
  }
  return personalData;
};

export const filterOptions = (e, options) => {
  return options.filter(
    (option) =>
      option.Name.toLowerCase().startsWith(
        e.target.value.toLowerCase().trim()
      ) ||
      option.Name.toLowerCase().includes(e.target.value.toLowerCase().trim())
  );
};

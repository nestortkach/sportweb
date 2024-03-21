import { v4 as uuidv4 } from "uuid";
import {
  correctEmployeeData,
  correctResourcesData,
  sha512,
} from "./helperFunctions";

export const createNewClientBody = (clientData) => {
  return {
    ClientId: "00000000-0000-0000-0000-000000000000",
    State: 1,
    SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
    FirstName: clientData.firstName.text,
    LastName: clientData.lastName.text,
    MobilePhone: clientData.mobilePhone.text,
    Email: clientData.email.text,
    PhysicalAddress: {
      AddressId: "00000000-0000-0000-0000-000000000000",
      Country: clientData.country.text,
    },
    BillingAddress: {
      AddressId: "00000000-0000-0000-0000-000000000000",
      Country: clientData.country.text,
    },
    PostalAddress: {
      AddressId: "00000000-0000-0000-0000-000000000000",
      Country: clientData.country.text,
    },
  };
};

export const createRegisterBody = async (inputs) => {
  const hashPassword = await sha512(inputs.personalData.password.text);

  const createAlerts = (alerts) =>
    alerts.map((alert) => ({
      AlertId: alert.AlertId,
      Name: alert.Name,
      Category: alert.Category,
      SiteId: null,
      Selected: false,
    }));
  return {
    ClientId: "00000000-0000-0000-0000-000000000000",
    State: 1,
    SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
    FirstName: inputs.personalData.firstName.text,
    LastName: inputs.personalData.lastName.text,
    MobilePhone: inputs.personalData.phone.text,
    Gender: inputs.details.gender.text.Index,
    SourceId: inputs.details.source.text.Id,
    Email: inputs.personalData.email.text,
    AccountPassword: hashPassword,
    PhysicalAddress: {
      AddressId: "00000000-0000-0000-0000-000000000000",
      Country: inputs.address.country.text.Name,
      Street: inputs.address.street.text,
      City: inputs.address.city.text,
      State: inputs.address.state.text,
      Code: inputs.address.code.text,
    },
    BillingAddress: {
      AddressId: "00000000-0000-0000-0000-000000000000",
      Country: inputs.address.country.text.Name,
      Street: inputs.address.street.text,
      City: inputs.address.city.text,
      State: inputs.address.state.text,
      Code: inputs.address.code.text,
    },
    PostalAddress: {
      AddressId: "00000000-0000-0000-0000-000000000000",
      Country: inputs.address.country.text.Name,
      Street: inputs.address.street.text,
      City: inputs.address.city.text,
      State: inputs.address.state.text,
      Code: inputs.address.code.text,
    },
    Alerts: [
      ...createAlerts(inputs.details.allergies.text),
      ...createAlerts(inputs.details.medical.text),
    ],
  };
};

export const createValidationBody = (appointmentInfo) => {
  let time = appointmentInfo.date.Start;
  return appointmentInfo.services.map((service, i) => {
    const start = time;
    const end = new Date(
      new Date(time).getTime() + service.Duration * 60000
    ).toISOString();
    time = end;
    return {
      AppointmentServiceId: "00000000-0000-0000-0000-000000000000",
      AppointmentId: "00000000-0000-0000-0000-000000000000",
      ClientId: null,
      ServiceId: service.ServiceId,
      PackageId: null,
      PackageGroupId: null,
      Start: start,
      End: end,
      Description: service.Name,
      Employees: [
        { EmployeeId: appointmentInfo.date.Employees[i]?.EmployeeId },
      ],
      Resources: [
        { ResourceId: appointmentInfo.date.Resources[i]?.ResourceId },
      ],
    };
  });
};

export const createNewAppointmentBody = (appointmentInfo, clientId) => {
  let time = appointmentInfo.date.Start;
  return {
    AppointmentId: "00000000-0000-0000-0000-000000000000",
    SiteId: `${process.env.NEXT_PUBLIC_SITE_ID}`,
    ClientId: clientId,
    ClientEmail: null,
    ClientTypeId: null,
    AppointmentNumber: null,
    AppointmentStateId: "32d7ec12-54c4-4d48-8848-0f0613f1dc57",
    Notes: `${appointmentInfo.personalData.comments.text}`,
    SourceId: null,
    UserId: null,
    SeriesId: null,
    AppointmentServices: appointmentInfo.services.map((service, i) => {
      const start = time;
      const end = new Date(
        new Date(time).getTime() + service.Duration * 60000
      ).toISOString();
      time = end;
      return {
        AppointmentServiceId: uuidv4(),
        AppointmentId: "00000000-0000-0000-0000-000000000000",
        ClientId: clientId,
        ServiceId: `${service.ServiceId}`,
        PackageId: null,
        PackageGroupId: null,
        Start: start,
        End: end,
        Description: `${service.Name}`,
        Employees: [correctEmployeeData(appointmentInfo.date.Employees)[i]],
        Resources: [correctResourcesData(appointmentInfo.date.Resources)[i]],
      };
    }),
  };
};

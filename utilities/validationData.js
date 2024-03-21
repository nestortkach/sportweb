const unnecessaryFields = [
  "comments",
  "street",
  "city",
  "state",
  "code",
  "allergies",
  "medical",
];

export const validateFields = (data) => {
  const emptyValues = [];
  const invalidValues = [];

  for (const [key, value] of Object.entries(data)) {
    if (unnecessaryFields.indexOf(key) !== -1) continue;
    if (!value.text) emptyValues.push(key);
    let reg =
      value.type === "email"
        ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        : value.type === "tel" || value.type === "number"
        ? /[\d]/
        : /[a-z]+/gi;
    if (!reg.test(value.text) && value.text) invalidValues.push(key);
  }
  const validationSuccess = !emptyValues.length && !invalidValues.length;
  return { validationSuccess, emptyValues, invalidValues };
};

export const emptyAppointment = {
  services: [],
  date: {},
  filled: false,
  location: null,
  personalData: {
    firstName: {
      text: "",
      type: "text",
    },
    lastName: {
      text: "",
      type: "text",
    },
    mobilePhone: {
      text: "",
      type: "tel",
    },
    country: {
      text: "",
      type: "text",
    },
    email: {
      text: "",
      type: "email",
    },
    comments: {
      text: "",
      type: "text",
    },
  },
};

export const emptyLoginIputs = {
  email: {
    text: "",
    type: "email",
  },
  password: {
    text: "",
    type: "text",
  },
};
export const emptyRegisterIputs = {
  personalData: {
    firstName: {
      text: "",
      type: "text",
    },
    lastName: {
      text: "",
      type: "text",
    },
    phone: {
      text: "",
      type: "tel",
    },
    email: {
      text: "",
      type: "email",
    },
    password: {
      text: "",
      type: "text",
    },
    confirmPassword: {
      text: "",
      type: "text",
    },
  },
  address: {
    street: {
      text: "",
      type: "text",
    },
    city: {
      text: "",
      type: "text",
    },
    state: {
      text: "",
      type: "text",
    },
    country: {
      text: "",
      type: "text",
    },
    code: {
      text: "",
      type: "number",
    },
  },
  details: {
    gender: {
      text: "",
      type: "text",
    },
    source: {
      text: "",
      type: "text",
    },
    allergies: {
      text: [],
      type: "text",
    },
    medical: {
      text: [],
      type: "text",
    },
  },
};

export const emptyRegisterSelectors = {};

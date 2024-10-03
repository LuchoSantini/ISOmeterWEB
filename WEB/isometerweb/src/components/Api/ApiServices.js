import api from "./Api";

// GET
export const allDevices = () => {
  return api.get("api/devices");
};

export const allMeasurements = () => {
  return api.get("api/measurements");
};

// POST
export const login = (email, password) => {
  return api.post("/api/login", {
    Email: email,
    Password: password,
  });
};

export const postDevice = (values) => {
  return api.post("/api/device", values);
};

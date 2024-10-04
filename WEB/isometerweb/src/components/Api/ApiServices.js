import api from "./Api";

// GET
export const allDevices = () => {
  return api.get("api/devices");
};

export const deviceById = (id) => {
  return api.get(`api/device/${id}`);
};

export const allMeasurements = () => {
  return api.get("api/measurements");
};

export const measurementsById = (deviceId) => {
  return api.get(`api/measurement/${deviceId}`);
};
// POST
export const login = (email, password) => {
  return api.post("/api/login", {
    Email: email,
    Password: password,
  });
};

export const postRandomData = (universalId) => {
  return api.post(`api/measurements/${universalId}`);
};

export const postDevice = (values) => {
  return api.post("/api/device", values);
};

// PUT
export const putDevice = (universalId, data) => {
  return api.put(`api/device/edit/${universalId}`, data);
};

export const changeStatusDevice = (universalId, status) => {
  return api.put(`api/device/status/${universalId}`, status);
};

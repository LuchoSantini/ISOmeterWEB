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

export const allRooms = () => {
  return api.get("api/rooms");
};

export const getEssaysById = (deviceId, roomId) => {
  return api.get(`api/essay/${deviceId}/${roomId}`);
};
// POST
export const login = (email, password) => {
  return api.post("/api/login", {
    Email: email,
    Password: password,
  });
};

export const postRandomData = (universalId) => {
  return api.post(`api/essay/${universalId}`);
};

export const postDevice = (values) => {
  return api.post("/api/device", values);
};

export const postDatabase = (values) => {
  return api.post("/api/database", values);
};

// PUT
export const putDevice = (universalId, data) => {
  return api.put(`api/device/edit/${universalId}`, data);
};

export const getDeviceStatus = (universalId) => {
  return api.get(`api/device/status/${universalId}`);
};

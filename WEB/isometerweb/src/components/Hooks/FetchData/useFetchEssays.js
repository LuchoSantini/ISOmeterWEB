import { useEffect, useState } from "react";
import { getEssaysById } from "../../Api/ApiServices";

const useFetchEssays = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gettedDeviceId, setGettedDeviceId] = useState(null);
  const [gettedRoomId, setGettedRoomId] = useState(null);

  const fetchEssay = async (deviceId, roomId) => {
    if (!deviceId) return;
    setLoading(true);
    try {
      const measurementResponse = await getEssaysById(deviceId, roomId);
      setEssays(measurementResponse.data);
      console.log("Ensayos obtenidos:", measurementResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gettedDeviceId && gettedRoomId) {
      fetchEssay(gettedDeviceId, gettedRoomId);
    }
  }, [gettedDeviceId, gettedRoomId]);

  return { essays, loading, setEssays, setGettedDeviceId, setGettedRoomId, gettedDeviceId, gettedRoomId };
};

export default useFetchEssays;

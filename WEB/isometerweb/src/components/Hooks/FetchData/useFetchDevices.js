import { useEffect, useState } from "react";
import { allDevices } from "../../Api/ApiServices";

const useFetchDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const deviceResponse = await allDevices();

        setDevices(deviceResponse.data);
        console.log(devices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { devices, setDevices, loading, setLoading };
};

export default useFetchDevices;

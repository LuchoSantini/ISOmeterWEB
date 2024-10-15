import { useContext, useEffect, useState } from "react";
import { allRooms } from "../../Api/ApiServices";
import { AuthContext } from "../../Login/login-context/AuthProvider";

const useFetchRooms = () => {
  const [rooms, setRooms] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsResponse = await allRooms(token);
        setRooms(roomsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);
  return { rooms, setRooms };
};

export default useFetchRooms;

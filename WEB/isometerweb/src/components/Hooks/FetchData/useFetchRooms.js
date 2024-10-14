import { useEffect, useState } from "react";
import { allRooms } from "../../Api/ApiServices";

const useFetchRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsResponse = await allRooms();
        setRooms(roomsResponse.data);
        console.log(rooms.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);
  return { rooms, setRooms };
};

export default useFetchRooms;

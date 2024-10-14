import { useState } from "react";
import { postDevice } from "../../Api/ApiServices";

const usePostDevice = () => {
  const [formData, setFormData] = useState({
    universalId: null,
    name: "",
    model: "",
    description: "",
    roomId: null,
  });

  const addDevice = async (e) => {
    try {
      const response = await postDevice(formData);
      setFormData({
        universalId: "",
        name: "",
        model: "",
        description: "",
        roomId: "",
      });
      console.log(response);
      alert("Se ha agregado un dispositivo nuevo.");
    } catch (error) {
      console.log(error);
    }
  };
  return { addDevice, formData, setFormData };
};

export default usePostDevice;

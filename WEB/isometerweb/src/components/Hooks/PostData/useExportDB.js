import { postDatabase } from "../../Api/ApiServices";

const useExportDB = () => {
  const exportDatabase = async () => {
    try {
      await postDatabase({});
      alert("Base de datos exportada a Excel.\nGuardada en Escritorio");
      console.log("Base de datos exportada a Excel.");
    } catch (error) {
      console.log(error);
    }
  };
  return { exportDatabase };
};

export default useExportDB;

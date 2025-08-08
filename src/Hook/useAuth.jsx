import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";

const useAuth = () => {
  const authcontext = useContext(AuthContext);
  return authcontext;
};

export default useAuth;

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { login } from "../state/lib/User/userSlice";
import { APIURL } from "../constants";

const useAuth = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
      
    (async () => {
        
      try {

        const { data } = await axios.get(APIURL+"/api/auth/get");
        dispatch(login(data.user))
          
      } catch (error : any) {

        console.log(error.message);
          
      }

    })();
        
  }, [])
  
};

export default useAuth;
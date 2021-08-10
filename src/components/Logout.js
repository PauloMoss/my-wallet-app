import { IoExitOutline } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import axios from 'axios';


export default function Logout({userProfile, setUserProfile}) {

    const history = useHistory();

    function logout(userProfile, setUserProfile) {
        
        const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/logout`, {}, config );
        request.then(() =>{
            localStorage.removeItem("lastLogin");
            setUserProfile("");
            history.push("/");
        });
    }

    return (
        <IoExitOutline color={'#FFFFFF'} size={25} onClick={() => logout(userProfile, setUserProfile)}/>
    );
}
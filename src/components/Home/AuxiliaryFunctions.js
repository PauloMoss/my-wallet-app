import { useEffect, useRef } from 'react'
import axios from 'axios';


function logout(userProfile, setUserProfile, history) {

    const config = { headers: { Authorization: `Bearer ${userProfile.token}` } }
    const request = axios.post(`http://localhost:4000/logout`, {}, config );
    request.then(() =>{
        localStorage.removeItem("lastLogin");
        setUserProfile("");
        history.push("/");
    });
}

function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
}

export {
    logout,
    ScrollToBottom
}
import React, { useEffect, useState } from 'react'

const useOnlineStatus = () => {
    const [status,setStatus] = useState(navigator.onLine);

    const OnlineHandler =()=>{
      setStatus(true);
      alert("online");
    }
    const OfflineHandler =()=>{
      setStatus(false);
      alert("offline");
    }
    useEffect(()=>{
        window.addEventListener("online",OnlineHandler);
        window.addEventListener("offline",OfflineHandler);
        return ()=>{
        window.removeEventListener("online",OnlineHandler);
        window.removeEventListener("offline",OfflineHandler);
        }
    },[]);

  return status;
}

export default useOnlineStatus;
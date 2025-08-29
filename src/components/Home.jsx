import React, { useState } from 'react'
import TitleWindow from './titleWindow';

const Home = () => {
    const [boolien, setBoolien] = useState(false);
    const [windowData] = useState("This my Deta to render");
    const OpenTitleWindow = () =>{
        setBoolien(!boolien);
    }
    const windowClosedEvent = ()=>{
        setBoolien(false);
    }
  return (
    <div>
       {boolien?<TitleWindow windowClosedEvent={windowClosedEvent} label="Title Window">{windowData}<div>
            Hello world..Please render<br/><p>dfgsdggdgdsgdgsdfg</p></div></TitleWindow> :''} 
        <button onClick={OpenTitleWindow}>Open Window</button>
    </div>
  )
}

export default Home
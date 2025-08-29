import React from 'react'

const TitleWindow = ({label,windowClosedEvent,children}) => {
  return (
    <div>
<div className='container'>
        <div className='titleWindow' >
            <div className='title' ><div>{label}</div>
            <button onClick={windowClosedEvent}>X</button></div>
            <div>
            {children}
        </div>
        </div>
        
    </div>
    </div>
    
  )
}

export default TitleWindow;
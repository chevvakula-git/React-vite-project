import React, { useState } from 'react'

const MoreInfo = () => {
  const [,setCount] = useState(0);

  const forceUpdate = () =>{
    console.log("forceUpdate");
    setCount(t => t + 1);
  }
  return (
    <div className='bg-gray-200'>
      Timer :{Date.now()}<br/>
      Force Update Example <br/>
      <button className='bg-red-500 text-white p-1 rounded-md' onClick={forceUpdate}>Button</button>
    </div>
  )
}

export default MoreInfo
import React, { useState } from 'react'

const StarRating = ({totalRatings = 5}) => {

        const [rating, setRating] = useState(0);
        const [hover, setHover] = useState(0);

    return (
        <div style={{display:'flex',fontSize:'40px',margin:'10px'}}>
        {
        [...Array(totalRatings)].map((_,index)=>{
            const starValue = index+1;
            return (<button key={index} onClick={()=>setRating(starValue)} onMouseOver={()=>setHover(starValue)} onMouseOut={()=>setHover(0)}>
                <span style={{color:starValue <= (hover||rating)?'#ffd600':'#140606'}}>
                    &#9733;
                </span>
                </button>)
        })

       } 

    </div>
  )
}

export default StarRating
import React, { useEffect } from 'react'
import { FixedSizeList as List } from 'react-window';

const AboutUs = () => {
  const [items, setData] = React.useState([]);
  useEffect(() => { 
    // Simulating data fetch
      const fetchedItems = Array.from({ length: 3000 }, (_, index) => `Item ${index + 1}`);
      setData(fetchedItems);
  
  }, []);


  return (
    <div>
      <List
      height={400}
      itemCount={items.length}
      itemSize={45} // fixed height
      
      width={300}
    >
      {({ index,style }) => (
        <div style={{...style,color:'red',backgroundColor:'gray',marginTop:'4px'}}>
          {items[index]}
        </div>
      )}
    </List>

    </div>
  )
}

export default AboutUs
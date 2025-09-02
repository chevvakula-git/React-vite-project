import React, { useRef, useState, useDeferredValue} from 'react';
import Pagination from './Pagination';

const MoreInfo = () => {
  const [,setCount] = useState(0);
  const [txtValue,setTextValue] = useState('');
  const ref = useRef(null);
  const debounceRef = useRef(null);

  const data = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);
  

  const forceUpdate = () =>{
    console.log("forceUpdate");
    setCount(t => t + 1);
  }

  const OnChangeTextValue = (e)=>{
    const value = e.target.value;
    setTextValue(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(()=>{
      doAPICall(value);
    }, 600);
  }

  const doAPICall = (value) =>{
    // Replace with real API call (e.g., fetch/axios)
    console.log("API Call with value : ", value);
  };

  const getTextInputVal = () =>{
    ref.current.focus();
  }

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    }
  }, []);

  return (
    <div className='bg-gray-200'>
      Timer :{Date.now()}<br/>
      Force Update Example <br/>
      <input ref={ref} type="text" className='border-2 border-gray-400 p-1 rounded-md' placeholder='Type here'/>
      <br/>
      Debounce Text <input type="text" onChange={OnChangeTextValue} value={txtValue} className='border-2 border-gray-400 p-1 rounded-md' placeholder='Type here'/>

      <button className='bg-red-500 text-white p-1 rounded-md' onClick={forceUpdate}>Button</button>
      <button className='bg-red-500 text-white p-1 rounded-md' onClick={getTextInputVal}>Button</button>
      <br/>
      Text Value : {txtValue}
      <h6>Pagination Implementation</h6>
            <ul>
        {paginatedData.map((item) => (
          <li key={item} className="p-2 border-b">
            {item}
          </li>
        ))}
      </ul>

      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
      />

    </div>
  )
}

export default MoreInfo
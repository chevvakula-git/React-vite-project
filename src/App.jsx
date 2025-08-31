
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import MoreInfo from './components/MoreInfo'
import Home from './components/Home'
import React, { useEffect, useState } from 'react'
import NVFragment from './components/NVFragment'
import useOnlineStatus from './custom-hooks/useOnlineStatus'
import StarRating from './components/StarRating'
import Login from './components/Login'
import Header from './components/Header'
import SideNav from './components/SideNav'
import ReactFiber from './components/ReactFiber'

function App() {
  
  const [status, setStatus] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const newStatus = useOnlineStatus();
  
  useEffect(()=>{
    setStatus(newStatus);
  },[newStatus]);
  
  return (
    <NVFragment>
      
      Connected : {status?<div style={{color:'green'}}>Online</div>:<div style={{color:'gray'}}>Offline</div>}
      <BrowserRouter>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className='app flex'> 
          <SideNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="p-4 flex-1">
            <Routes>
              <Route path="/" element={<Home/>}/>          
              <Route path="/aboutus" element={<AboutUs/>}/>
              <Route path="/contactus" element={<ContactUs/>}/>
              <Route path="/moreinfo" element={<MoreInfo/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/fiber" element={<ReactFiber/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <StarRating/>
    </NVFragment>
  )
}

export default App

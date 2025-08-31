import React, { useTransition } from 'react'
import { useNavigate } from 'react-router-dom';

function NavItem({ icon, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center text-gray-500">{icon}</span>
      <span className="truncate">{children}</span>
    </div>
  )
}

function SideNav({ open = false}) {
  const navigate = useNavigate();
  const[isPending,startTransition] = useTransition();
   const handleNavigation = (path) => {
     startTransition(()=>{
      navigate(path);
    });
    
  };
  return (
    <div>
      {/* Desktop persistent sidebar */}
      {isPending && <div>Loading...</div>}
      <aside className="sticky top-0 hidden h-[calc(100vh-0px)] w-64 shrink-0 border-r border-gray-200 bg-white md:block">
        <div className="flex h-full flex-col gap-2 p-3">
          <nav className="space-y-1">
            <NavItem onClick={(e)=>handleNavigation('/')} icon={<svg viewBox="0 0 24 24"  width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z"/></svg>}>
              Home
            </NavItem>
            <NavItem  onClick={(e)=>handleNavigation('/aboutus')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>}>
              About Us
            </NavItem>
            <NavItem  onClick={(e)=>handleNavigation('/contactus')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>}>
              Contact Us
            </NavItem>
            <NavItem  onClick={(e)=>handleNavigation('/moreinfo')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>}>
              More Info
            </NavItem>
            <NavItem onClick={(e)=>handleNavigation('/fiber')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>}>
              React Fiber
            </NavItem>
            <NavItem onClick={(e)=>handleNavigation('/login')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>}>
              Login
            </NavItem>
          </nav>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e)=>handleNavigation('/login')}
        />
        {/* panel */}
        <div
          className={`absolute left-0 top-0 h-full w-72 translate-x-0 transform border-r border-gray-200 bg-white shadow-xl transition-transform ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-[6px] bg-red-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white"><path d="M8 5v14l11-7-11-7z"/></svg>
              </span>
              <span className="text-base font-semibold text-gray-900">VidTube</span>
            </div>
            <button onClick={(e)=>handleNavigation('/login')} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="h-[1px] w-full bg-gray-200" />
          <div className="p-3">
            <nav className="space-y-1">
              <NavItem  onClick={(e)=>handleNavigation('/')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z"/></svg>}>
                Home
              </NavItem>
              <NavItem onClick={(e)=>handleNavigation('/aboutus')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>}>
                About Us
              </NavItem>
              <NavItem onClick={(e)=>handleNavigation('/contactus')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>}>
                Contact Us
              </NavItem>
              <NavItem onClick={(e)=>handleNavigation('/moreinfo')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>}>
                More Info
              </NavItem>
              <NavItem onClick={(e)=>handleNavigation('/fiber')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>}>
                React Fiber
              </NavItem>
              <NavItem onClick={(e)=>handleNavigation('/login')} icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>}>
                Login
              </NavItem>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav



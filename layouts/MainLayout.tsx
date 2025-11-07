import NavBar from "@/components/NavBar";
import React from "react";
interface IMainLayout {
  children: any
}

const MainLayout:React.FC<IMainLayout> = ({ children}) => {
  return(
      <div className="app-body">
        <NavBar/>
        {children}
      </div>
  )
}
export default MainLayout;
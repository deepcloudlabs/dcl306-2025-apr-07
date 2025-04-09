import React from "react";

export default function Card({children,title}) {
   return ( // View -> ReactDOM
       <div className={"card"}>
           <div className="card-header">
               <h3 className="card-title font-weight-light">{title}</h3>
           </div>
           <div className="card-body">
           {children}
           </div>
       </div>
   ) ;
}
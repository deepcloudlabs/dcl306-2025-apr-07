import React from "react";

export default function Container({children}) {
    return ( // View -> ReactDOM
        <div className={"container"}>
            {children}
        </div>
    );
}
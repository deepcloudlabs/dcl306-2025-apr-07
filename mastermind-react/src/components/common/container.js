import React from "react";

/*
* React.Children.filter(child => child.type == 'p').map(children, (child) => {})
* */
export default function Container({children}) {
    return ( // View -> ReactDOM
        <div className={"container"}>
            {children}
        </div>
    );
}
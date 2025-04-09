import React from "react";

export default function Button({color,click,label}) {
    return(
        <button className={"btn ".concat(color)}
                onClick={click}>{label}
        </button>
    );
}
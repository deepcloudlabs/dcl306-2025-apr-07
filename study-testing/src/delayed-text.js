import {useEffect, useState} from "react";

export default function DelayedText() {
    const [text, setText] = useState("Loading...");
    useEffect(() => {
        const timer = setTimeout(() => setText("Done!"), 1000);
        return () => clearTimeout(timer);
    }, []);
    return <p>{text}</p>;
}

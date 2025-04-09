import {useState} from "react";

export default function NameForm() {
    const [name, setName] = useState("");
    return (
        <div>
            <input
                aria-label="Name Input"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Your name is: {name}</p>
        </div>
    );
}

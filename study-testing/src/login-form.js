import {useState} from "react";

export default function LoginForm({onLogin}) {
    const [email, setEmail] = useState("");
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onLogin(email);
        }}>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

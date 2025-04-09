export default function Auth({ isLoggedIn }) {
    return isLoggedIn ? <h1>Welcome back!</h1> : <button>Login</button>;
}
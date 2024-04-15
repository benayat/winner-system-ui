import './LoginFormModal.css';

import {useState} from "react";

const LoginFormModal = ({handleLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <form>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                autoComplete={"current-password"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={(e)=>handleLogin(email, password)}>
                Login
            </button>
        </form>
    );
}
export default LoginFormModal;
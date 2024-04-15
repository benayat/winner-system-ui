import {useState} from "react";
import './RegisterFormModal.css';

const RegisterFormModal = ({handleSignUp}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localUserName, setLocalUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const onConfirmPasswordChange = (e) => {
        const localConfirmPassword = e.target.value;
        setConfirmPassword(localConfirmPassword);
        if(password!==localConfirmPassword) {
            setError('Passwords do not match');
        }else {
            setError('');
        }
    }

    return (
        <form className={"register-form"}>
            <input
                type={"text"}
                placeholder={"username"}
                value={localUserName}
                onChange={(e) => setLocalUserName(e.target.value)}
            />
            <input
                type={"text"}
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type={"password"}
                placeholder={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type={"password"}
                placeholder={"Confirm Password"}
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
            />
            {error!=='' && <span className='err'>{error}</span>}
            <button type="button" disabled={error!==''} onClick={()=>handleSignUp(localUserName, email, password, confirmPassword)}>
                Register
            </button>
        </form>
    );
}

export default RegisterFormModal;
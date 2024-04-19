import './UpdateProfileFormModal.css';
import {MAX_USERNAME_LENGTH} from "../../constants";
import {useState} from "react";

const UpdateProfileFormModal = ({email, fieldName, updateFunc}) => {
    const [fieldValue, setFieldValue] = useState('');
    const [confirmFieldValue, setConfirmFieldValue] = useState('');
    const [error, setError] = useState('');
    const handleUpdateProfile = (e) => {
        e.preventDefault()
        if (fieldValue !== confirmFieldValue) {
            setError('Fields do not match');
            return;
        }
        switch (fieldName) {
            case 'email':
                if (!fieldValue.includes('@') || !fieldValue.includes('.')) {
                    setError('Invalid email');
                    return;
                }
                break;
            case 'username':
                if (fieldValue.length > MAX_USERNAME_LENGTH) {
                    setError('Username is too long');
                    return;
                }
                break;
            case 'password':
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
                if (!passwordRegex.test(fieldValue)) {
                    setError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character');
                    return;
                }
                break;
            default:
                break;
        }
        updateFunc(email, fieldValue);
    }

    return (
        <div>
            <form className={"update-profile-form"}>
                <input
                    type={"text"}
                    placeholder={fieldName}
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                />
                <input
                    type={"text"}
                    placeholder={`Confirm ${fieldName}`}
                    value={confirmFieldValue}
                    onChange={(e) => setConfirmFieldValue(e.target.value)}
                />
                {error !== '' && <span className='err'>{error}</span>}
                <button type="submit" disabled={error !== ''} onClick={handleUpdateProfile}>
                    Update
                </button>
            </form>
        </div>
    );
}
export default UpdateProfileFormModal;
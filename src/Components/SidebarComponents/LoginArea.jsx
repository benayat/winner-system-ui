import "./LoginArea.css";
import {useEffect, useState} from "react";
import {Avatar, Button, Tooltip} from "@mui/material";
import loginIcon from "../../icons/login_icon.jpg";
import LoginFormModal from "./LoginFormModal";
import RegisterFormModal from "./RegisterFormModal";
import UserActionsGroup from "./UserActionsGroup";
import {MAX_USERNAME_LENGTH, userActions, USERNAME_DOES_NOT_EXIST} from "../../constants";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../../redux/userReducer";
import {
    getLoggedInUser,
    login,
    logout,
    registerUser,
    updateEmail,
    updatePassword,
    updateUsername
} from '../../api/api.js';
import UpdateProfileFormModal from "./UpdateProfileFormModal";
// import {useIsLoggedInQuery} from "../../redux/api";

const LoginArea = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);
    const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
    const [showUpdateUsernameModal, setShowUpdateUsernameModal] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const userName = useSelector((state) => state.user.userName);
    const dispatch = useDispatch();

    useEffect(() => {
        getLoggedInUser().then((response) => {
            if (response.data.length <= MAX_USERNAME_LENGTH) {
                dispatch(setUserName(response.data));
                removeModals();
                setShowButtons(false);
            }
        })
    }, []);
    useEffect(() => {
        if (!showButtons) {
            removeModals();
        }
    }, [showButtons]);

    const removeModals = () => {
        setShowLoginModal(false);
        setShowSignUpModal(false);
        setShowLogoutModal(false)
        setShowUpdateUsernameModal(false);
        setShowUpdateEmailModal(false);
        setShowUpdatePasswordModal(false);
    }

    const toggleShowButtons = () => {
        setShowButtons(!showButtons);
    }


    const showOnlyModal = (modal) => {
        removeModals();
        switch (modal) {
            case "login":
                setShowLoginModal(true);
                break;
            case "signup":
                setShowSignUpModal(true);
                break;
            case "logout":
                setShowLogoutModal(true);
                break;
            case "update email":
                setShowUpdateEmailModal(true);
                break;
            case "update password":
                setShowUpdatePasswordModal(true);
                break;
            case "update user name":
                setShowUpdateUsernameModal(true);
                break;
            default:
                break;
        }
    }

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };
    const handleCloseSignUpModal = () => {
        setShowSignUpModal(false);
    }
    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    }

    const handleLogin = async (email, password) => {
        login({email, password, rememberMe: true})
            .then((response) => {
                if (response.data.length <= MAX_USERNAME_LENGTH) {
                    dispatch(setUserName(email));
                    removeModals();
                    setShowButtons(false);
                } else {
                    throw new Error(USERNAME_DOES_NOT_EXIST);
                }
            })
            .catch((e) => {
                alert(`Login failed + ${e.message}`);
            });
    };
    const handleSignUp = async (userName, email, password, confirmPassword) => {
        registerUser({email, userName, password})
            .then(() => {
                showOnlyModal('login');
            })
            .catch(() => {
                alert('Registration failed');
            });
    }
    const handleLogout = async () => {
        logout().then(() => {
            dispatch(setUserName("Guest"));
            removeModals();
        });
    }
    const handleUpdateEmail = async (email, newEmail) => {
        updateEmail(email, newEmail).then(dispatch(setUserName(email)));
        removeModals();
        setShowButtons(false);
    }
    const handleUpdatePassword = async (email, newPassword) => {
        updatePassword(email, newPassword).then(() => alert('Password updated successfully'));
        removeModals();
        setShowButtons(false);
    }
    const handleUpdateUsername = async (email, newUsername) => {
        updateUsername(email, newUsername).then(() => alert('Username updated successfully'));
        removeModals();
        setShowButtons(false);
    }

    const getRelevantModal = () => {
        if (!showButtons) return null;
        if (showLoginModal) {
            return <LoginFormModal show={showLoginModal} closeModal={handleCloseLoginModal} handleLogin={handleLogin}/>
        } else if (showSignUpModal) {
            return <RegisterFormModal show={showSignUpModal} closeModal={handleCloseSignUpModal}
                                      handleSignUp={handleSignUp}/>
        } else if (showLogoutModal) {
            return <LogoutConfirmationModal show={showLogoutModal} closeModal={handleCloseLogoutModal}
                                            handleConfirm={handleLogout}/>
        } else if (showUpdateEmailModal) {
            return <UpdateProfileFormModal email={userName} fieldName={'email'} updateFunc={handleUpdateEmail}/>
        } else if (showUpdatePasswordModal) {
            return <UpdateProfileFormModal email={userName} fieldName={'password'} updateFunc={handleUpdatePassword}/>
        } else if (showUpdateUsernameModal) {
            return <UpdateProfileFormModal email={userName} fieldName={'username'} updateFunc={handleUpdateUsername}/>
        }
    }
    return (
        <div className={"login_icon-container"}>
            <div className={"login_buttons-container"}>
                <Tooltip title={"user actions"} arrow placement={"right-start"}>
                    <Avatar className={"login_avatar"} variant="circular" src={loginIcon} onClick={toggleShowButtons}
                            sx={{cursor: "pointer"}}/>
                </Tooltip>
                {showButtons ? (
                        <UserActionsGroup>
                            {userName !== "Guest" ? userActions.user.map(action => <Button key={action}
                                                                                           title={action}
                                                                                           variant="contained"
                                                                                           onClick={() => showOnlyModal(action)}>{action}</Button>) :
                                userActions.guest.map(action => <Button key={action} title={action} variant="contained"
                                                                        onClick={() => showOnlyModal(action)}>{action}</Button>)
                            }
                        </UserActionsGroup>
                    ) :
                    (<div className={"display_user"}>
                        Hello {userName}. Click me!
                    </div>)
                }
            </div>
            {getRelevantModal()}
        </div>
    );
}

export default LoginArea;
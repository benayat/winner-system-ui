import "./LoginArea.css";
import {useEffect, useState} from "react";
import {Avatar, Button, Tooltip} from "@mui/material";
import loginIcon from "../../icons/login_icon.jpg";
import LoginFormModal from "./LoginFormModal";
import RegisterFormModal from "./RegisterFormModal";
import UserActionsGroup from "./UserActionsGroup";
import {MAX_USERNAME_LENGTH, userActions} from "../../constants";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../../redux/userReducer";
import {getLoggedInUser, login, logout, registerUser} from '../../api/api.js';
// import {useIsLoggedInQuery} from "../../redux/api";

const LoginArea = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
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
            default:
                break;
        }
    }

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    const handleLogin = async (email, password) => {
        login({email, password, rememberMe: true})
            .then((response) => {
                console.log(response);
                dispatch(setUserName(email));
                removeModals();
                setShowButtons(false);
            })
            .catch(() => {
                alert('Login failed');
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

    const getRelevantModal = () => {
        if (!showButtons) return null;
        if (showLoginModal) {
            return <LoginFormModal show={showLoginModal} closeModal={handleCloseModal} handleLogin={handleLogin}/>
        } else if (showSignUpModal) {
            return <RegisterFormModal show={showSignUpModal} closeModal={handleCloseModal} handleSignUp={handleSignUp}/>
        } else if (showLogoutModal) {
            return <LogoutConfirmationModal show={showLogoutModal} closeModal={handleCloseModal}
                                            handleConfirm={handleLogout}/>
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
import React, { useState } from 'react';
import './Login.scss'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button } from '@mui/material';
import { EMAIL_REGEX } from '../../utils/regexList';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { Toaster } from '../Common/Toaster';

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [toggle_password, setToggle_password] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (!event.target.value) {
            setEmailErrorMessage("Email can't be empty")
        }
        else if (!EMAIL_REGEX.test(event.target.value)) {
            setEmailValid(false);
            setEmailErrorMessage("Please enter a valid email Id");
        } else {
            setEmailValid(true);
            setEmailErrorMessage("");
        }
    };

    const handlePasswordChanges = (event) => {
        setPassword(event.target.value);
        if (!event.target.value) {
            setPasswordErrorMessage("Password can't be empty")
        } else {
            setPasswordErrorMessage("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('loginBtn').click();
        }
    };

    const handleLoginClick = () => {
        setLoading(true)
        let user = {
            email: email,
            password: password,
        };

        if (
            email?.length !== 0 &&
            isEmailValid &&
            password?.length !== 0
        ) {
            axios.post('https://mmfinfotech.co/machine_test/api/userLogin', user)
                .then(function (response) {
                    console.log(response?.data?.record?.authtoken,'response')
                    if (response?.data?.status === true) {
                        localStorage.setItem("token", response?.data?.record?.authtoken);
                        localStorage.setItem("login_id", response?.data?.record?.id);
                        navigate("/dashboard");
                        Toaster.TOAST('login successfully', "success");
                    }else{
                        Toaster.TOAST(response?.data?.message, "error");
                    }
                    setLoading(false);
                }).catch(function (error) {
                    Toaster.TOAST(error?.data?.message, "error");
                });

        } else {
            if (email?.length === 0) {
                setEmailValid(false);
                setEmailErrorMessage("Email can't be empty");
            }
            if (password?.length === 0) {
                setPasswordErrorMessage("Password can't be empty");
            }
            setLoading(false);
        }
    };

    const togglePasswordHide = () => {
        setToggle_password((toggle_password) => !toggle_password);
    };
    return (<>
        <Grid container className='login-main' spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <h2 className="ma-form-heading">Login</h2>
                <TextField
                    className="placeholder_field"
                    fullWidth
                    name="email"
                    placeholder="*Email"
                    value={email}
                    type="email"
                    onChange={handleEmailChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                    helperText={<span className="ma-error">{emailErrorMessage}</span>}
                    error={!isEmailValid}
                    margin="normal"
                />
                <TextField
                    className="placeholder_field"
                    fullWidth
                    value={password}
                    placeholder="*Password (8+ characters)"
                    type={toggle_password ? "text" : "password"}
                    onChange={handlePasswordChanges}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                                {toggle_password ? (
                                    <Visibility onClick={togglePasswordHide} />
                                ) : (
                                    <VisibilityOff onClick={togglePasswordHide} />
                                )}
                            </InputAdornment>
                        ),
                    }}
                    helperText={<span className="ma-error">{passwordErrorMessage}</span>}
                    onKeyPressCapture={handleKeyPress}
                    margin="normal"
                />
                <LoadingButton
                    variant="contained"
                    fullWidth
                    id="loginBtn"
                    className="loginBtn"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    loadingIndicator={<CircularProgress />}
                    onClick={handleLoginClick}
                >
                    <span>LOGIN</span>
                </LoadingButton>
                <div className="ma-tryIt-free">
                    <p>
                        Didn't have account?

                        <span
                            className="tryIt"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Try it Free
                        </span>

                    </p>
                </div>
            </Grid>
        </Grid>
    </>

    );
}

export default Login;



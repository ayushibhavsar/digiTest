import React, { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useNavigate } from 'react-router-dom';
import { NAMES_REGEX, EMAIL_REGEX } from '../../utils/regexList';
import { getCountryCallingCode } from 'libphonenumber-js';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import './Signup.scss'
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import { Toaster } from '../Common/Toaster';


const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [isFnameValid, setIsFnameValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneCode, setPhoneCode] = useState("+91");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [toggle_password, setToggle_password] = useState(false);
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);
    const [loading, setLoading] = useState(false)
    let strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*])(?=.{4,})"
    );


    const handleCountry = (country) => {
        const countryCallingCode = getCountryCallingCode(country);
        setPhoneCode(`+${countryCallingCode}`);
    }

    const handleKeyPressPhone = (event) => {
        const NumStartKeyCode = 48;
        const NumEndKeyCode = 57;
        const charCode = event.charCode;
        const inputValue = event.target.value;
        if (
            (charCode < NumStartKeyCode || charCode > NumEndKeyCode) &&
            !(inputValue.length === 0)
        ) {
            event.preventDefault();
        }
        if (inputValue.length >= 15) {
            event.preventDefault();
        }
    };

    const handlePhoneChanges = (value) => {
        setPhoneNumber(value);
        if (!value) {
            setPhoneErrorMessage("Phone number can't be empty");
        }
        else if (value?.length < 10) {
            setPhoneErrorMessage("Please enter valid contact");
        }
        else {
            setPhoneErrorMessage(" ");
        }
    };

    const handleFirstnameChanges = (event) => {
        setFirstName(event.target.value);
        if (!event?.target?.value) {
            setFullNameErrorMessage("First name can't be empty");
        } else if (!NAMES_REGEX.test(event?.target?.value)) {
            setIsFnameValid(false);
            setFullNameErrorMessage("Please enter a valid name");
        } else {
            setIsFnameValid(true);
            setFullNameErrorMessage("");
        }
    };
    const handleLastnameChanges = (event) => {
        setLastName(event.target.value);
        if (!event?.target?.value) {
            setLastNameErrorMessage("Last name can't be empty");
        } else if (!NAMES_REGEX.test(event?.target?.value)) {
            setLastNameErrorMessage("Please enter a valid last name");
        } else {
            setLastNameErrorMessage("");
        }
    };
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
            setPasswordErrorMessage("Password can't be empty");
        } else if (!strongRegex.test(event.target.value)) {
            setIsPasswordCheck(false);
            setPasswordErrorMessage(
                "Password must be at least one uppercase, lowercase, special character and number"
            );
        } else if (event.target.value?.length < 8) {
            setIsPasswordCheck(false);
            setPasswordErrorMessage("Password should be minimum 8 characters");
        } else {
            setIsPasswordCheck(true);
            setPasswordErrorMessage("");
        }
    };

    const handleConfirmPasswordChanges = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value !== password) {
            setConfirmPasswordErrorMessage("Passwords do not match");
        } else {
            setConfirmPasswordErrorMessage("");
        }
    };

    const togglePasswordHide = () => {
        setToggle_password((toggle_password) => !toggle_password);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("signUpButton").click();
        }
    };

    const handleSignup = () => {
        setLoading(true)
        let user = {
            first_name: firstName,
            last_name: lastName,
            phone_no: phoneNumber?.replace(phoneCode, "").trim(),
            country_code: phoneCode,
            email: email,
            password: password,
            confirm_password: confirmPassword
        };
        if (
            firstName?.length !== 0 &&
            lastName?.length !== 0 &&
            phoneNumber !== 0 &&
            phoneCode !== 0 &&
            email !== 0 &&
            password !== 0 &&
            confirmPassword !== 0

        ) {
            axios.post('https://mmfinfotech.co/machine_test/api/userRegister', user)
                .then(function (response) {
                    if (response?.data?.status === true) {
                        navigate('/')
                        Toaster.TOAST('Signin successfully', "success");
                    } else {
                        Toaster.TOAST(response?.data?.message, "error");
                    }
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setLoading(false)

        } else {
            if (email?.length === 0) {
                setEmailValid(false);
                setEmailErrorMessage("Email can't be empty");
            }
            if (firstName?.length === 0) {
                setFullNameErrorMessage("First name can't be empty");
            }
            if (lastName?.length === 0) {
                setLastNameErrorMessage("Last name can't be empty");
            }
            if (password?.length === 0) {
                setPasswordErrorMessage("Password can't be empty");
            }
            if (confirmPassword?.length === 0) {
                setConfirmPasswordErrorMessage("Confirm password can't be empty");
            }
            setLoading(false);
        }

    };

    return (
        <Grid container className='login-main mainContainer' spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <h2 className="ma-form-heading">Signup</h2>

                <TextField
                    role="textb"
                    className="placeholder_field"
                    data-testid="firstName"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    autoComplete="off"
                    placeholder="*First Name"
                    value={firstName}
                    autoFocus
                    onChange={(e) => handleFirstnameChanges(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    helperText={
                        <span className="ma-error">{fullNameErrorMessage}</span>
                    }
                    error={!isFnameValid ? true : false}
                    margin="normal"
                />
                <TextField
                    className="placeholder_field"
                    data-testid="lastname"
                    name="lastname"
                    fullWidth
                    id="lastname"
                    autoComplete="off"
                    placeholder="*Last Name"
                    value={lastName}
                    onChange={(e) => handleLastnameChanges(e)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    helperText={
                        <span className="ma-error">{lastNameErrorMessage}</span>
                    }
                    margin='normal'
                />
                <div className="ma-country-code">
                    <PhoneInput
                        className="placeholder_field"
                        onKeyPressCapture={handleKeyPressPhone}
                        onCountryChange={handleCountry}
                        placeholder="*Phone"
                        value={phoneNumber}
                        defaultCountry={"IN"}
                        onChange={handlePhoneChanges} />
                    <span className="countryCodeValue">{phoneCode}</span>
                    <span className="ma-error">{phoneErrorMessage}</span>
                </div>
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
                <TextField
                    className="placeholder_field"
                    fullWidth
                    value={confirmPassword}
                    placeholder="*Confirm Password (8+ characters)"
                    type={toggle_password ? "text" : "password"}
                    onChange={handleConfirmPasswordChanges}
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
                    helperText={<span className="ma-error">{confirmPasswordErrorMessage}</span>}
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
                    loadingPosition='center'
                    loadingIndicator={<CircularProgress />}
                    onClick={handleSignup}
                >
                    <span>Signup</span>
                </LoadingButton>
                <div className="ma-tryIt-free">
                    <p>
                        Have an account? 

                        <span
                            className="tryIt"
                            style={{cursor:'pointer'}}
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                             Login
                        </span>

                    </p>
                </div>
            </Grid>
        </Grid>
    );
}

export default Signup;

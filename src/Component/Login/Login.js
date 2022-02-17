import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


const regexEmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPasswordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');


    const handleEmail = e => {

        if (regexEmailValidation.test(e.target.value) || e.target.value === "") {
            setEmail(e.target.value);
            setErrorEmail('');
        }

        else {
            setErrorEmail("Enter a valid email address ");
        }
    }

    const handlePassword = e => {
        if (regexPasswordValidation.test(e.target.value) || e.target.value === "") {
            setPassword(e.target.value);
            setErrorPassword('');
        }

        else {
            setErrorPassword("Minimum eight characters, at least one letter and one number");
        }
    }

    const history = useHistory();

    const submit = e => {
        e.preventDefault();
        if (errorPassword === "" && errorEmail === "") {
            const loginUserData = { email, password }

            fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(loginUserData)
            }).then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        swal({
                            text: `${data.message}`,
                            icon: "success",
                            button: "ok!",
                        });
                        history.push("/home");

                    }
                    else {
                        swal({
                            // 
                            text: `${data.errorMessage}`,
                            icon: "error",
                            button: "ok!",
                        });

                    }
                })

        }



    }
    return (
        <div>
            <div className="containe">
                <div className="screen">
                    <div className="screen__content">
                        <form onSubmit={submit} className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required onChange={handleEmail} type="email" className="login__input" placeholder=" Email" />
                                <span className='text-danger'>{errorEmail}</span>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input required onChange={handlePassword} type="password" className="login__input" placeholder="Password" />
                                <span className='text-danger'>{errorPassword}</span>
                            </div>
                            <p className='newmember'>New member? <Link to="/register">Register here</Link></p>
                            <button type='submit' className="button login__submit">
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>

                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
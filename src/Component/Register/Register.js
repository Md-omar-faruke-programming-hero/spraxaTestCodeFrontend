import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import "./Register.css";

const regexContactValidation = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4,5}$/;
const regexEmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPasswordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


const Register = () => {

    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [contact, setContact] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPasswordd, setErrorPasswordd] = useState('');
    const [errorContact, setErrorContact] = useState('');
    const history = useHistory();

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
        setPasswordOne(e.target.value);

        if (regexPasswordValidation.test(e.target.value) || e.target.value === "") {
            setPasswordOne(e.target.value);
            setErrorPassword('');
        }

        else {
            setErrorPassword("Minimum eight characters, at least one letter and one number");
        }
    }
    console.log(passwordOne);
    const handlePasswordtwo = e => {
        setErrorPasswordd(e.target.value);
        if (passwordOne !== e.target.value) {
            setErrorPasswordd("Password does not match");
        }
        else if (e.target.value === "") {
            setErrorPasswordd('');
        }
        else {
            setPasswordTwo(e.target.value);
            setErrorPasswordd('');
        }
    }

    const handleContact = e => {
        if (regexContactValidation.test(e.target.value) || e.target.value === "") {
            setContact(e.target.value);
            setErrorContact('');
        }

        else {
            setErrorContact("Enter a valid contact number ");
        }
    }


    const submit = e => {
        e.preventDefault();

        if (errorEmail === "" && errorPassword === "" && errorPasswordd === "" && errorContact === "") {
            const registerUserInfo = { email, passwordOne, passwordTwo, contact };

            fetch('http://localhost:5000/createUser', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(registerUserInfo)
            }).then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        swal({
                            // 
                            text: "Your account create successfully!",
                            icon: "success",
                            button: "ok!",
                        });



                        history.push("/login");
                    }
                })
        }
        else {
            swal({

                text: "Something went wrong !",
                icon: "error",
                button: "ok!",
            });
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
                                <input required onChange={handleEmail} type="text" className="login__input" placeholder="Email" />
                                <span className='text-danger'>{errorEmail}</span>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input required onChange={handlePassword} type="password" className="login__input" placeholder="Password" />
                                <span className='text-danger'>{errorPassword}</span>

                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input required onChange={handlePasswordtwo} type="password" className="login__input" placeholder="Confirm password" />
                                <span className='text-danger'>{errorPasswordd}</span>
                            </div>

                            <div className="login__field">

                                <i className="login__icon fas fa-mobile"></i>
                                <input required onChange={handleContact} type="text" className="login__input" placeholder="Contact" />
                                <span className='text-danger'>{errorContact}</span>
                            </div>
                            <button type='submit' className="button login__submit">
                                <span className="button__text">Create account</span>
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

export default Register;
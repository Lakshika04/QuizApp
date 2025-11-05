import React, { useState } from 'react'
import { loginStyles } from '../assets/dummystyle'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, LogIn, Mail } from 'lucide-react'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);




const Login = ({onLoginSuccess=null}) => {

      const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  //email validation

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    return e;
  };


const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    console.log("Form submitted!");
    // You will add your login logic (like API calls) here
  }


  return (
    <div className={loginStyles.pageContainer}>
        <div className={loginStyles.bubble1}></div>
        <div className={loginStyles.bubble2}></div>

        <Link to='/' className={loginStyles.backButton}>
        <ArrowLeft className={loginStyles.backButtonIcon}/>
        <span className={loginStyles.backButtonText}>Home</span>
        </Link>

        <div className={loginStyles.formContainer}>
            <form onSubmit={handleSubmit} className={loginStyles.form} noValidate>
                <div className={loginStyles.formWrapper}>
                    <div className={loginStyles.animatedBorder}>
                        <div className={loginStyles.formContent}>
                            <h2 className={loginStyles.heading}>
                                <span className={loginStyles.headingIcon}>
                                    <LogIn className={loginStyles.headingIconInner}/>

                                </span>
                                <span className={loginStyles.headingText}>
                                    Login
                                </span>

                            </h2>
                            <p className={loginStyles.subtitle}>
                                Signin to continue to the Quiz App
                            </p>

                            <label className={loginStyles.label}>
                                <span className={loginStyles.labelText}>Email</span>
                                <div className={loginStyles.inputContainer}>
                                    <span className={loginStyles.inputIcon}>
                                        <Mail className={loginStyles.inputIconInner}/>
                                    </span>
                                    <input type="email" name='email'value={email} onChange={(e)=>{
                                        setEmail(e.target.value);
                                        if(errors.email)
                                            setErrors((s)=>({
                                        ...s,email:undefined,}))
                                        
                                    }}
                                    className={`${loginStyles.input} ${
                                        errors.email?loginStyles.inputError: loginStyles.inputNormal
                                    }`} 
                                    placeholder='your@example.com'
                                    required/>
                                </div>
                                {errors.email && (
                                    <p className={loginStyles.errorText}>{errors.email}</p>
                                )}
                            </label>

                                           <label className={loginStyles.label}>
                                <span className={loginStyles.labelText}>Password</span>
                                <div className={loginStyles.inputContainer}>
                                    <span className={loginStyles.inputIcon}>
                                        <Lock className={loginStyles.inputIconInner}/>
                                    </span>
                                    <input type={showPassword?'text':'password'} name='password'value={email} onChange={(e)=>{
                                        setEmail(e.target.value);
                                        if(errors.email)g
                                            setErrors((s)=>({
                                        ...s,email:undefined,}))
                                        
                                    }}
                                    className={`${loginStyles.input} ${
                                        errors.email?loginStyles.inputError: loginStyles.inputNormal
                                    }`} 
                                    placeholder='your@example.com'
                                    required/>
                                </div>
                                {errors.email&& (
                                    <p className={loginStyles.errorText}>{errors.email}</p>
                                )}
                            </label>

                        </div>

                    </div>

                </div>
            </form>


        </div>
        
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import { signupStyles } from '../assets/dummystyle'
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, User } from 'lucide-react';


const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  //whether email has @ or not

const Signup = ({ onSignupSuccess = null }) => {


      const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);


//email validation function also validating email and password
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };
  const API_BASE = 'http://localhost:4000';


  const handleSubmit= async(ev)=>{
    ev.preventDefault();
    setSubmitError(" ");
    const v = validate();
    setErrors(v);
    if(Object.keys(v).length) return;

    setLoading(true);

    try {
        const payload={
            name:name.trim(),
            email: email.trim().toLowerCase(),
            password,
        };
          const resp = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data = null;

      try {
        data = await resp.json();
      } catch (e) {
        //ignore all the errors
      }
      
      if (!resp.ok) {
        const msg = data?.message || 'Register failed';
        setSubmitError(msg);
        return;
      }

      if (data?.token) {
        try {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user || { name: name.trim(),
                email: email.trim().toLowerCase(),
              })
          );


     
        } catch (err) {
          //ignore all the error
        }
      }

      if(typeof onSignupSuccess==='function'){
        try {
            onSignupSuccess(
                data.user||{
                    name: name.trim(),
                email: email.trim().toLowerCase(),
                    
                }
            )
        } catch (err) { }
      }
      navigate("/login",{replace: true});

    } catch (err) {
        console.error('signup error:', err);
        setSubmitError("network error")
    }

    finally{
        setLoading(false);
    }
  }



  return (
    <div className={signupStyles.pageContainer}>
            <Link to='/login' className={signupStyles.backButton}>
        <ArrowLeft className={signupStyles.backButtonIcon} />
        <span className={signupStyles.backButtonText}>back</span>
      </Link>


      <div className={signupStyles.formContainer}>
        <form onSubmit={handleSubmit}>
        <div className={signupStyles.animatedBorder}>
            <div className={signupStyles.formContent}>
                <h2 className={signupStyles.heading}>
                    <span className={signupStyles.headingIcon}>
                        <CheckCircle className={signupStyles.headingIconInner}/>
                        </span> 

                        <span className={signupStyles.headingText}> Create Account</span>

                </h2>
                <p className={signupStyles.subtitle}> 
                     Signin to continue to the Quiz App 
                </p>

                <label className={signupStyles.label}>
                    <span className={signupStyles.labelText}> full name</span>
                    <div className={signupStyles.inputContainer}>
                        <span className={signupStyles.inputIcon}>
                            <User className={signupStyles.inputContainer}/>
                        </span>

                        <input type="text" name='name' value={name} onChange={(e)=>{
                            setName(e.target.value),
                            setErrors((s) =>({     ...s, 
                                    name: undefined})
                            );
                        }}/>
                    </div>
                </label>
            </div>
        </div>
        </form>
      </div>

    </div>
  )
}

export default Signup
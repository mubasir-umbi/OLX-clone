import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mailErr, setMailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [invalidUserMsg, setInvalidUserMsg] = useState(null)

  const onSubmitHandler = e => {
    e.preventDefault()

    let isValid = true
  
    if(email.trim() === ''){
      setMailErr('Invalid email')
      isValid = false
    }
    
    if ( password.trim() === '' ){
      setPasswordErr('Invlid password')
      isValid = false
    }
      
    if(isValid){
      console.log('AM FROM FIR AUTH');
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        history.push('/')
      }).catch((error) => {
        console.log(error.message)
        setInvalidUserMsg('Incorrect username or Password')
      })
      console.log(email, password);
    }
   console.log('hii am from last');
    }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}  
            onChange={e => setEmail(e.target.value)} />
            {mailErr && <p style={{color: 'red'}}>{mailErr}</p>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordErr && <p style={{color: 'red'}}>{passwordErr}</p>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => history.push('signup')}>Signup</a>
        {invalidUserMsg && <p style={{color: 'red'}}>{invalidUserMsg}</p>}
      </div>
    </div>
  );
}

export default Login;

import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom'
import validateForm from '../../FormValidation/signup'

import Logo from '../../olx-logo.png';
import './Signup.css';


export default function Signup() {

const history = useHistory()
const {firebase} = useContext(FirebaseContext)

const [errors, setErrors] = useState({});
 const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      mobile: ''
    })


 const inputChangeHandler = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};



const onSubmitHandler = (e) => {
  e.preventDefault()

  const validationErrors = validateForm(formData);
  setErrors(validationErrors);

  console.log(validationErrors);

  if (Object.keys(validationErrors).length === 0) {

    firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password).then((res) => {
      res.user.updateProfile({displayName: formData.name}).then(() => {
        firebase.firestore().collection('users').add({
          id: res.user.uid,
          name : formData.name,
          mobile:formData.mobile
        }).then(() => {
          history.push("/login")
        })
      })
    })

    console.log('Form submitted successfully:', formData);
  }

}



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={onSubmitHandler}>
         <div>
         <label htmlFor="userName">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={formData.name}
            onChange={inputChangeHandler}
          />
          {errors.name && <p className="error">{errors.name}</p>}
         </div>

         <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={inputChangeHandler}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
          <label htmlFor="mobile">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={inputChangeHandler}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={inputChangeHandler}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a onClick={()=> history.push('/login')}>Login</a>
      </div>
    </div>
  );
}

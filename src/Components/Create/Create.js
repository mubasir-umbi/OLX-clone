import React, { Fragment, useContext, useState } from 'react';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom'
import ValidateForm from '../../FormValidation/create';

import './Create.css';


const Create = () => {

  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const  history  = useHistory()

  // const [name, setName] = useState('')
  // const [category, setCategory] = useState('')
  // const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
  })


  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const date = new Date()

  const onSubmitHandler = (e) => {
    e.preventDefault()

   const { name, category, price } = formData

   const validationErrors = ValidateForm(formData);
  setErrors(validationErrors);

  console.log(validationErrors);

  if (Object.keys(validationErrors).length === 0) {

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then(url => {
        firebase.firestore().collection('products').add({
          name : name,
          category : category,
          price : price,
          url,
          userId : user.uid,
          createdAt: date.toDateString()
        })
        history.push('/home')
      })
    }).catch((err) => {
      if(err){
        history.push('/login')
      }
    })
  }
}


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="fname">Name</label>
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
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={inputChangeHandler}
            />
            {errors.category && <p className="error">{errors.category}</p>}

            
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              id="fname" 
              name="price" 
              value={formData.price}
              onChange={inputChangeHandler}
            />
            {errors.price && <p className="error">{errors.price}</p>}

            <br />
          
          <br />
          <img 
            alt="Posts" 
            height="200px" 
            src={image ? URL.createObjectURL(image) : ''}
          >
          </img>
          
            <br />
            <input type="file" 
               onChange={e => setImage(e.target.files[0])}
               required
            />
            <br />
            <button 
             type='submit'
             className="uploadBtn">
              upload and Submit
            </button>

            </form>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

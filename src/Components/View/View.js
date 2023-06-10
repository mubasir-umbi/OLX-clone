import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';

import './View.css';

function View() {

  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)


  useEffect(() => {
    console.log(postDetails, 'post detailssss');
    const userId = postDetails.userId
    firebase.firestore().collection('users').where('id', '==', userId ).get().then((res) => {
      res.forEach((doc) => {
        setUserDetails(doc.data())
      })
    })
  }, []) 


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userName}</p>
          <p>{userDetails.mobile}</p>
        </div> }
      </div>
    </div>
  );
}


export default View;



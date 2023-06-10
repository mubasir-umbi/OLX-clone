const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.userName) {
      errors.name = 'Name is required';
    }
  
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    return errors;
  };
  
  const isValidEmail = (email) => {
    // Perform email validation logic here
    // You can use a regular expression or any other method
    // This is a basic example
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  import React, { useState } from 'react';

  const Form = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform form validation
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        // Form is valid, perform form submission logic here
        console.log('Form submitted successfully:', formData);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default Form;
    
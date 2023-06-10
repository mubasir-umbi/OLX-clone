const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.name) {
        errors.name = 'Name is required';
      }else if(!isValidName(formData.name)){
          errors.name = 'Invalid name format';
      }
  
      if (!formData.category) {
        errors.category = 'Name is required';
      }else if(!isValidName(formData.category)){
          errors.category = 'Invalid category format';
      }

    if(!formData.price){
        errors.price = 'price is required'
    }else if (!isValidPrice(formData.price)){
        errors.price = 'Invalid price format'
    }
  
    return errors;
  };



  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const isValidPrice = (price) => {
    const regex = /^\d+$/;
    return regex.test(price);
  };


  export default validateForm;
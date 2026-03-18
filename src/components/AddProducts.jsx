import React, { useState } from 'react'
import axios from 'axios';
import Loader from './Loader';

const AddProducts = () => {
  // introduce the hooks 
  const [product_name, setproductName] = useState("");
  const [product_description, setproductDescription] = useState("");
  const [product_cost, setproductcost] = useState("");
  const [product_photo, setproductphoto] = useState("");


  // declare the additional hook to manage the state of the application
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  // create a function that will handle the submit action
  const handleSubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // setloading hook with a message (activate it)
    setLoading(true);

    try{
      // create a form data
      const formdata = new FormData();

      // append the four details in the form data
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // interact with axios to help you use the method post
      const response = await axios.post("https://blackice6.alwaysdata.net/api/add_product", formdata);

      // set loading hook back to default 
      setLoading(false);

      // update the success hook with a message
      setSuccess(response.data.message)

      // clear the hooks (setting them back to default/empty)
      setproductName("");
      setproductDescription("");
      setproductcost("");
      setproductphoto("");

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    catch(error){
        // set loading hook back to default
        setLoading(false);

        // update the seterror with a message
        setError(error.message)
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
        <div className="card col-md-6 shadow p-4">
          <h3 className='text-primary'>Welcome to Add Product</h3>

          {/* bind the loading hook */}
          {loading && <Loader />}

          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Enter the product Name'
            className='form-control'
            required 
            value={product_name}
            onChange={(e) => setproductName(e.target.value)}/> <br />

            {/*productName*/}

            <input type="text"
            placeholder='Enter The Product Description'
            className='form-control'
            required 
            value={product_description}
            onChange={(e) => setproductDescription(e.target.value)}/> <br />

            {/*product_description*/}

            <input type="number"
            placeholder='Enter the product price'
            className='form-control'
            required 
            value={product_cost}
            onChange={(e) => setproductcost(e.target.value)}/> <br />

            {/*product_cost*/}

            <label className='text-primary'>Product Image</label>
            <input type="file" 
            className='form-control'
            required
            accept='image/*'
            onChange={(e) => setproductphoto(e.target.files[0])}
            /> <br />

            <input type="submit"
            value="Add Product"
            className='btn btn-primary' />
          </form>
        </div>

    </div>
  )
}

export default AddProducts;
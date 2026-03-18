import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {

    // destructure the details passed from the get products component
    // The use location hook allows us to get/destructure the properties passed from the previous component
  const { product } = useLocation().state || {};

  // declare the navigate hook
  const navigate = useNavigate();

  /* console.log("The details passed from the get products component are: ", product); */
  // Bellow we specify the image base url
  const img_url = "https://blackice6.alwaysdata.net/static/images/"
  // initialize hooks to manage the state of the application
  const [number, setNumber] = React.useState("");

  // declare the additional hook to manage the state of the application
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

  // create a function to handle the submit action
        const handleSubmit = async (e) => {
            // prevent the site from reloading
            e.preventDefault();

            // update the loading hook
            setLoading(true);

            try {
                // create a form data object
                const formData = new FormData();

                // append the data to the form data
                formData.append("phone", number);
                formData.append("amount", product.product_cost);

                const response = await axios.post("https://blackice6.alwaysdata.net/api/mpesa_payment", formData);
                // set loading back to default
                setLoading(false);

                // update the success hook with a message
                setSuccess(response.data.message);
            }
            catch (error) {
                // if there is an error respond to error
                setLoading(false);

                // update the error hook with a message
                setError(error.message);
            }
        }

  return (
    <div className='row justify-content-center'>
         
        <h1 className='text-success'>make payment - lipa na m-pesa</h1>
        
        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="<- Back" 
            onClick={() => navigate('/')}/>
        </div>

        <div className='col-md-6 card shadow p-4'>
            <img src= {img_url + product.product_photo} alt="product name" className='product_img' />

            <div className="card-body">
                <h5 className="text-info">{product.product_name}</h5>
            </div>
            <p className="text-dark">{product.product_description}</p>
            <b><h4 className="text-warning"> KES {product.product_cost}</h4></b><br />

            <form onSubmit={handleSubmit}>

                 {/* bind the loading hook */}
                {loading && <Loader />}

                <h3 className="text-success"> {success} </h3>
                <h4 className="text-danger"> {error} </h4>

                <input type="number" className='form-control mb-3' placeholder='Enter your phone number 254xxxxxxxx' 
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                /> <br />

                {/* {number} */}

                <input type="submit" className='btn btn-success' value="Make Payment" />
            </form>
        </div>
    </div>
  )
}

export default Makepayment
import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Checkout.css";
import axios from 'axios';
import { USER_SERVER } from '../../Config.js'
import { loadStripe } from "@stripe/stripe-js";

//const stripePromise = loadStripe("pk_test_51K2nFKI3nGDAQpN4kUB5Eze7YikzHZuPAoMsXggN3elK1ffV60tlkxHtnWvLWHesENrgzGbRK2sXzgPUDdCtUx7q00Msap2YzJ");


function Checkout(props) {

  //console.log("props", props);
  const stripe = useStripe();
  const elements = useElements();

  const pay = async () => {
    try {
      const response = await fetch("http://localhost:5000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("data", data);
      const cardElement = elements.getElement(CardElement);
      const confirmPayment = await stripe.confirmCardPayment(
        data.clientSecret,
        { payment_method: { card: cardElement } }
      );
      console.log(confirmPayment);
      const { paymentIntent } = confirmPayment;
      if (paymentIntent.status === "succeeded")
      { 
        alert(`Payment successful!`)
        
      }
      else {alert(`Payment failed!`);}

      if(paymentIntent.status === "succeeded") {
        const request = axios.put(`${USER_SERVER}/subscribed`,props.user.userData)
        .then(response => response.data);

        //return request;
        window.location.href = "/Subscription";
      }
    } catch (err) {
      console.error(err);
      alert("There was an error in payment");
    }
  };

  return (
    <div className="somediv">
      <div className="amount">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pay <b>$69.99</b></p>
                </div>
    <div className="checkout">
      <CardElement style={{width:'100px'}} />
      <button onClick={pay}>Pay</button>
    </div>
    </div>
  );
}

export default Checkout;

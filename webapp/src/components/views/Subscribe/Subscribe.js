import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

//const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);
const stripePromise = loadStripe("pk_test_51K2nFKI3nGDAQpN4kUB5Eze7YikzHZuPAoMsXggN3elK1ffV60tlkxHtnWvLWHesENrgzGbRK2sXzgPUDdCtUx7q00Msap2YzJ");


function Subscribe() {

  console.log
    return (
      <div>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
      </div>
    )
}

export default Subscribe;

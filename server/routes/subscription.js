require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51K2nFKI3nGDAQpN4z9F2dFFLgePkIKQu2suQMH7owgcCQqFbpSYDqI4lTA2b2i6QoELk6ThRseuEKBv06ncMbwIT005FsXXzDg");
const router = express.Router();


const { auth } = require("../middleware/auth");

router.post("/pay", async (req, res) => {
  try {
    const amount = 6999; // lowest denomination
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        name: "value",
      },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ clientSecret, message: "Payment Initiated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/stripe", (req, res) => {
  if (req.body.type === "payment_intent.created") {
    console.log(`${req.body.data.object.metadata.name} initated payment!`);
  }
  if (req.body.type === "payment_intent.succeeded") {
    console.log(`${req.body.data.object.metadata.name} succeeded payment!`);
  }
});

// router.get("/subscribed", auth, (req, res) => {
//   User.findOneAndUpdate({ _id: req.user._id }, { subscribed: true }, (err, doc) => {
//       if (err) return res.json({ success: false, err });
//       return res.status(200).send({
//           success: true
//       });
//   });
// });

// router.post("/getSubscriptionDetails", (req, res) => {

//   User.findById({_id: req.user.id})
//   Favorite.find({ 'userFrom': req.body.userFrom })
//       .exec((err, users) => {
//           if (err) return res.status(400).send(err);
//           return res.status(200).json({ success: true, users })
//       })
// });



module.exports = router;

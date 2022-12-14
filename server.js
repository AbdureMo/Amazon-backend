const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const stripe = require("stripe")(
  "sk_test_51Lz3XlBtfcWg7X9gQRkbXQlNCvoikUt021IF0fJKofr9iivGMxYxkAF90wPIqW2AtYBiZhrZH3mxdOXi2wSO3Jpe00nnEZufUI"
);

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
app.get("/home", (request, response) =>
  response.status(200).send("Abdure the coder")
);
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log(`serever running on port: ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const moongose = require("mongoose");
const dotenv = require("dotenv").config();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// DB_Connection // Server_Connection
console.log("url", process.env.MONGODB_URL);
moongose.set("strictQuery", false);
moongose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("database is connected");
  })
  .then(
    app.listen(PORT, () => {
      console.log(`server is running ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("errors occurs", err);
  });

//   Schema
const registerSchema = moongose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  image: String,
});

// Model
const registerModel = moongose.model("register", registerSchema);

//   Api_config

app.get("/", (req, res) => {
  res.send({ message: "Registeration successfully" });
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;
  console.log("valuesss", email);
  const sendData = await registerModel.findOne(
    { email: email },
    (err, result) => {
      // console.log("resultsss", result);
      console.log("errr", err);
      if (result) {
        res.send({ message: "Email is Already here", verify: false });
      } else {
        const data = registerModel(req.body);
        const save = data.save();
        res.send({ message: "Registeration successfully", verify: true });
      }
      console.log("resultsss", result);
    }
  );
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  registerModel
    .findOne({ email: email }, async (err, result) => {
      // console.log("errr", result);
      if (result) {
        const temp = await result;
        password === temp.password
          ? res.send({
              message: "Log in sucessfully",
              verify: true,
              userdata: temp,
            })
          : res.send({ message: "Incorrect password", verify: false });
      } else {
        res.send({ message: "invalid email", verify: false });
        console.log("invalid email");
      }
    })
    .catch((err) => console.log("error occurs", err));
});

//product section

//schema
const newproductSchema = moongose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

//model
const newProductModel = moongose.model("newproduct", newproductSchema);

//api config

app.post("/addNewProduct", async (req, res) => {
  const saveproduct = await newProductModel(req.body);
  saveproduct.save();
  res.send({ message: "new product added sucessfully", status: true });
  console.log("Body", req.body.name);
});

app.post("/allProduct", async (req, res) => {
  const get_all_product = await newProductModel
    .find({}, (err, result) => {
      res.send({
        message: "All product Send Successfully",
        data: result,
        status: true,
      });
    })
    .then(console.log("data send successfully"))
    .catch((err) => console.log("Error occurs", err));
});

//cart section

const cartdataSchema = moongose.Schema({
  _id: String,
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  quantity: Number,
});
//Model

const cartModel = moongose.model("CartItems", cartdataSchema);

// Cart Api config

app.post("/cartAll", async (req, res) => {
  const getAllCartItems = await cartModel.find({}, (err, result) => {
    res.send({ message: "Cart All Data", data: result, status: true });
  });
});

app.post("/addCart", async (req, res) => {
  const { name, _id, category, price, description, image } = req.body;
  const addCart = await cartModel.findOne({ _id: _id }, async (err, result) => {
    if (!result) {
      const values = cartdataSchema;
      values.name = name;
      values._id = _id;
      values.category = category;
      values.price = price;
      values.description = description;
      values.image = image;
      values.quantity = 1;
      console.log("valuess", values.price);
      const addItem = await cartModel(values);
      addItem.save();
      res.send({ message: "New item add in cart " });
    } else {
      result.quantity += 1;
      const addItem = await cartModel(result);
      addItem.save();
      console.log("check quantity", result.quantity);
      console.log("increase quantity");
      res.send({ message: "Add Cart Quantity" });
    }
  });
  console.log("add cart value", _id);
});

app.post("/modifyQty", (req, res) => {
  res.send({ message: "add cart is working" });
});

app.post("/deleteCartItem", (req, res) => {
  res.send({ message: "delete cart is working" });
});

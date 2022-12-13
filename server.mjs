//sir inzamam api
import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const app = express();
const port = process.env.PORT || 5001;
const mongodbURI =
  process.env.mongodbURI ||
  "mongodb+srv://saad:sdsdsd@cluster0.9bemtsg.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(mongodbURI)

app.use(cors());
app.use(express.json());

let products = []; // TODO: connect with mongodb instead

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  createdOn: { type: Date, default: Date.now },
});
const productModel = mongoose.model("products", productSchema);

app.post("/product", (req, res) => {
  const body = req.body;
  // const Id = uuidv4();
  // const productId = { ...body, id: Id };

  if (!body.name || !body.price || !body.description) {
    res.status(400).send({ message: "required parameters missing" });
    return;
  }
  console.log(body.name); 
  console.log(body.price);
  console.log(body.description);
 
  productModel.create(
    {
      name: body.name,
      price: body.price,
      description: body.description,
    },
    (err, saved) => {
      if (!err) {
        console.log(saved);

        res.send({
          message: "product added successfully",
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  );
});

//   products.push(
//     productId
//   );
//   res.send({ message: "product added successfully" });
// });

app.get("/products", (req, res) => {
  res.send({
    message: "got all products successfully",
    data: products,
  });
});
console.log(products[0]);

app.get("/products/:id", (req, res) => {
  const id = req.params.id;

  const foundProduct = products.find((body) => body.id == id);
  res.send(foundProduct);
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  products = products.filter((body) => body.id != id);

  res.send(`user with id ${id}`);
});

app.put("/products/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.name || !body.price || !body.description) {
    res.status(400).send({ message: "required parameters missing" });
    return;
  }

  console.log(body.name);
  console.log(body.price);
  console.log(body.description);

  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products[i].name = body.name;
      products[i].price = body.price;
      products[i].description = body.description;
      res.send({ message: "product modified successfully" });
      isFound = true;
      break;
    }
  }
  if (!isFound) {
    res.status(404);
    res.send({ message: "edit fail: product not found" });
  }
  res.send({ message: "product added successfully" });
});


const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use("*", express.static(path.join(__dirname, "./web/build")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

// import fsPromises from "fs/promises";
import express, { Request, Response, NextFunction } from "express";


class Product {
    name: string;
    price: number;
  id: number;
}

const productsData: Product[] = [
  { name: "p1", price: 30, id: 1 },
  { name: "p2", price: 70, id: 2 },
  { name: "p3", price: 15, id: 3 },  
];

const server = express();
server.use(express.json()) // if there is body, it will be accessible 

// get all products
server.get(
  "/api/products",
  (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(productsData);
  }
);

// get single product by id
server.get(
  "/api/products/:id",
  (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const index = productsData.findIndex((p) => p.id === id);
      if (index === -1) {
        response.status(400).json("id doesn't exist!");
        return;
      }
      response.json(productsData[index]);
    } catch (error) {
      response.status(500).json("Error");
    }
  }
);

// post-create new product
server.post(
  "/api/products",
  (request: Request, response: Response, next: NextFunction) => {
    try {
        const newProduct: Product = request.body;  // don't forget server.use(express.json())
        const newId = Math.max.apply(Math, productsData.map((p)=>p.id));  // find max value (from stackoverflow)
        newProduct.id = newId+1;
        productsData.push(newProduct);
        response.json(newProduct);
    } catch (error) {
      response.status(500).json("Error");
    }
  }
);

server.listen(4000, () => {
  console.log("Start listening on http://localhost:4000");
});

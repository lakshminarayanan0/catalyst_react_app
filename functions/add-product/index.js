"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.post('/',(req,res)=>
{
	const catalystApp=catalyst.initialize(req);
	const newProduct=req.body
	const {productName,stockQuantity,price}=newProduct;
    const zcql=catalystApp.zcql();
    const query=`insert into products (productName,stockQuantity,price) values ('${productName}',${stockQuantity},${price})`;
    const insertPromise=zcql.executeZCQLQuery(query);
    insertPromise
	.then(addedProduct=>
	{
		console.log(addedProduct);
		res.status(200).json({success:true,message:"product added successfully.",response:addedProduct})
	})
	.catch(err=>
	{
		console.log(err.message);
		res.status(500).json({success:false,response:"Internal server error."})
	})
})



module.exports = app;
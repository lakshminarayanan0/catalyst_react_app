"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.get('/',(req,res)=>
{
	const catalystApp=catalyst.initialize(req)
	const zcql=catalystApp.zcql();
	const query=`select * from products`;
	const getPromise=zcql.executeZCQLQuery(query)
	getPromise
	.then(products=>
	{
     
		if(products.length===0)
		{
			res.status(200).json({success:true, message:"No products found.",response:[]})
		}
		else
		{
			console.log(products);
			res.status(200).json({success:true, response:products})
		}
	})
	.catch(err=>
	{
		console.log(err.message);
		res.status(500).json({success:false,response:"Internal server error."})
	})

})


module.exports=app
"use strict";
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.get('/:id',(req,res)=>
{
	const id=req.params.id
	const catalystApp=catalyst.initialize(req)
	const zcql=catalystApp.zcql()
	const query=`select * from users where userId=${id}`
	zcql.executeZCQLQuery(query)
	.then(user=>
	{
		console.log(user);
		if(user.length===0)
		{
			res.status(200).json({success:true,response:[],message:"No user found"})
		}
		else
		{
			res.status(200).json({success:true,response:user})
		}
	})
	.catch(err=>
	{
		console.log(err);
		res.status(500).json({success:false,error:err.message})
	})
})

module.exports=app;
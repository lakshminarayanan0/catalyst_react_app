"use strict"
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.put('/:id',(req,res)=>
{
	const orderId=req.params.id;
	const status=req.body.status
	const catalystApp=catalyst.initialize(req);
	const statusArr=['placed','dispatched','canceled','delivered']
	if(statusArr.includes(status))
	{
		const zcql=catalystApp.zcql();
		console.log(status,orderId);
		const query=`update orders set status='${status}' where ROWID=${orderId}`
		zcql.executeZCQLQuery(query)
		.then(response=>
		{
			console.log(response);
			res.status(200).json({success:true,message:"status updated to " +status,response})
		})
		.catch(err=>
		{
			console.log(err);
			res.status(500).json({success:false,message:"Error updating status.",error:err.message})
		})
	}
	else
	{
		res.redirect('/error')
	}
	
})


module.exports=app
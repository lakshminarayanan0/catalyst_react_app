"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.put('/:id',(req,res)=>
{
	const catalystApp=catalyst.initialize(req);
	const updateData=req.body
	const id =req.params.id;
	console.log(updateData,id);
    const zcql=catalystApp.zcql();
    const getQuery=`select * from products where ROWID=${id}`;
    const getPromise=zcql.executeZCQLQuery(getQuery);
    getPromise
	.then(product=>
	{
		let updateQuery=`update products set `;
		if(Object.keys(product).length===0)
		{
			return {success:false,code:404}
		}
		else
		{
			if(updateData.stockQuantity)
			{
				updateQuery+=`stockQuantity=${parseInt(updateData.stockQuantity)}`
			}
			if(updateData.price)
			{
				updateQuery+=`${updateData.stockQuantity ? ',' : ' '} price=${parseFloat(updateData.price).toFixed(2)}`
			}
			if(updateData.name)
			{
				updateQuery+=`${updateData.stockQuantity || updateData.price ? "," : " "} productName='${updateData.name}' `
			}

			updateQuery +=`where ROWID=${id}`

			const updatePromise=zcql.executeZCQLQuery(updateQuery)
			return updatePromise
					.then(()=>
					{
						return {
								success:true,
								code:200
								}
					})
		}
	})
	.then(response=>
	{
		if(response.code===200)
		{
			res.status(200).json({success:true,response:`product with id: ${id} updated successfully.`})
		}
		else if(response.code===404)
		{
			res.status(404).json({success:false,response:`product with id: ${id} not found.`})
		}

	})
	.catch(err=>
	{
		console.log(err.message);
		res.status(500).json({success:false,response:"Internal server error."})
	})
})



module.exports = app;
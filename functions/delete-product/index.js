"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.delete('/:id',(req,res)=>
{
	const catalystApp=catalyst.initialize(req);
	const id =req.params.id;
    const zcql=catalystApp.zcql();
    const getQuery=`select * from products where ROWID=${id}`;
    const getPromise=zcql.executeZCQLQuery(getQuery);
    getPromise
	.then(product=>
	{
		if (Object.keys(product).length !== 0) 
		{
			const query=`delete from products where ROWID=${id}`;
			const deletePromise=zcql.executeZCQLQuery(query);
			return deletePromise.then(()=>
			{
				return {
						success:true,
						code:200
						}
			})
		}
		else
		{
			return {
					success:false,
					code:404
					}
		}
	})
	.then(response=>
		{
			if(response.code===200)
			{ 
			  res.status(200).json({success:true,response:`product with id: ${id} deleted successfully.`})
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
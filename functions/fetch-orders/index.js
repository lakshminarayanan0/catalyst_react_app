"use strict"
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());


app.get('/',(req,res)=>
{
	const catalystApp=catalyst.initialize(req);
	const zcql=catalystApp.zcql();
    const query=`SELECT 
    orders.ROWID AS "orderId", 
    orders.total AS "total",
    orders.MODIFIEDTIME AS "modifiedAt",
    orders.CREATEDTIME AS "createdAt",
    orders.status AS "status", 
	orders.orderedBy as "orderedBy",
    users.firstName AS "name", 
    products.productName AS "productName",
	products.ROWID as 'productId',
	products.price as 'price',
    orderlist.quantity AS "quantity", 
    orderlist.subtotal AS "subtotal" 
FROM 
    orders
LEFT JOIN 
    orderlist ON orders.ROWID = orderlist.orderId
LEFT JOIN 
    products ON products.ROWID = orderlist.product
LEFT JOIN 
    users ON users.ROWID = orders.orderedBy;
`
    zcql.executeZCQLQuery(query)
	.then(data=>
	{
		function formatData(data) 
		{
			const formattedData = [];
		
			const ordersMap = new Map();
			data.forEach(entry =>
			{
				const orderId = entry.orders.ROWID;
				if (!ordersMap.has(orderId)) 
				{
					ordersMap.set(orderId, 
					{
						"orderId": orderId,
						"orderedBy": entry.orders.orderedBy,
						"name": entry.users.firstName,
						"total": entry.orders.total,
						"status": entry.orders.status,
						"createdAt": entry.orders.CREATEDTIME,
						"modifiedAt": entry.orders.MODIFIEDTIME,
						"orderlist": []
					});
				}
				if (entry.products.productName) 
				{
					ordersMap.get(orderId)["orderlist"].push({
						"productName": entry.products.productName,
						"productId": entry.products.ROWID,
						"quantity": parseInt(entry.orderlist.quantity),
						"price": entry.products.price,
						"subtotal": parseInt(entry.orderlist.subtotal)
					});
				}
			});
		
			ordersMap.forEach(value => 
			{
				formattedData.push(value);
			});

			formattedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			return formattedData;
		}
		
		

	const formattedData = formatData(data);
	return formattedData
	})
	.then(response=>
	{
		console.log(response.length,response);
		res.status(200).json({success:true,response})
	})
	.catch(err=>
	{   
		console.log(err.stack)
		res.status(500).json({err:err.message})
	})
})


module.exports=app


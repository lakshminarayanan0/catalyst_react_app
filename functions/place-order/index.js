"use strict";
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    const newOrder = req.body;
    console.log(newOrder);
    const catalystApp = catalyst.initialize(req);
    const zcql = catalystApp.zcql();

    let orderId;
    let orderedAt;
    let totalAmount;
    let status;
    let modifiedAt;

    const orderQuery = `insert into orders (orderedBy,total) values (${newOrder.orderedBy}, ${parseFloat(newOrder.total).toFixed(2)})`;

    zcql.executeZCQLQuery(orderQuery)
        .then(orderResponse => {
            const placedOrderDetails = orderResponse;
            orderId = placedOrderDetails[0].orders.ROWID;
            orderedAt=placedOrderDetails[0].orders.CREATEDTIME;
            modifiedAt=placedOrderDetails[0].orders.MODIFIEDTIME;
            totalAmount=placedOrderDetails[0].orders.total;
            status=placedOrderDetails[0].orders.status;
            console.log(orderId);
            const insertPromises = newOrder.orderlist.map(product => {
                const { productId, quantity, subtotal } = product;
                console.log(productId, quantity, subtotal);
                const addOrderedProductsQuery = `insert into orderlist (orderId,product,quantity,subtotal) values (${orderId},${productId},${quantity},${subtotal})`;
                return zcql.executeZCQLQuery(addOrderedProductsQuery);
            });

            return Promise.all(insertPromises);
        })
        .then(orderlistResponses => {
            console.log("Order placed successfully:", orderlistResponses);
            res.status(200).json({ success: true, response: {orderId:orderId,orderedBy:newOrder.orderedBy,total:totalAmount,status:status,createdAt:orderedAt,modifiedAt:modifiedAt,orderlist:orderlistResponses} });
        })
        .catch(err => {
            console.log("Error placing order:", err);
            const rollbackOrderQuery = `delete from orders where ROWID = ${orderId}`;
            const rollbackOrderlistQuery = `delete from orderlist where orderId = ${orderId}`;

            zcql.executeZCQLQuery(rollbackOrderQuery)
                .then(() => {
                    console.log("Rollback successful: Order deleted");
                    return zcql.executeZCQLQuery(rollbackOrderlistQuery);
                })
                .then(() => {
                    console.log("Rollback successful: Orderlist deleted");
                    res.status(500).json({ message: "Order not placed", err: err.message });
                })
                .catch(rollbackErr => {
                    console.log("Rollback failed:", rollbackErr);
                    res.status(500).json({ message: "Order not placed", err: rollbackErr.message });
                });
        });
});

module.exports = app;

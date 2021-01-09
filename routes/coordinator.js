const Axios = require('axios');
const axios = Axios.create({validateStatus: null});
const express = require('express');
const router = express.Router();


router.post('/start_transaction', startTransaction);

async function startTransaction(req, resp) {
    /* { carNr: 7,
         renter: "Frida Flink",
         amount: 190
       }
     */

    // prepare Car
    let car_prepare = await axios.post(
        'http://127.0.0.1:3000/cars/prepare',
        {
            carNr: req.body.carNr,
            renter: req.body.renter
        }
    );

    // prepare Invoice
    let invoice_prepare = await axios.post(
        'http://127.0.0.1:3000/invoices/prepare',
        {
            invoiceNr: req.body.carNr,
            person: req.body.renter,
            amount: req.body.amount
        }
    );

    // commit
    await axios.post('http://127.0.0.1:3000/cars/commit');
    await axios.post('http://127.0.0.1:3000/invoices/commit');

    resp.json(true);
}

module.exports = router;

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

    if (car_prepare.status !== 200) {
        resp.status(409).json('/cars nicht bereit für prepare');
        return;
    }

    // prepare Invoice
    let invoice_prepare = await axios.post(
        'http://127.0.0.1:3000/invoices/prepare',
        {
            invoiceNr: req.body.carNr,
            person: req.body.renter,
            amount: req.body.amount
        }
    );

    if (invoice_prepare.status !== 200) {
        // Prepare abbrechen
        await axios.post('http://127.0.0.1:3000/cars/cancel');
        resp.status(409).json('/invoices nicht bereit für prepare');
        return;
    }

    // commit
    await axios.post('http://127.0.0.1:3000/cars/commit');
    await axios.post('http://127.0.0.1:3000/invoices/commit');

    resp.json("Transaktion erfolgreich beendet");
}

module.exports = router;

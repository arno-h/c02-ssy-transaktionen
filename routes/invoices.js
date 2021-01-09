const express = require('express');
const router = express.Router();
const db = require('../src/database');
const Invoice = require('../src/Invoice');

router.post('/', newInvoice);
router.get('/', listAllInvoices);
router.get('/:invoiceNr', getInvoice);
router.put('/:invoiceNr', updateInvoice);

router.put('/:invoiceNr/lock', changeLock);

let lockStatus = {};

function changeLock(req, res) {
    /* Body: { "action": ... } */  // "lock", "unlock"
    let nr = req.params.invoiceNr;
    let action = req.body.action;
    if (lockStatus[nr] === "lock") { // derzeit besetzt/gelockt
        if (action === "unlock") {
            lockStatus[nr] = "unlock";
            res.json(true);
        } else {                    // lock eines bereits gelockten Eintrags
            res.json(false);
        }
    } else { // derzeit frei/unlocked
        if (action === "lock") {
            lockStatus[nr] = "lock";
            res.json(true);
        } else {
            res.json(false);        // unlock eines bereits freien Eintrags
        }
    }
}


let invoiceCollection = db.getCollection('invoices');

function newInvoice(request, response) {
    let invoice = new Invoice(
        request.body.person,
        request.body.amount
    );
    invoiceCollection.insert(invoice);
    response.json(invoice);
}

function listAllInvoices(request, response) {
    response.json(invoiceCollection.find());
}

function getInvoice(request, response) {
    let invoice = invoiceCollection.get(request.params.invoiceNr);
    response.json(invoice);
}

function updateInvoice(request, response) {
    let invoice = invoiceCollection.get(request.params.invoiceNr);
    invoice.update(request.body);
    invoiceCollection.update(invoice);

    response.json(invoice);
}

module.exports = router;

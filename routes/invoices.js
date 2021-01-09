const express = require('express');
const router = express.Router();
const db = require('../src/database');
const Invoice = require('../src/Invoice');

router.post('/', newInvoice);
router.get('/', listAllInvoices);
router.get('/:invoiceNr', getInvoice);
router.put('/:invoiceNr', updateInvoice);
router.get('/:invoiceNr/lock', getLockStatus);
router.put('/:invoiceNr/lock', changeLock);

let invoiceCollection = db.getCollection('invoices');
let lockStatus = {};

function getLockStatus(req, res) {
    let nr = req.params.invoiceNr;
    res.json(lockStatus[nr]);
}

function changeLock(req, res) {
    /* Body: { "action": ... } */  // "lock", "unlock"
    let nr = req.params.invoiceNr;
    let action = req.body.action;
    if (lockStatus[nr] !== action) {
        lockStatus[nr] = action;
        res.json(true);
    } else {
        res.json(false);
    }
}

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

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

router.post('/prepare', prepare);
router.post('/commit/:invoiceNr', commit);
router.post('/cancel/:invoiceNr', cancel);


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


let in_transaction = {};
let transaction_person = {};    // wäre auch möglich person+amount in einer Variable zu speichern
let transaction_amount = {};

function prepare(req, resp) {
    // { invoiceNr: 2, person: "Frida Flink", amount: 190 }
    const invoiceNr = req.body.invoiceNr;

    if (in_transaction[invoiceNr] === true) {
        resp.status(409).end();
        return;
    }
    in_transaction[invoiceNr] = true;
    transaction_person[invoiceNr] = req.body.person;
    transaction_amount[invoiceNr] = req.body.amount;
    resp.status(200).end();
}

function commit(req, resp) {
    let invoiceNr = parseInt(req.params.invoiceNr);
    let invoice = invoiceCollection.get(invoiceNr);
    invoice.update({
        person: transaction_person[invoiceNr],
        amount: transaction_amount[invoiceNr]
    });
    invoiceCollection.update(invoice);
    in_transaction[invoiceNr] = false;
    resp.status(200).end();
}

function cancel(req, resp) {
    let invoiceNr = parseInt(req.params.invoiceNr);
    in_transaction[invoiceNr] = false;
    resp.status(200).end();
}

module.exports = router;

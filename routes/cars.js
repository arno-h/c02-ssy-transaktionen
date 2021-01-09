const express = require('express');
const router = express.Router();
const db = require('../src/database');
const Car = require('../src/Car');

router.post('/', newCar);
router.get('/', listAllCars);
router.get('/:carNr', getCar);
router.patch('/:carNr/renter', updateRenter);
router.get('/:carNr/lock', getLockStatus);
router.put('/:carNr/lock', changeLock);

let carCollection = db.getCollection('cars');
let lockStatus = {};

function getLockStatus(req, res) {
    let nr = req.params.invoiceNr;
    res.json(lockStatus[nr]);
}

function changeLock(req, res) {
    /* Body: { "action": ... } */  // "lock", "unlock"
    let nr = req.params.carNr;
    let action = req.body.action;
    if (lockStatus[nr] !== action) {
        lockStatus[nr] = action;
        res.json(true);
    } else {
        res.json(false);
    }
}

function newCar(request, response) {
    let car = new Car(
        request.body.brand,
        request.body.model,
        request.body.color,
        request.body.renter
    );
    carCollection.insert(car);
    response.json(car);
}

function listAllCars(request, response) {
    response.json(carCollection.find());
}

function getCar(request, response) {
    let car = carCollection.get(request.params.carNr);
    response.json(car);
}

function updateRenter(request, response) {
    let car = carCollection.get(request.params.carNr);
    car.setRenter(request.body.renter);
    carCollection.update(car);

    response.json(car);
}

module.exports = router;

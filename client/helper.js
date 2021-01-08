const Axios = require('axios');
const axios = Axios.create({validateStatus: null});


class Helper {
    constructor(label) {
        this.label = label;
    }

    delay(timeout, func, ...args) {
        setTimeout(() => func.apply(this, args), timeout);
    }

    updateRenter(carNr, renter, message) {
        axios.patch(
            'http://127.0.0.1:3000/cars/' + carNr + '/renter',
            { renter: renter }
        ).then(this.showResponse(message));
    }

    updateInvoice(invoiceNr, invoice, message) {
        axios.put(
            'http://127.0.0.1:3000/invoices/' + invoiceNr,
            invoice
        ).then(this.showResponse(message));
    }

    showCarAndInvoice(carNr, invoiceNr, message) {
        this.showCar(carNr, message);
        this.showInvoice(invoiceNr, message);
    }

    showCar(carNr, message) {
        axios.get('http://127.0.0.1:3000/cars/' + carNr)
            .then(this.showResponse(message));
    }

    showInvoice(invoiceNr, message) {
        axios.get('http://127.0.0.1:3000/invoices/' + invoiceNr)
            .then(this.showResponse(message));
    }

    showResponse(message="") {
        let heading = this.label + ': ' + message;

        return function (response) {
            console.log(heading);
            console.log(response.data);
        };
    }
}

module.exports = Helper;

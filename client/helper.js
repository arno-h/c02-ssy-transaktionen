const Axios = require('axios');
const axios = Axios.create({validateStatus: null});


class Helper {
    constructor(label) {
        this.label = label;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async updateRenter(carNr, renter, message) {
        const response = await axios.patch(
            'http://127.0.0.1:3000/cars/' + carNr + '/renter',
            { renter: renter }
        );
        this.showResponse(response, message);
        return response;
    }

    async updateInvoice(invoiceNr, invoice, message) {
        const response = await axios.put(
            'http://127.0.0.1:3000/invoices/' + invoiceNr,
            invoice
        );
        this.showResponse(response, message);
        return response;
    }

    async showCarAndInvoice(carNr, invoiceNr, message) {
        this.showCar(carNr, message + " (car)");
        this.showInvoice(invoiceNr, message + " (invoice)");
    }

    async showCar(carNr, message) {
        const response = await axios.get('http://127.0.0.1:3000/cars/' + carNr)
        this.showResponse(response, message);
        return response;
    }

    async showInvoice(invoiceNr, message) {
        const response = await axios.get('http://127.0.0.1:3000/invoices/' + invoiceNr)
        this.showResponse(response, message);
        return response;
    }

    showResponse(response, message="") {
        let heading = this.label + ': ' + message;
        console.log(heading);
        delete response.data.meta;
        delete response.data.$loki;
        console.log(response.data);
    }
}

module.exports = Helper;

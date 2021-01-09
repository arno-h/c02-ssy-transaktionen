const Helper = require('./helper');
const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

async function startTransaction(label, carNr, renter, amount) {
    console.log(label + ' wird gestartet mit carNr=' + carNr + ', renter=' + renter + ', amount=' + amount);
    let resp = await axios.post(
        'http://127.0.0.1:3000/coordinator/start_transaction',
        {
            renter: renter,
            carNr: carNr,
            amount: amount
        }
    );

    console.log(label + ' Status: ' + resp.status);
    console.log(label + ' Body: ' + resp.data);
}

async function main() {
    // mit Promise.all() führen wir die Transaktionen wieder parallel aus
    await Promise.all([
        // nur eine der drei Transaktionen ist erfolgreich
        startTransaction('Transaktion 1', 1, 'Fiona Flott', 90),
        startTransaction('Transaktion 2', 1, 'Rupert Renner', 110),
        startTransaction('Transaktion 3', 1, 'Sofie Schnell', 95),
        // aber andere Transaktionen funktionieren nun
        startTransaction('Transaktion 4', 2, 'Uwe Unfall', 120),
        startTransaction('Transaktion 5', 3, 'Klaudia Knall', 115),
    ]);

    const helper = new Helper('Datenbank');
    await helper.showCarAndInvoice(1, 1, 'Endergebnis -- Auto 1');
    await helper.showCarAndInvoice(2, 2, 'Endergebnis -- Auto 2');
    await helper.showCarAndInvoice(3, 3, 'Endergebnis -- Auto 3');
}

main().then();

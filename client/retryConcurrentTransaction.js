const Helper = require('./helper');
const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

async function startTransaction(label, carNr, renter, amount) {
    const helper = new Helper(label);
    console.log(label + ' wird gestartet mit carNr=' + carNr + ', renter=' + renter + ', amount=' + amount);

    while (true) {
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
        if (resp.status === 200)
            break;

        await helper.sleep(50 + Math.random()*20); // zwischen Versuchen warten
    }
}

async function main() {
    // alle drei Transaktionen sind erfolgreich
    // welche Transaktion "gewinnt" ist allerdings unbestimmt
    // mit Promise.all() führen wir die Transaktionen wieder parallel aus
    await Promise.all([
        startTransaction('Transaktion 1', 1, 'Fiona Flott', 90),
        startTransaction('Transaktion 2', 1, 'Rupert Renner', 110),
        startTransaction('Transaktion 3', 1, 'Sofie Schnell', 95),
    ]);
    const helper = new Helper('Datenbank');
    await helper.showCarAndInvoice(1, 1, 'Endergebnis');
}

main().then();

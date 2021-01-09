const Helper = require('./helper');
const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

async function main() {
    let resp = await axios.post(
        'http://127.0.0.1:3000/coordinator/start_transaction',
        {
            renter: "Sigi Sauser",
            carNr: 1,
            amount: 120
        }
    );

    console.log('Transaktion mit Status ' + resp.status + ' durchgeführt');
    console.log(resp.data);

    const helper = new Helper('Transaktion 1');
    await helper.showCarAndInvoice(1, 1, 'Resultat');
}

main().then();

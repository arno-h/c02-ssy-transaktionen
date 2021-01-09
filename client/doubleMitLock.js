const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

const Helper = require('./helper');
const Invoice = require('../src/Invoice');


async function client_1() {
    const client1 = new Helper("Client 1");

    let lock_resp = await axios.put('http://127.0.0.1:3000/cars/2/lock', {action: "lock"});
    if (lock_resp.data !== true) {
        console.log("Client 1 Car-Lock nicht frei.");
        return;
    }
    lock_resp = await axios.put('http://127.0.0.1:3000/invoices/2/lock', {action: "lock"});
    if (lock_resp.data !== true) {
        console.log("Client 1 Invoice-Lock nicht frei.");
        await axios.put('http://127.0.0.1:3000/cars/2/lock', {action: "unlock"});
        return;
    }

    client1.delay(       // Request verzögern
        5,               // um 5ms
        client1.updateRenter,   // dann diese Funktion aufrufen
        2,                      // 1. Parameter von updateRenter: Auto-ID
        "Barbara Blitzschnell", // 2. Parameter von updateRenter: Username
        "Update Car"            // 3. Parameter von updateRenter: Debug-Nachricht
    );

    client1.updateInvoice(
        2,
        new Invoice("Barbara Blitzschnell", 70),
        "Update Invoice"
    );

    await axios.put('http://127.0.0.1:3000/cars/2/lock', {action: "unlock"});
    await axios.put('http://127.0.0.1:3000/invoices/2/lock', {action: "unlock"});
}

async function client_2() {
    const client2 = new Helper("Client 2");

    let lock_resp = await axios.put('http://127.0.0.1:3000/cars/2/lock', {action: "lock"});
    if (lock_resp.data !== true) {
        console.log("Client 2 Car-Lock nicht frei.");
        return;
    }
    lock_resp = await axios.put('http://127.0.0.1:3000/invoices/2/lock', {action: "lock"});
    if (lock_resp.data !== true) {
        console.log("Client 2 Invoice-Lock nicht frei.");
        await axios.put('http://127.0.0.1:3000/cars/2/lock', {action: "unlock"});
        return;
    }

    client2.delay(
        2,
        client2.updateRenter,
        2, "Supersusi Semmelmann", "Update Car Client2"
    )
    client2.delay(
        3,
        client2.updateInvoice,
        2, new Invoice("Supersusi Semmelmann", 90), "Update Invoice Client 2"
    )

    await axios.put('http://127.0.0.1:3000/cars/2/lock', {action: "unlock"});
    await axios.put('http://127.0.0.1:3000/invoices/2/lock', {action: "unlock"});
}

// MAIN -------------------------

client_1().then();
client_2().then();

const helper = new Helper("Helper");
helper.delay(
    200,                        // delay
    helper.showCarAndInvoice,   // Funktion
    2, 2, "Show Car & Invoice"  // Funktionsparameter
);

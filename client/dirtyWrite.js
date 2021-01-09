const Helper = require('./helper');
const Invoice = require('../src/Invoice');


async function client1() {
    const client1 = new Helper("Client 1");

    await client1.sleep(15);
    await client1.updateRenter(2, "Barbara Blitzschnell", "Update Car");

    await client1.sleep(30);
    const invoice = new Invoice("Barbara Blitzschnell", 70);
    await client1.updateInvoice(2, invoice, "Update Invoice");
}

async function client2() {
    const client2 = new Helper("Client 2");

    // kein Sleep, gleich senden
    await client2.updateRenter(2, "Supersusi Semmelmann", "Update Car");

    await client2.sleep(50);
    const invoice = new Invoice("Supersusi Semmelmann", 90);
    await client2.updateInvoice(2, invoice, "Update Invoice");
}


async function main() {
    const helper = new Helper("Main");

    // Wir führen nicht "await client1(); await client2();" aus!
    // Dann würden die beiden Clients hintereinander laufen.
    // Stattdessen führen wir sie parallel aus, mit Promise.all().
    // Damit können wir unterschiedliche Laufzeiten simulieren.
    await Promise.all([client1(), client2()]);
    await helper.showCarAndInvoice(2, 2, "Final status");
}

main().then();

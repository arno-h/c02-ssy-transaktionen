const Helper = require('./helper');
const Invoice = require('../src/Invoice');

async function client1() {
    const client = new Helper("Client 1");

    let success = await client.lockCarAndInvoice(2);
    if (!success) {
        return;
    }

    await client.sleep(15);
    await client.updateRenter(2, "Barbara Blitzschnell", "Update Car");

    await client.sleep(30);
    const invoice = new Invoice("Barbara Blitzschnell", 70);
    await client.updateInvoice(2, invoice, "Update Invoice");

    await client.carLock(2, "unlock");
    await client.invoiceLock(2, "unlock");
}

/**
 * client2 bekommt einen Status zu lesen, der nur zwischenzeitlich existiert
 * (zwischen den beiden Updates von client1).
 */
async function client2() {
    const client = new Helper("Client 2");

    await client.sleep(40);
    await client.showCarAndInvoice(2, 2, "Reading");
}


// Parallele Ausführung der Clients mit Promise.all()
Promise.all([
    client1(),
    client2()
]).then();

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
 * Lösung: auch client2() muss beim Lesen locken.
 * Statt unmittelbar fehlzuschlagen, wiederholt client2 die
 * Anfrage so lange, bis sie funktioniert.
 */
async function client2() {
    const client = new Helper("Client 2");

    await client.sleep(5);     // nur um sicher zu gehen, dass client1 schon gelockt hat

    let success = false;
    while (!success) {
        success = await client.lockCarAndInvoice(2);
        // 20ms zwischen Lock-Versuchen warten
        // real wäre das zu kurz; wir wollen aber sehen, dass mehrere Lock-Versuche gemacht werden
        await client.sleep(20);
    }

    await client.showCarAndInvoice(2, 2, "Reading");

    // freigeben nicht vergessen :o)
    await client.carLock(2, "unlock");
    await client.invoiceLock(2, "unlock");
}


// Parallele Ausführung der Clients mit Promise.all()
Promise.all([
    client1(),
    client2()
]).then();

const Helper = require('./helper');
const Invoice = require('../src/Invoice');

simpleSale().then();

/**
 * simpleSale(): alles schön der Reihe nach (mit await)
 */
async function simpleSale() {
    const helper = new Helper("SimpleSale")

    await helper.showCar(
        2,              // Auto-ID (primary key)
        "Vor Update"    // Debug-Nachricht
    );

    await helper.updateRenter(
        2,                      // Auto-ID
        "Barbara Blitzschnell", // Username
        "Update Car"            // Debug-Nachricht
    );

    await helper.updateInvoice(
        2,
        new Invoice("Barbara Blitzschnell", 70),
        "Update Invoice"
    );


    await helper.showCarAndInvoice(2, 2, "Show Car & Invoice");
}

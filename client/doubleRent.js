const Helper = require('./helper');
const Invoice = require('../src/Invoice');


const client1 = new Helper("Client 1");

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


const client2 = new Helper("Client 2");
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



client1.delay(
    20,                          // delay
    client1.showCarAndInvoice,   // Funktion
    2, 2, "Show Car & Invoice"   // Funktionsparameter
);

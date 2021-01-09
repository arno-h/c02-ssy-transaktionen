const Helper = require('./helper');
const helper = new Helper("Simple")
const Invoice = require('../src/Invoice');

helper.showCar(
    2,              // Auto-ID (primary key)
    "Vor Update"    // Debug-Nachricht
);

helper.delay(       // Request verzögern
    5,              // um 5ms
    helper.updateRenter,    // dann diese Funktion aufrufen
    2,                      // 1. Parameter von updateRenter: Auto-ID
    "Barbara Blitzschnell", // 2. Parameter von updateRenter: Username
    "Update Car"            // 3. Parameter von updateRenter: Debug-Nachricht
);

helper.updateInvoice(
    2,
    new Invoice("Barbara Blitzschnell", 70),
    "Update Invoice"
);


helper.delay(
    10,                         // delay
    helper.showCarAndInvoice,   // Funktion
    2, 2, "Show Car & Invoice"  // Funktionsparameter
);

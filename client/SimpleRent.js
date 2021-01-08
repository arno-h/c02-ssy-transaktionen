const Helper = require('./helper');
const helper = new Helper("Simple")

helper.showCar(
    2,              // Auto-ID (primary key)
    "Vor Update"    // Debug-Nachricht
);

helper.delay(       // Request verzögern
    5,              // um 5ms
    helper.updateRenter,    // dann diese Funktion aufrufen
    2,                      // 1. Parameter von updateRenter: Auto-ID
    "Barbara Blitzschnell", // 2. Parameter von updateRenter: Username
    "Update"                // 3. Parameter von updateRenter: Debug-Nachricht
);

helper.showCar(2, "Show nach Update");

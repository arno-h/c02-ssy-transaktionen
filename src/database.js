const Loki = require("lokijs");
const Car = require('./Car');
const Invoice = require('./Invoice');

const db = new Loki('demo.json');

const invoices = db.addCollection('invoices');
const cars = db.addCollection('cars');

// Personen, die Rechnung für Autos begleichen
invoices.insert(new Invoice("Rudi Vollgas", 240));
invoices.insert(new Invoice("Susi Zitrone", 140));
invoices.insert(new Invoice("Lily Strupp", 190));
invoices.insert(new Invoice("Josi Flimmer", 170));

// Inventar des Händlers
cars.insert(new Car("VW", "Polo", "rot", "Rudi Vollgas"));
cars.insert(new Car("Citroen", "C3", "silber", "Susi Zitrone"));
cars.insert(new Car("Honda", "Jazz", "orange", "Lily Strupp"));
cars.insert(new Car("Fiat", "500x", "grün", "Josi Flimmer"));

/* Der Einfachheit halber nehmen wir an, dass die "Foreign-Key"-Beziehung
   so aussieht, dass die beiden Primärschlüssel gleich sind, d.h.
   Auto 1 <-> Rechnung 1, Auto 2 <-> Rechnung 2, etc.
 */

module.exports = db;

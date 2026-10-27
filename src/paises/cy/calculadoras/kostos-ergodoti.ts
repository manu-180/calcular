import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { eisfores, eisforesMina, REQUIERE_EISFORON } from "../lib/ergodotis";
import { OPCIONES_MISTHON } from "../lib/misthos";

export default definirCalculadora({
  id: "cy.kostos-ergodoti",
  mercado: "cy",
  concepto: "costo-empleador",
  slug: "kostos-ergodoti",
  estado: "publicado",
  requiere: REQUIERE_EISFORON,
  campos: [
    { id: "misthos", tipo: "moneda", etiqueta: "Μεικτός μηνιαίος μισθός", min: 0, porDefecto: 1500 },
    { id: "misthoi", tipo: "opcion", etiqueta: "Μισθοί τον χρόνο", opciones: OPCIONES_MISTHON, porDefecto: "12" },
    { id: "tameioAdeion", tipo: "si-no", etiqueta: "Πληρώνετε στο Κεντρικό Ταμείο Αδειών", porDefecto: false, ayuda: "Όχι, αν έχετε εξαίρεση και πληρώνετε εσείς την άδεια των εργοδοτουμένων." },
  ],
  calcular(e, v, { redondear }) {
    if (e.misthos <= 0) throw new ErrorEntrada("Εισάγετε μισθό μεγαλύτερο από το μηδέν.", "misthos");
    const mina = eisforesMina(e.misthos, e.tameioAdeion, v, redondear);
    const kostosMina = redondear(e.misthos + mina.ergodoti);
    let ergodotiEtous = redondear(mina.ergodoti * 12);
    let miktaEtous = redondear(e.misthos * 12);
    if (e.misthoi === "13") {
      // El 13.º se paga con el sueldo de diciembre: ese mes cotiza el doble, hasta el tope del mes.
      const dekemvrios = eisfores(e.misthos * 2, e.tameioAdeion, v["cy.anotato-orio-ka"], Math.max(0, v["cy.anotato-orio-gesy"] - 11 * (e.misthos + mina.adeies)), v, redondear);
      ergodotiEtous = redondear(mina.ergodoti * 11 + dekemvrios.ergodoti);
      miktaEtous = redondear(e.misthos * 13);
    }
    const kostosEtous = redondear(miktaEtous + ergodotiEtous);
    return {
      kostosMina,
      ergodotiMina: mina.ergodoti,
      kaErgodoti: mina.kaErgodoti,
      gesyErgodoti: mina.gesyErgodoti,
      tameia: redondear(mina.adeies + mina.pleonasmos + mina.anaptyxi + mina.synochi),
      miktaEtous,
      ergodotiEtous,
      kostosEtous,
      epivarynsi: redondear((ergodotiEtous / miktaEtous) * 100),
    };
  },
  resultado: [
    { clave: "kostosMina", etiqueta: "Κόστος εργοδότη τον μήνα", formato: "moneda", destacada: true },
    { clave: "ergodotiMina", etiqueta: "Εισφορές εργοδότη τον μήνα", formato: "moneda" },
    { clave: "kaErgodoti", etiqueta: "Κοινωνικές Ασφαλίσεις", formato: "moneda" },
    { clave: "gesyErgodoti", etiqueta: "ΓεΣΥ", formato: "moneda" },
    { clave: "tameia", etiqueta: "Ταμεία Αδειών, Πλεονασμού, Ανάπτυξης και Συνοχής", formato: "moneda" },
    { clave: "miktaEtous", etiqueta: "Μεικτοί μισθοί του έτους", formato: "moneda" },
    { clave: "ergodotiEtous", etiqueta: "Εισφορές εργοδότη του έτους", formato: "moneda" },
    { clave: "kostosEtous", etiqueta: "Συνολικό κόστος του έτους", formato: "moneda" },
    { clave: "epivarynsi", etiqueta: "Επιβάρυνση πάνω στον μισθό", formato: "porcentaje", decimales: 2 },
  ],
});

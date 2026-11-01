import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { AVISO_TAVANI, bazaKontributi } from "../lib/paga";

export default definirCalculadora({
  id: "al.kontributet-e-sigurimeve",
  mercado: "al",
  concepto: "aportes-seguridad-social",
  slug: "kontributet-e-sigurimeve",
  estado: "publicado",
  requiere: {
    "al.paga-minimale": "numero",
    "al.kontribute": "mapa",
    "al.kontribute-vetepunesuar": "mapa",
  },
  campos: [
    {
      id: "statusi",
      tipo: "opcion",
      etiqueta: "Si jeni i siguruar?",
      opciones: [
        { valor: "punonjes", etiqueta: "I punësuar" },
        { valor: "vetepunesuar", etiqueta: "I vetëpunësuar" },
      ],
      porDefecto: "punonjes",
    },
    { id: "paga", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000, ayuda: "I vetëpunësuari mund të zgjedhë një bazë nga paga minimale deri te paga maksimale." },
    { id: "tavani", tipo: "moneda", etiqueta: "Paga maksimale për kontributet (nuk është e detyrueshme)", min: 0, requerido: false, ayuda: "Vlen për paga të larta. Vendosni shifrën e fundit nga Administrata Tatimore. Nëse e lini bosh, kontributi shoqëror llogaritet mbi të gjithë pagën." },
  ],
  calcular(e, v, { redondear }) {
    if (e.paga <= 0) throw new ErrorEntrada("Vendosni një pagë më të madhe se zero.", "paga");
    const min = v["al.paga-minimale"];
    const baza = bazaKontributi(e.paga, min, e.tavani);
    const observaciones = e.tavani === null ? [AVISO_TAVANI] : [];
    if (e.statusi === "vetepunesuar") {
      const k = v["al.kontribute-vetepunesuar"];
      const shoqerore = redondear((baza * enMapa(k, "shoqerore")) / 100);
      const shendetesore = redondear((2 * min * enMapa(k, "shendetesore")) / 100);
      return { total: redondear(shoqerore + shendetesore), punonjes: redondear(shoqerore + shendetesore), punedhenes: 0, shoqerore, shendetesore, baza, observaciones };
    }
    const k = v["al.kontribute"];
    const bazaSh = Math.max(e.paga, min);
    const shP = redondear((baza * enMapa(k, "shoqerore-punonjes")) / 100);
    const shD = redondear((baza * enMapa(k, "shoqerore-punedhenes")) / 100);
    const heP = redondear((bazaSh * enMapa(k, "shendetesore-punonjes")) / 100);
    const heD = redondear((bazaSh * enMapa(k, "shendetesore-punedhenes")) / 100);
    return { total: redondear(shP + shD + heP + heD), punonjes: redondear(shP + heP), punedhenes: redondear(shD + heD), shoqerore: redondear(shP + shD), shendetesore: redondear(heP + heD), baza, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Kontributet gjithsej në muaj", formato: "moneda", destacada: true },
    { clave: "punonjes", etiqueta: "Pjesa që paguani ju", formato: "moneda" },
    { clave: "punedhenes", etiqueta: "Pjesa e punëdhënësit", formato: "moneda", ocultarSiCero: true },
    { clave: "shoqerore", etiqueta: "Sigurime shoqërore", formato: "moneda" },
    { clave: "shendetesore", etiqueta: "Sigurime shëndetësore", formato: "moneda" },
    { clave: "baza", etiqueta: "Baza e kontributit shoqëror", formato: "moneda" },
  ],
});

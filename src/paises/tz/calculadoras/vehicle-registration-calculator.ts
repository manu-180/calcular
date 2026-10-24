import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.vehicle-registration-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "vehicle-registration-calculator",
  estado: "publicado",
  requiere: {
    "tz.vehicle-licence-fee": "mapa",
    "tz.vehicle-hiv-levy": "mapa",
    "tz.vehicle-registration-tax": "numero",
    "tz.vehicle-transfer-fee": "numero",
  },
  campos: [{ id: "motor", tipo: "opcion-dato", etiqueta: "Engine capacity", dato: "tz.vehicle-licence-fee", porDefecto: "cc-1500" }],
  calcular(e, v, { redondear }) {
    const licencia = enMapa(v["tz.vehicle-licence-fee"], e.motor);
    const hiv = enMapa(v["tz.vehicle-hiv-levy"], e.motor);
    const registro = v["tz.vehicle-registration-tax"];
    return {
      total: redondear(licencia + hiv + registro),
      licencia,
      registro,
      hiv,
      observaciones: ["Import duty, excise duty and VAT on an imported vehicle are separate and are not included."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total for first registration", formato: "moneda", destacada: true },
    { clave: "licencia", etiqueta: "Licence fee", formato: "moneda" },
    { clave: "registro", etiqueta: "Registration tax", formato: "moneda" },
    { clave: "hiv", etiqueta: "HIV Response Levy", formato: "moneda" },
  ],
});

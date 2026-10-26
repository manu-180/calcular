import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.car-licence-fee-calculator",
  mercado: "jm",
  concepto: "propio",
  slug: "car-licence-fee-calculator",
  estado: "publicado",
  requiere: {
    "jm.car-licence-6m": "mapa",
    "jm.car-licence-12m": "mapa",
    "jm.car-licence-24m": "mapa",
    "jm.fitness-fee-car": "numero",
  },
  campos: [
    { id: "cc", tipo: "opcion-dato", etiqueta: "Engine size of the car", dato: "jm.car-licence-12m", porDefecto: "1200-2999" },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Licence period",
      opciones: [
        { valor: "12", etiqueta: "12 months" },
        { valor: "24", etiqueta: "24 months" },
        { valor: "6", etiqueta: "6 months" },
      ],
      porDefecto: "12",
    },
    { id: "fitness", tipo: "si-no", etiqueta: "Add the certificate of fitness", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    const mapa = e.periodo === "6" ? v["jm.car-licence-6m"] : e.periodo === "24" ? v["jm.car-licence-24m"] : v["jm.car-licence-12m"];
    const licencia = enMapa(mapa, e.cc);
    const fitness = e.fitness ? v["jm.fitness-fee-car"] : 0;
    const meses = Number(e.periodo);
    return {
      total: redondear(licencia + fitness),
      licencia,
      fitness,
      porMes: redondear(licencia / meses),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total to pay at the tax office", formato: "moneda", destacada: true },
    { clave: "licencia", etiqueta: "Motor vehicle licence fee", formato: "moneda" },
    { clave: "fitness", etiqueta: "Certificate of fitness", formato: "moneda", ocultarSiCero: true },
    { clave: "porMes", etiqueta: "Licence cost per month", formato: "moneda" },
  ],
});

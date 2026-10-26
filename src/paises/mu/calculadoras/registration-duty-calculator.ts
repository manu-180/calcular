import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.registration-duty-calculator",
  mercado: "mu",
  concepto: "propio",
  slug: "registration-duty-calculator",
  estado: "publicado",
  requiere: {
    "mu.registration-duty": "numero",
    "mu.land-transfer-tax": "numero",
    "mu.first-home-relief-house": "numero",
    "mu.first-home-relief-land": "numero",
    "mu.first-home-income-cap": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Price or value of the property", min: 0, porDefecto: 6000000, ayuda: "Without VAT." },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "What you are buying",
      opciones: [
        { valor: "home", etiqueta: "A house, or an apartment in a building under co-ownership" },
        { valor: "land", etiqueta: "Bare land to build your home" },
        { valor: "other", etiqueta: "Other property" },
      ],
      porDefecto: "home",
    },
    { id: "reduccion", tipo: "si-no", etiqueta: "I qualify for the first home reduction", porDefecto: false, visibleSi: { tipo: ["home", "land"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const derecho = redondear(porcentaje(e.precio, v["mu.registration-duty"]));
    const tope = e.tipo === "home" ? v["mu.first-home-relief-house"] : e.tipo === "land" ? v["mu.first-home-relief-land"] : 0;
    const reduccion = e.reduccion === true && tope > 0 ? Math.min(derecho, tope) : 0;
    const comprador = redondear(derecho - reduccion);
    const vendedor = redondear(porcentaje(e.precio, v["mu.land-transfer-tax"]));
    const observaciones: string[] = [];
    if (reduccion > 0) {
      observaciones.push(
        `The reduction is for citizens of Mauritius with a total income of no more than Rs ${v["mu.first-home-income-cap"].toLocaleString("en-MU")} in the income year, who have not had it before. Other conditions in section 27 of the Registration Duty Act apply.`,
      );
    }
    if (e.tipo === "land" && reduccion > 0) observaciones.push("On bare land, construction has to start within a year and end within 3 years of the transfer.");
    return {
      comprador,
      derecho,
      reduccion,
      vendedor,
      total: redondear(comprador + vendedor),
      observaciones,
    };
  },
  resultado: [
    { clave: "comprador", etiqueta: "Registration duty you pay as buyer", formato: "moneda", destacada: true },
    { clave: "derecho", etiqueta: "Registration duty before any reduction", formato: "moneda" },
    { clave: "reduccion", etiqueta: "First home reduction", formato: "moneda", ocultarSiCero: true },
    { clave: "vendedor", etiqueta: "Land transfer tax paid by the seller", formato: "moneda" },
    { clave: "total", etiqueta: "Duty and tax on the sale", formato: "moneda" },
  ],
});

import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const KODAI = { usd: "USD", gbp: "GBP", chf: "CHF", pln: "PLN" } as const;

export default definirCalculadora({
  id: "lt.valiutu-skaiciuokle",
  mercado: "lt",
  concepto: "tipo-de-cambio",
  slug: "valiutu-skaiciuokle",
  estado: "publicado",
  requiere: { "lt.usd": "serie", "lt.gbp": "serie", "lt.chf": "serie", "lt.pln": "serie" },
  campos: [
    {
      id: "valiuta",
      tipo: "opcion",
      etiqueta: "Valiuta",
      opciones: [
        { valor: "usd", etiqueta: "JAV doleris (USD)" },
        { valor: "gbp", etiqueta: "Didžiosios Britanijos svaras (GBP)" },
        { valor: "chf", etiqueta: "Šveicarijos frankas (CHF)" },
        { valor: "pln", etiqueta: "Lenkijos zlotas (PLN)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "kryptis",
      tipo: "opcion",
      etiqueta: "Kryptis",
      opciones: [
        { valor: "is-euro", etiqueta: "Iš eurų į užsienio valiutą" },
        { valor: "i-eura", etiqueta: "Iš užsienio valiutos į eurus" },
      ],
      porDefecto: "is-euro",
    },
    { id: "suma", tipo: "numero", etiqueta: "Suma", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Įveskite sumą, didesnę už nulį.", "suma");
    const { valor, fecha } = v[`lt.${e.valiuta}`];
    const isEuro = e.kryptis === "is-euro";
    return {
      rezultatas: redondear(isEuro ? e.suma * valor : e.suma / valor),
      valiutaRezultato: isEuro ? KODAI[e.valiuta] : "EUR",
      santykis: valor,
      atvirkstinis: 1 / valor,
      data: fecha,
      observaciones: ["Tai oficialus euro ir užsienio valiutos santykis. Bankai ir valiutos keityklos taiko savo kursus."],
    };
  },
  resultado: [
    { clave: "rezultatas", etiqueta: "Rezultatas", formato: "numero", decimales: 2, destacada: true },
    { clave: "valiutaRezultato", etiqueta: "Rezultato valiuta", formato: "texto" },
    { clave: "santykis", etiqueta: "Užsienio valiutos kiekis už 1 eurą", formato: "numero", decimales: 4 },
    { clave: "atvirkstinis", etiqueta: "Eurų kiekis už 1 užsienio valiutos vienetą", formato: "numero", decimales: 4 },
    { clave: "data", etiqueta: "Santykio data", formato: "fecha" },
  ],
});

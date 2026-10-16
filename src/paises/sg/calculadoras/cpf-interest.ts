import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sg.cpf-interest",
  mercado: "sg",
  concepto: "propio",
  slug: "cpf-interest",
  estado: "publicado",
  requiere: {
    "sg.cpf-interes-oa": "numero",
    "sg.cpf-interes-sma": "numero",
    "sg.cpf-interes-extra": "numero",
    "sg.cpf-extra-55": "mapa",
    "sg.cpf-extra-topes": "mapa",
  },
  campos: [
    { id: "oa", tipo: "moneda", etiqueta: "Ordinary Account (OA) balance", min: 0, porDefecto: 40000 },
    { id: "sa", tipo: "moneda", etiqueta: "Special Account or Retirement Account balance", min: 0, porDefecto: 20000 },
    { id: "ma", tipo: "moneda", etiqueta: "MediSave Account balance", min: 0, porDefecto: 15000 },
    { id: "mayor55", tipo: "si-no", etiqueta: "You are 55 or older", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.oa < 0 || entrada.sa < 0 || entrada.ma < 0) throw new ErrorEntrada("Balances cannot be negative.", "oa");
    const topes = v["sg.cpf-extra-topes"];
    const base = Math.min(enMapa(topes, "total"), Math.min(entrada.oa, enMapa(topes, "oa")) + entrada.sa + entrada.ma);
    const interesOa = redondear((entrada.oa * v["sg.cpf-interes-oa"]) / 100);
    const interesSma = redondear(((entrada.sa + entrada.ma) * v["sg.cpf-interes-sma"]) / 100);
    let extra: number;
    if (entrada.mayor55) {
      const tramo = enMapa(topes, "tramo-55");
      const tasas = v["sg.cpf-extra-55"];
      extra = (Math.min(base, tramo) * enMapa(tasas, "primeros")) / 100 + (Math.max(0, base - tramo) * enMapa(tasas, "siguientes")) / 100;
    } else {
      extra = (base * v["sg.cpf-interes-extra"]) / 100;
    }
    extra = redondear(extra);
    const total = redondear(interesOa + interesSma + extra);
    const saldo = entrada.oa + entrada.sa + entrada.ma;
    return {
      total,
      interesOa,
      interesSma,
      extra,
      base,
      efectiva: saldo > 0 ? (total / saldo) * 100 : 0,
      observaciones: [
        "This assumes your balances and today's rates stay the same for a whole year. Rates are reviewed every quarter.",
        "Extra interest earned on your Ordinary Account goes into your Special or Retirement Account.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Interest over a year", formato: "moneda", destacada: true },
    { clave: "interesOa", etiqueta: "Ordinary Account interest", formato: "moneda" },
    { clave: "interesSma", etiqueta: "Special, Retirement and MediSave interest", formato: "moneda" },
    { clave: "extra", etiqueta: "Extra interest from the Government", formato: "moneda" },
    { clave: "base", etiqueta: "Balances that earn extra interest", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Average rate on your balances", formato: "porcentaje", decimales: 2 },
  ],
});

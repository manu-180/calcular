import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "md.calculator-tva",
  mercado: "md",
  concepto: "iva",
  slug: "calculator-tva",
  estado: "publicado",
  requiere: { "md.tva": "mapa" },
  campos: [
    {
      id: "operatie",
      tipo: "opcion",
      etiqueta: "Ce calculați",
      opciones: [
        { valor: "adauga", etiqueta: "Adăugați TVA la un preț fără TVA" },
        { valor: "extrage", etiqueta: "Extrageți TVA dintr-un preț cu TVA" },
      ],
      porDefecto: "adauga",
    },
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 1000 },
    { id: "cota", tipo: "opcion-dato", etiqueta: "Cota TVA", dato: "md.tva", porDefecto: "standard" },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți o sumă mai mare decât zero.", "suma");
    const cota = enMapa(v["md.tva"], e.cota);
    const faraTva = e.operatie === "adauga" ? redondear(e.suma) : redondear(e.suma / (1 + cota / 100));
    const cuTva = e.operatie === "adauga" ? redondear(e.suma * (1 + cota / 100)) : redondear(e.suma);
    return { tva: redondear(cuTva - faraTva), faraTva, cuTva, cota };
  },
  resultado: [
    { clave: "tva", etiqueta: "TVA", formato: "moneda", destacada: true },
    { clave: "faraTva", etiqueta: "Preț fără TVA", formato: "moneda" },
    { clave: "cuTva", etiqueta: "Preț cu TVA", formato: "moneda" },
    { clave: "cota", etiqueta: "Cota aplicată", formato: "porcentaje", decimales: 0 },
  ],
});

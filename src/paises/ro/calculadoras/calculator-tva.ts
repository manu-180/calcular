import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ro.calculator-tva",
  mercado: "ro",
  concepto: "iva",
  slug: "calculator-tva",
  estado: "publicado",
  requiere: { "ro.tva": "mapa" },
  campos: [
    {
      id: "operatie",
      tipo: "opcion",
      etiqueta: "Ce doriți să calculați?",
      opciones: [
        { valor: "adauga", etiqueta: "Adăugați TVA la un preț fără TVA" },
        { valor: "scoate", etiqueta: "Scoateți TVA dintr-un preț cu TVA" },
      ],
      porDefecto: "adauga",
    },
    { id: "suma", tipo: "moneda", etiqueta: "Preț", min: 0, porDefecto: 1000 },
    { id: "cota", tipo: "opcion-dato", dato: "ro.tva", etiqueta: "Cota de TVA", porDefecto: "standard" },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți un preț mai mare decât zero.", "suma");
    const cota = enMapa(v["ro.tva"], e.cota);
    const adauga = e.operatie === "adauga";
    const faraTva = adauga ? e.suma : redondear(e.suma / (1 + cota / 100));
    const tva = adauga ? redondear((e.suma * cota) / 100) : redondear(e.suma - faraTva);
    const cuTva = adauga ? redondear(e.suma + tva) : e.suma;
    return { faraTva, tva, cuTva, cota };
  },
  resultado: [
    { clave: "cuTva", etiqueta: "Preț cu TVA", formato: "moneda", destacada: true },
    { clave: "tva", etiqueta: "TVA", formato: "moneda" },
    { clave: "faraTva", etiqueta: "Preț fără TVA", formato: "moneda" },
    { clave: "cota", etiqueta: "Cota aplicată", formato: "porcentaje", decimales: 0 },
  ],
});

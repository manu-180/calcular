import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.ddv-kalkulator",
  mercado: "si",
  concepto: "iva",
  slug: "ddv-kalkulator",
  estado: "publicado",
  requiere: { "si.ddv": "mapa" },
  campos: [
    { id: "znesek", tipo: "moneda", etiqueta: "Znesek", min: 0, porDefecto: 100 },
    { id: "stopnja", tipo: "opcion-dato", etiqueta: "Stopnja DDV", dato: "si.ddv", porDefecto: "splosna" },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Kaj želite izračunati",
      opciones: [
        { valor: "pristej", etiqueta: "Znesek je brez DDV: prištej DDV" },
        { valor: "izloci", etiqueta: "Znesek je z DDV: izloči DDV" },
      ],
      porDefecto: "pristej",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.znesek <= 0) throw new ErrorEntrada("Vnesite znesek, večji od nič.", "znesek");
    const s = enMapa(v["si.ddv"], e.stopnja);
    const brez = e.smer === "pristej" ? e.znesek : redondear(e.znesek / (1 + s / 100));
    const ddv = e.smer === "pristej" ? redondear(porcentaje(e.znesek, s)) : redondear(e.znesek - brez);
    return { z: redondear(brez + ddv), brez, ddv };
  },
  resultado: [
    { clave: "z", etiqueta: "Znesek z DDV", formato: "moneda", destacada: true },
    { clave: "brez", etiqueta: "Znesek brez DDV", formato: "moneda" },
    { clave: "ddv", etiqueta: "DDV", formato: "moneda" },
  ],
});

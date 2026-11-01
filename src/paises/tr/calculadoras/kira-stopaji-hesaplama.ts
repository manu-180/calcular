import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.kira-stopaji-hesaplama",
  mercado: "tr",
  concepto: "propio",
  slug: "kira-stopaji-hesaplama",
  estado: "publicado",
  requiere: { "tr.gvk94": "mapa" },
  campos: [
    { id: "tutar", tipo: "moneda", etiqueta: "Aylık kira", min: 0, porDefecto: 40000 },
    {
      id: "yon",
      tipo: "opcion",
      etiqueta: "Girdiğiniz kira",
      opciones: [
        { valor: "net", etiqueta: "Net kira (ev sahibinin eline geçen)" },
        { valor: "brut", etiqueta: "Brüt kira (stopaj dahil)" },
      ],
      porDefecto: "net",
    },
    { id: "ay", tipo: "entero", etiqueta: "Kaç ay için", min: 1, max: 120, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.tutar <= 0) throw new ErrorEntrada("Kira tutarını girin.", "tutar");
    const oran = enMapa(valores["tr.gvk94"], "kira");
    const brut = entrada.yon === "brut" ? entrada.tutar : redondear(entrada.tutar / (1 - oran / 100));
    const stopaj = redondear(porcentaje(brut, oran));
    const net = redondear(brut - stopaj);
    return {
      stopaj,
      brut,
      net,
      oran,
      donemStopaj: redondear(stopaj * entrada.ay),
      donemBrut: redondear(brut * entrada.ay),
    };
  },
  resultado: [
    { clave: "stopaj", etiqueta: "Aylık kira stopajı", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Brüt kira", formato: "moneda" },
    { clave: "net", etiqueta: "Ev sahibine ödenecek net kira", formato: "moneda" },
    { clave: "oran", etiqueta: "Stopaj oranı", formato: "porcentaje" },
    { clave: "donemStopaj", etiqueta: "Dönem boyunca toplam stopaj", formato: "moneda" },
    { clave: "donemBrut", etiqueta: "Dönem boyunca toplam brüt kira", formato: "moneda" },
  ],
});

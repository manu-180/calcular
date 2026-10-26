import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.kdv-hesaplama",
  mercado: "tr",
  concepto: "iva",
  slug: "kdv-hesaplama",
  estado: "publicado",
  requiere: { "tr.kdv": "mapa" },
  campos: [
    { id: "tutar", tipo: "moneda", etiqueta: "Tutar", min: 0, porDefecto: 1000 },
    {
      id: "yon",
      tipo: "opcion",
      etiqueta: "Ne yapmak istiyorsunuz?",
      opciones: [
        { valor: "ekle", etiqueta: "KDV hariç tutara KDV ekle" },
        { valor: "ayir", etiqueta: "KDV dahil tutardan KDV'yi ayır" },
      ],
      porDefecto: "ekle",
    },
    { id: "oran", tipo: "opcion-dato", dato: "tr.kdv", etiqueta: "KDV oranı", porDefecto: "genel" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.tutar <= 0) throw new ErrorEntrada("Tutarı girin.", "tutar");
    const oran = enMapa(valores["tr.kdv"], entrada.oran);
    const haric = entrada.yon === "ekle" ? entrada.tutar : redondear(entrada.tutar / (1 + oran / 100));
    const kdv = entrada.yon === "ekle" ? redondear(porcentaje(haric, oran)) : redondear(entrada.tutar - haric);
    return { kdv, haric, dahil: redondear(haric + kdv), oran };
  },
  resultado: [
    { clave: "kdv", etiqueta: "KDV tutarı", formato: "moneda", destacada: true },
    { clave: "haric", etiqueta: "KDV hariç tutar (matrah)", formato: "moneda" },
    { clave: "dahil", etiqueta: "KDV dahil tutar", formato: "moneda" },
    { clave: "oran", etiqueta: "Uygulanan oran", formato: "porcentaje" },
  ],
});

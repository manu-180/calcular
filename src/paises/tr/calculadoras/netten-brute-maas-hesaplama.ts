import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { asgariMatrah, bruttenAra, OPCIONES_AY, REQ_BORDRO } from "../lib/bordro";

export default definirCalculadora({
  id: "tr.netten-brute-maas-hesaplama",
  mercado: "tr",
  concepto: "propio",
  slug: "netten-brute-maas-hesaplama",
  estado: "publicado",
  requiere: REQ_BORDRO,
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Aylık net maaş", min: 0, porDefecto: 40000 },
    {
      id: "ay",
      tipo: "opcion",
      etiqueta: "Hesaplanacak ay",
      opciones: OPCIONES_AY,
      porDefecto: "1",
      ayuda: "Aynı net maaş için gereken brüt tutar, gelir vergisi dilimi yükseldikçe artar. Yılbaşından beri aynı brüt maaşın ödendiği varsayılır.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.net <= 0) throw new ErrorEntrada("Net maaşı girin.", "net");
    const asgariNet = asgariMatrah(valores, redondear);
    const s = bruttenAra(entrada.net, Number(entrada.ay), valores, redondear);
    const observaciones: string[] = [];
    if (entrada.net < asgariNet) observaciones.push("Girdiğiniz net tutar net asgari ücretin altında. Tam süreli çalışmada maaş bundan az olamaz.");
    return {
      brut: s.brut,
      sgkIsci: s.sgkIsci,
      issizlikIsci: s.issizlikIsci,
      gelirVergisi: s.gelirVergisi,
      gvIstisna: s.gvIstisna,
      damgaVergisi: s.damgaVergisi,
      net: s.net,
      toplamKesinti: redondear(s.brut - s.net),
      dilim: s.dilim,
      observaciones,
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Gereken brüt maaş", formato: "moneda", destacada: true },
    { clave: "sgkIsci", etiqueta: "SGK işçi primi", formato: "moneda" },
    { clave: "issizlikIsci", etiqueta: "İşsizlik sigortası işçi primi", formato: "moneda" },
    { clave: "gvIstisna", etiqueta: "Asgari ücret gelir vergisi istisnası", formato: "moneda" },
    { clave: "gelirVergisi", etiqueta: "Kesilecek gelir vergisi", formato: "moneda" },
    { clave: "damgaVergisi", etiqueta: "Damga vergisi", formato: "moneda" },
    { clave: "toplamKesinti", etiqueta: "Toplam kesinti", formato: "moneda" },
    { clave: "net", etiqueta: "Bu brütle ödenecek net", formato: "moneda" },
    { clave: "dilim", etiqueta: "Vergi dilimi", formato: "porcentaje" },
  ],
});

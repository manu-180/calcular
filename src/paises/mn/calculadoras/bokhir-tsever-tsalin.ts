import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQUIERE_NOMINA, tsever } from "../lib/nomina";

export default definirCalculadora({
  id: "mn.bokhir-tsever-tsalin",
  mercado: "mn",
  concepto: "propio",
  slug: "bokhir-tsever-tsalin",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Гарт авах цэвэр цалин", min: 0, porDefecto: 1607000, ayuda: "Гэрээнд хэдэн төгрөг гэж бичих шаардлагатайг мэдэхийн тулд хүссэн цэвэр дүнгээ оруулна уу." }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Хүссэн цэвэр цалингаа оруулна уу.", "neto");
    let bajo = e.neto;
    let alto = e.neto * 2 + 1000000;
    for (let i = 0; i < 70; i++) {
      const medio = (bajo + alto) / 2;
      if (tsever(medio, v).tsever < e.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const r = tsever(bruto, v);
    return {
      bruto,
      ndsh: redondear(r.ndsh),
      emd: redondear(r.emd),
      khkhoat: redondear(r.khkhoat),
      zuruu: redondear(bruto - e.neto),
      observaciones: ["Хөнгөлөлт шатлалаар буурдаг тул босгын ойролцоо хэдэн төгрөгийн зөрүү гарч болно."],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Шаардлагатай бохир цалин", formato: "moneda", destacada: true },
    { clave: "ndsh", etiqueta: "Нийгмийн даатгалын шимтгэл", formato: "moneda" },
    { clave: "emd", etiqueta: "Эрүүл мэндийн даатгалын шимтгэл", formato: "moneda" },
    { clave: "khkhoat", etiqueta: "ХХОАТ, хөнгөлөлтийн дараа", formato: "moneda" },
    { clave: "zuruu", etiqueta: "Бохир, цэвэр хоорондын зөрүү", formato: "moneda" },
  ],
});

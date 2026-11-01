import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.iluu-tsagiin-khols",
  mercado: "mn",
  concepto: "horas-extra",
  slug: "iluu-tsagiin-khols",
  estado: "publicado",
  requiere: {
    "mn.iluu-tsag-koef": "numero",
    "mn.amralt-odor-koef": "numero",
    "mn.bayar-koef": "numero",
    "mn.shono-koef": "numero",
    "mn.doloo-khonog-tsag": "numero",
  },
  campos: [
    { id: "dundaj", tipo: "moneda", etiqueta: "Сарын дундаж цалин", min: 0, porDefecto: 1680000 },
    { id: "normTsag", tipo: "numero", etiqueta: "Сарын ердийн ажлын цаг", min: 1, porDefecto: 168 },
    { id: "torol", tipo: "opcion", etiqueta: "Ажилласан цагийн төрөл", opciones: [{ valor: "iluu", etiqueta: "Илүү цаг" }, { valor: "amralt", etiqueta: "Долоо хоногийн амралтын өдөр" }, { valor: "bayar", etiqueta: "Нийтээр амрах баярын өдөр" }], porDefecto: "iluu" },
    { id: "tsag", tipo: "numero", etiqueta: "Ажилласан цаг", min: 0, porDefecto: 10 },
    { id: "shonoTsag", tipo: "numero", etiqueta: "Үүнээс шөнийн цаг", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dundaj <= 0) throw new ErrorEntrada("Сарын дундаж цалингаа оруулна уу.", "dundaj");
    if (e.shonoTsag > e.tsag) throw new ErrorEntrada("Шөнийн цаг нийт цагаас их байж болохгүй.", "shonoTsag");
    const koef = e.torol === "bayar" ? v["mn.bayar-koef"] : e.torol === "amralt" ? v["mn.amralt-odor-koef"] : v["mn.iluu-tsag-koef"];
    const tsagiin = e.dundaj / e.normTsag;
    const undsen = tsagiin * koef * e.tsag;
    const shono = tsagiin * (v["mn.shono-koef"] - 1) * e.shonoTsag;
    return {
      niit: redondear(undsen + shono),
      tsagiin: redondear(tsagiin),
      koef,
      undsen: redondear(undsen),
      shono: redondear(shono),
      observaciones: ["Нөхөн амруулсан бол нэмэгдэл хөлс олгохгүй байж болно. Коэффициентыг хамтын гэрээгээр өндөр тогтоож болно."],
    };
  },
  resultado: [
    { clave: "niit", etiqueta: "Нийт нэмэгдэл хөлс", formato: "moneda", destacada: true },
    { clave: "tsagiin", etiqueta: "Нэг цагийн дундаж цалин", formato: "moneda" },
    { clave: "koef", etiqueta: "Хэрэглэсэн коэффициент", formato: "numero", decimales: 1 },
    { clave: "undsen", etiqueta: "Ажилласан цагийн хөлс", formato: "moneda" },
    { clave: "shono", etiqueta: "Шөнийн цагийн нэмэгдэл", formato: "moneda", ocultarSiCero: true },
  ],
});

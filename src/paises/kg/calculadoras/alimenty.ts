import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.alimenty",
  mercado: "kg",
  concepto: "pension-alimentos",
  slug: "alimenty",
  estado: "publicado",
  requiere: { "kg.alimenty-dolya": "mapa", "kg.alimenty-minimum-mzp": "mapa", "kg.mzp": "numero" },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Заработок и иной доход родителя за месяц", min: 0, porDefecto: 40000 },
    { id: "deti", tipo: "opcion-dato", dato: "kg.alimenty-dolya", etiqueta: "Сколько несовершеннолетних детей", porDefecto: "odin" },
    { id: "trudosposoben", tipo: "si-no", etiqueta: "Родитель трудоспособен", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod < 0) throw new ErrorEntrada("Доход не может быть отрицательным.", "dokhod");
    const poDole = redondear(e.dokhod / enMapa(v["kg.alimenty-dolya"], e.deti));
    const minimum = e.trudosposoben ? redondear(enMapa(v["kg.alimenty-minimum-mzp"], e.deti) * v["kg.mzp"]) : 0;
    const alimenty = Math.max(poDole, minimum);
    const observaciones = minimum > poDole ? ["Доля от дохода меньше минимального размера для трудоспособного родителя, поэтому показан минимум."] : [];
    return { alimenty, poDole, minimum, observaciones };
  },
  resultado: [
    { clave: "alimenty", etiqueta: "Алименты в месяц", formato: "moneda", destacada: true },
    { clave: "poDole", etiqueta: "Доля от дохода", formato: "moneda" },
    { clave: "minimum", etiqueta: "Минимальный размер", formato: "moneda", ocultarSiCero: true },
  ],
});

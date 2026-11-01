import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.obezshtenie-pri-uvolnenie",
  mercado: "bg",
  concepto: "indemnizacion-despido",
  slug: "obezshtenie-pri-uvolnenie",
  estado: "publicado",
  requiere: { "bg.obezshtenie-uvolnenie": "mapa" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Брутно трудово възнаграждение на месец", min: 0, porDefecto: 1500 },
    { id: "osnovanie", tipo: "opcion-dato", etiqueta: "Основание", dato: "bg.obezshtenie-uvolnenie", porDefecto: "sakrashtavane" },
    {
      id: "bezRabota",
      tipo: "numero",
      etiqueta: "Месеци без работа",
      min: 0,
      max: 6,
      porDefecto: 1,
      visibleSi: { osnovanie: ["sakrashtavane", "nezakonno"] },
      ayuda: "При тези основания обезщетението е за времето без работа, до законовия максимум.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете възнаграждение над нула.", "bruto");
    const maks = enMapa(v["bg.obezshtenie-uvolnenie"], e.osnovanie);
    const mesetsi = e.bezRabota === null ? maks : Math.min(e.bezRabota, maks);
    return { obezshtenie: redondear(e.bruto * mesetsi), mesetsi, maks };
  },
  resultado: [
    { clave: "obezshtenie", etiqueta: "Обезщетение (бруто)", formato: "moneda", destacada: true },
    { clave: "mesetsi", etiqueta: "Месеци за изплащане", formato: "meses", decimales: 1 },
    { clave: "maks", etiqueta: "Максимум по закон", formato: "meses" },
  ],
});

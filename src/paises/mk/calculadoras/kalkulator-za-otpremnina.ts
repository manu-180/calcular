import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.kalkulator-za-otpremnina",
  mercado: "mk",
  concepto: "indemnizacion-despido",
  slug: "kalkulator-za-otpremnina",
  estado: "publicado",
  requiere: { "mk.ispratnina": "mapa", "mk.ispratnina-minimum": "numero", "mk.neto-plata": "serie" },
  campos: [
    { id: "plata", tipo: "moneda", etiqueta: "Просечна нето-плата во последните шест месеци", min: 0, porDefecto: 40000 },
    { id: "godini", tipo: "numero", etiqueta: "Години работен однос кај работодавачот", min: 0, porDefecto: 8 },
    { id: "sezonski", tipo: "si-no", etiqueta: "Сезонска работа до три месеци", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.plata <= 0) throw new ErrorEntrada("Внесете плата поголема од нула.", "plata");
    const m = v["mk.ispratnina"];
    const klucen = e.godini < 5 ? "do5" : e.godini < 10 ? "do10" : e.godini < 15 ? "do15" : e.godini < 20 ? "do20" : e.godini <= 25 ? "do25" : "nad25";
    const plati = enMapa(m, klucen);
    const minimum = porcentaje(v["mk.neto-plata"].valor, v["mk.ispratnina-minimum"]);
    const osnovica = Math.max(e.plata, minimum);
    const observaciones = e.sezonski ? ["За сезонска работа до три месеци испратнина не се исплатува."] : [];
    return {
      iznos: e.sezonski ? 0 : redondear(osnovica * plati),
      plati,
      osnovica: redondear(osnovica),
      minimum: redondear(minimum),
      observaciones,
    };
  },
  resultado: [
    { clave: "iznos", etiqueta: "Испратнина", formato: "moneda", destacada: true },
    { clave: "plati", etiqueta: "Број на нето-плати", formato: "numero", decimales: 1 },
    { clave: "osnovica", etiqueta: "Основица", formato: "moneda" },
    { clave: "minimum", etiqueta: "Најниска основица", formato: "moneda" },
  ],
});

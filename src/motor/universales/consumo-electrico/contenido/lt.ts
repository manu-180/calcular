import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Elektros sąnaudų skaičiuoklė",
    title: tituloQueEntre(
      `Elektros sąnaudų skaičiuoklė (${ctx.nombrePais})`,
      "Elektros prietaisų sąnaudų skaičiuoklė",
      "Elektros sąnaudos",
    ),
    description: "Apskaičiuokite, kiek elektros sunaudoja prietaisas ir kiek tai kainuoja per dieną, mėnesį ir metus, pagal galią, veikimo laiką ir kWh kainą.",
    intro: [
      "Įveskite prietaiso galią, kiek valandų per dieną jį naudojate, ir 1 kWh kainą iš sąskaitos. Pamatysite sąnaudas ir kiek tai kainuoja.",
      "Taip lengvai sužinosite, kuris prietaisas labiausiai didina elektros sąskaitą: oro kondicionierius, elektrinis šildytuvas, šaldytuvas ar kompiuteris.",
    ],
    comoSeCalcula: [
      "kWh per dieną = vatai × veikimo valandos ÷ 1000.",
      "kWh per mėnesį = kWh per dieną × veikimo dienos. Metinės sąnaudos yra mėnesio sąnaudos, padaugintos iš 12.",
      "Išlaidos = kWh × 1 kWh kaina.",
    ],
    ejemplo: [
      `Prietaiso galia 1000 W, veikimo trukmė 4 valandos per dieną. Per dieną jis sunaudoja 4 kWh, per mėnesį ${formatearNumero(ctx, kwhMes)} kWh.`,
      `Kai 1 kWh kaina yra ${m(precio)}, mėnesio išlaidos siekia ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Kas yra kWh?",
        respuesta: "Kilovatvalandė: energija, kurią 1000 W galios prietaisas sunaudoja per vieną veikimo valandą. Šiuo vienetu elektra skaičiuojama sąskaitose.",
      },
      {
        pregunta: "Ar šaldytuvas visą dieną veikia visa galia?",
        respuesta: "Ne. Kompresorius įsijungia ir išsijungia. Tokiems prietaisams vietoj 24 valandų įveskite nuo 8 iki 10 valandų per dieną.",
      },
      {
        pregunta: "Kodėl rezultatas nesutampa su sąskaita?",
        respuesta: "Sąskaitoje dar yra pastovūs mokėjimai, persiuntimo mokesčiai ir kiti mokesčiai, kartais ir tarifai pagal suvartojimą. Šis skaičiavimas rodo tik paties prietaiso sąnaudas.",
      },
    ],
    glosario: [
      { termino: "Vatas (W)", definicion: "Galios vienetas: kiek energijos prietaisas naudoja kas sekundę." },
      { termino: "Kilovatvalandė (kWh)", definicion: "1000 W per vieną valandą. Būtent už šį vienetą mokate pagal sąskaitą." },
    ],
  };
};

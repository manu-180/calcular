import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Reguladetri",
    title: tituloQueEntre(
      `Reguladetri: räkna ut proportioner direkt | ${ctx.nombrePais}`,
      `Reguladetri | ${ctx.nombrePais}`,
      "Reguladetri",
    ),
    description: "Lös en direkt eller omvänd proportion på några sekunder. Fyll i tre värden och få det fjärde, med uträkningen visad.",
    intro: [
      "Reguladetri fungerar när två storheter hänger ihop och du känner till tre av de fyra värdena.",
      "Välj direkt eller omvänd proportion, fyll i A, B och C så räknar kalkylatorn ut X.",
    ],
    comoSeCalcula: [
      "Direkt: X = B × C ÷ A. Används när båda storheterna växer tillsammans (fler kilo, högre pris).",
      "Omvänd: X = A × B ÷ C. Används när den ena växer och den andra minskar (fler personer, färre dagar).",
    ],
    ejemplo: [
      `Om 3 kilo kostar ${m(precio3)} kostar 5 kilo ${m((precio3 * 5) / 3)}.`,
      `Om 4 personer målar ett hus på 12 dagar klarar 6 personer det på ${c((4 * 12) / 6)} dagar.`,
    ],
    faq: [
      {
        pregunta: "Hur vet jag om proportionen är direkt eller omvänd?",
        respuesta: "Om den ena storheten ökar när den andra ökar är den direkt. Om den ena minskar när den andra ökar är den omvänd.",
      },
      {
        pregunta: "Hur räknar jag reguladetri för hand?",
        respuesta: `Multiplicera de två kända värdena på diagonalen och dela med det som är kvar. Om 3 motsvarar 600 motsvarar 5 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Kan jag använda reguladetri för procent?",
        respuesta: `Ja. Om 200 är 100 % är 50 lika med ${c((100 * 50) / 200)} %. Det är en direkt proportion med A = 200, B = 100 och C = 50.`,
      },
    ],
    glosario: [
      { termino: "Direkt proportion", definicion: "Båda storheterna ökar eller minskar tillsammans." },
      { termino: "Omvänd proportion", definicion: "Den ena storheten ökar när den andra minskar." },
    ],
  };
};

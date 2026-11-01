import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Një person me peshë 160 lb dhe gjatësi 5 ft 9 in ka BMI ${n((160 * KG_POR_LB) / (m * m))}: peshë normale.`,
        `Për këtë gjatësi, pesha e shëndetshme është nga ${n((18.5 * m * m) / KG_POR_LB)} deri në ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Një person me peshë 70 kg dhe gjatësi ${n(1.75, 2)} m ka BMI ${n(70 / (1.75 * 1.75))}: peshë normale.`,
        `Për këtë gjatësi, pesha e shëndetshme është nga ${n(18.5 * 1.75 * 1.75)} deri në ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Kalkulator BMI (indeksi i masës trupore)",
    title: tituloQueEntre(`Kalkulator BMI (indeksi i masës trupore): ${ctx.nombrePais}`, "Kalkulator BMI: indeksi i masës trupore", "Kalkulator BMI"),
    description: "Llogaritni indeksin e masës trupore sipas peshës dhe gjatësisë, shikoni kategorinë e OBSH-së dhe intervalin e peshës së shëndetshme për gjatësinë tuaj.",
    intro: [
      "Vendosni peshën dhe gjatësinë. Shikoni BMI, kategorinë sipas Organizatës Botërore të Shëndetësisë dhe intervalin e peshës së shëndetshme për gjatësinë tuaj.",
      "Është një orientim i përgjithshëm për të rriturit, me qëllim informues. Nuk zëvendëson konsultën te mjeku.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = pesha në paund × 703 ÷ (gjatësia në inç × gjatësia në inç)." : "BMI = pesha në kilogramë ÷ (gjatësia në metra × gjatësia në metra).",
      `Nën ${n(18.5)} do të thotë nënpeshë. Nga ${n(18.5)} deri në ${n(24.9)}, peshë normale. Nga 25 deri në ${n(29.9)}, mbipeshë. Nga 30 e lart, obezitet.`,
      `Intervali i peshës së shëndetshme është ai që jep një BMI nga ${n(18.5)} deri në ${n(24.9)} për gjatësinë tuaj.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Cili është BMI normal?",
        respuesta: `Sipas OBSH-së, një BMI nga ${n(18.5)} deri në ${n(24.9)} te të rriturit. Intervali është i njëjtë për gratë dhe për burrat.`,
      },
      {
        pregunta: "A vlen BMI për të gjithë?",
        respuesta: "Jo. Nuk i dallon muskujt nga dhjami, prandaj personat shumë muskulozë mund të kenë BMI të lartë. Përdoret ndryshe edhe gjatë shtatzënisë, te fëmijët dhe te adoleshentët. Për një vlerësim, flisni me mjekun.",
      },
      {
        pregunta: "Si llogaritet BMI?",
        respuesta: "Pjesëtoni peshën në kilogramë me katrorin e gjatësisë në metra. Për 1,75 m, katrori i gjatësisë është 1,75 × 1,75.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Indeksi i masës trupore: raporti midis peshës dhe gjatësisë." },
      { termino: "OBSH", definicion: "Organizata Botërore e Shëndetësisë, që përcakton kategoritë e BMI për të rriturit." },
    ],
  };
};

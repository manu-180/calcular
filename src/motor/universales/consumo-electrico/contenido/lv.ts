import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Elektrības patēriņa kalkulators",
    title: tituloQueEntre(
      `Elektrības patēriņa kalkulators (${ctx.nombrePais})`,
      "Elektroierīču patēriņa kalkulators",
      "Elektrības patēriņš",
    ),
    description: "Aprēķiniet, cik elektrības patērē ierīce un cik tas maksā dienā, mēnesī un gadā, pēc jaudas, darbības laika un kWh cenas.",
    intro: [
      "Ievadiet ierīces jaudu, cik stundu dienā to lietojat, un 1 kWh cenu no rēķina. Redzēsiet patēriņu un to, cik tas maksā.",
      "Tā viegli uzzināsiet, kura ierīce visvairāk palielina elektrības rēķinu: gaisa kondicionieris, elektriskais sildītājs, ledusskapis vai dators.",
    ],
    comoSeCalcula: [
      "kWh dienā = vati × darbības stundas ÷ 1000.",
      "kWh mēnesī = kWh dienā × darbības dienas. Gada patēriņš ir mēneša patēriņš, reizināts ar 12.",
      "Izmaksas = kWh × 1 kWh cena.",
    ],
    ejemplo: [
      `Ierīces jauda 1000 W, darbības ilgums 4 stundas dienā. Dienā tā patērē 4 kWh, mēnesī ${formatearNumero(ctx, kwhMes)} kWh.`,
      `Ja 1 kWh cena ir ${m(precio)}, mēneša izmaksas sasniedz ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Kas ir kWh?",
        respuesta: "Kilovatstunda: enerģija, ko 1000 W jaudas ierīce patērē vienā darbības stundā. Šajā mērvienībā elektrību rēķina rēķinos.",
      },
      {
        pregunta: "Vai ledusskapis visu dienu strādā ar pilnu jaudu?",
        respuesta: "Nē. Kompresors ieslēdzas un izslēdzas. Šādām ierīcēm 24 stundu vietā ievadiet no 8 līdz 10 stundām dienā.",
      },
      {
        pregunta: "Kāpēc rezultāts nesakrīt ar rēķinu?",
        respuesta: "Rēķinā ir arī pastāvīgie maksājumi, sadales maksa un citi nodokļi, dažreiz arī tarifi pēc patēriņa. Šis aprēķins rāda tikai pašas ierīces patēriņu.",
      },
    ],
    glosario: [
      { termino: "Vats (W)", definicion: "Jaudas mērvienība: cik enerģijas ierīce izmanto katru sekundi." },
      { termino: "Kilovatstunda (kWh)", definicion: "1000 W vienā stundā. Tieši par šo mērvienību maksājat pēc rēķina." },
    ],
  };
};

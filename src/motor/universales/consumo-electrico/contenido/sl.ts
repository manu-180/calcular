import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulator porabe elektrike",
    title: tituloQueEntre(
      `Kalkulator porabe elektrike (${ctx.nombrePais})`,
      "Kalkulator porabe elektrike po napravah",
      "Poraba elektrike",
    ),
    description:
      "Izračunajte, koliko elektrike porabi naprava in koliko to stane na dan, na mesec in na leto, glede na moč, čas delovanja in ceno kWh.",
    intro: [
      "Vnesite moč naprave, koliko ur na dan deluje, in ceno za 1 kWh z računa. Videli boste porabo in koliko vas to stane.",
      "Tako hitro vidite, katera naprava najbolj dvigne račun za elektriko: klimatska naprava, grelec, hladilnik ali računalnik.",
    ],
    comoSeCalcula: [
      "kWh na dan = vati × ure delovanja ÷ 1000.",
      "kWh na mesec = kWh na dan × dnevi delovanja. Letna poraba je mesečna poraba krat 12.",
      "Strošek = kWh × cena za 1 kWh.",
    ],
    ejemplo: [
      `Naprava z močjo 1000 W, ki deluje 4 ure na dan, porabi 4 kWh na dan in ${formatearNumero(ctx, kwhMes)} kWh na mesec.`,
      `Pri ceni ${m(precio)} za 1 kWh je mesečni strošek ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Kaj je kWh?",
        respuesta: "Kilovatna ura: energija, ki jo naprava z močjo 1000 W porabi v eni uri delovanja. V tej enoti je elektrika obračunana na računu.",
      },
      {
        pregunta: "Ali hladilnik ves dan deluje s polno močjo?",
        respuesta: "Ne. Kompresor se vklaplja in izklaplja. Pri takih napravah namesto 24 ur vnesite 8 do 10 ur na dan.",
      },
      {
        pregunta: "Zakaj se izračun ne ujema z računom za elektriko?",
        respuesta:
          "Na računu so tudi fiksni stroški, dajatve in davki, včasih pa tudi različne cene po tarifah. Ta izračun kaže samo porabo ene naprave.",
      },
    ],
    glosario: [
      { termino: "Vat (W)", definicion: "Enota moči: koliko energije naprava prejme vsako sekundo." },
      { termino: "Kilovatna ura (kWh)", definicion: "1000 W v eni uri. Prav to enoto plačujete na računu." },
    ],
  };
};

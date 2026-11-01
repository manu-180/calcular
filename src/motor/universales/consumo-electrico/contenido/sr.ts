import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulator potrošnje struje",
    title: tituloQueEntre(
      `Kalkulator potrošnje struje (${ctx.nombrePais})`,
      "Kalkulator potrošnje struje po uređaju",
      "Potrošnja struje",
    ),
    description:
      "Izračunajte koliko struje troši uređaj i koliko to košta dnevno, mesečno i godišnje, prema snazi, vremenu rada i ceni kWh.",
    intro: [
      "Unesite snagu uređaja, koliko sati dnevno radi i cenu za 1 kWh sa računa. Videćete potrošnju i koliko vas košta.",
      "Tako lako vidite koji uređaj najviše podiže račun za struju: klima, grejalica, frižider ili računar.",
    ],
    comoSeCalcula: [
      "kWh dnevno = vati × sati rada ÷ 1000.",
      "kWh mesečno = kWh dnevno × dani rada. Godišnja potrošnja je mesečna potrošnja puta 12.",
      "Trošak = kWh × cena za 1 kWh.",
    ],
    ejemplo: [
      `Uređaj snage 1000 W koji radi 4 sata dnevno troši 4 kWh dnevno i ${formatearNumero(ctx, kwhMes)} kWh mesečno.`,
      `Uz cenu od ${m(precio)} za 1 kWh, mesečni trošak je ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Šta je kWh?",
        respuesta: "Kilovat-sat: energija koju uređaj snage 1000 W potroši za sat rada. U toj jedinici se struja obračunava na računu.",
      },
      {
        pregunta: "Da li frižider ceo dan radi punom snagom?",
        respuesta: "Ne. Kompresor se uključuje i isključuje. Za takve uređaje umesto 24 sata unesite 8 do 10 sati dnevno.",
      },
      {
        pregunta: "Zašto se obračun ne poklapa sa računom za struju?",
        respuesta:
          "Na računu su i fiksni troškovi, naknade i porezi, a ponekad i cene po zonama potrošnje. Ovaj obračun pokazuje samo potrošnju jednog uređaja.",
      },
    ],
    glosario: [
      { termino: "Vat (W)", definicion: "Jedinica snage: koliko energije uređaj uzima svake sekunde." },
      { termino: "Kilovat-sat (kWh)", definicion: "1000 W tokom jednog sata. Upravo tu jedinicu plaćate na računu." },
    ],
  };
};

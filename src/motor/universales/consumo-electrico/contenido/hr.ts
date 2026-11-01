import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
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
      "Izračunajte koliko struje troši uređaj i koliko to košta dnevno, mjesečno i godišnje, prema snazi, vremenu rada i cijeni kWh.",
    intro: [
      "Unesite snagu uređaja, koliko sati dnevno radi i cijenu za 1 kWh s računa. Vidjet ćete potrošnju i koliko vas to košta.",
      "Tako lako vidite koji uređaj najviše podiže račun za struju: klima-uređaj, grijalica, hladnjak ili računalo.",
    ],
    comoSeCalcula: [
      "kWh dnevno = vati × sati rada ÷ 1000.",
      "kWh mjesečno = kWh dnevno × dani rada. Godišnja potrošnja je mjesečna potrošnja puta 12.",
      "Trošak = kWh × cijena za 1 kWh.",
    ],
    ejemplo: [
      `Uređaj snage 1000 W koji radi 4 sata dnevno troši 4 kWh dnevno i ${formatearNumero(ctx, kwhMes)} kWh mjesečno.`,
      `Uz cijenu od ${m(precio)} za 1 kWh, mjesečni trošak je ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Što je kWh?",
        respuesta: "Kilovatsat: energija koju uređaj snage 1000 W potroši za sat rada. U toj se jedinici struja obračunava na računu.",
      },
      {
        pregunta: "Radi li hladnjak cijeli dan punom snagom?",
        respuesta: "Ne. Kompresor se uključuje i isključuje. Za takve uređaje umjesto 24 sata unesite 8 do 10 sati dnevno.",
      },
      {
        pregunta: "Zašto se izračun ne podudara s računom za struju?",
        respuesta:
          "Na računu su i fiksni troškovi, naknade i porezi, a ponekad i različite cijene po tarifama. Ovaj izračun pokazuje samo potrošnju jednog uređaja.",
      },
    ],
    glosario: [
      { termino: "Vat (W)", definicion: "Jedinica snage: koliko energije uređaj uzima svake sekunde." },
      { termino: "Kilovatsat (kWh)", definicion: "1000 W tijekom jednog sata. Upravo tu jedinicu plaćate na računu." },
    ],
  };
};

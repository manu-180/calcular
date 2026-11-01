import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Kućni proračun po pravilu 50/30/20",
    title: tituloQueEntre(
      `Kućni proračun 50/30/20 ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Kućni proračun po pravilu 50/30/20",
      "Kućni proračun 50/30/20",
    ),
    description: "Rasporedite neto mjesečni prihod po pravilu 50/30/20: koliko za osnovne troškove, koliko za želje i koliko za štednju. Postotke možete promijeniti.",
    intro: [
      "Pravilo 50/30/20 jednostavan je način da isplanirate mjesec. Polovina ide na osnovne troškove, 30 % na ono što vas veseli i 20 % na štednju.",
      "Unesite neto prihod i vidjet ćete koliko pripada svakom dijelu. Ako je vaša situacija drukčija, na primjer zbog visoke stanarine, prilagodite postotke.",
    ],
    comoSeCalcula: [
      "Osnovni troškovi = prihod × 50 %.",
      "Želje i zadovoljstva = prihod × 30 %.",
      "Štednja = prihod × 20 %. Sva tri postotka zajedno moraju dati 100 %.",
    ],
    ejemplo: [
      `Uz prihod od ${m(ingreso)} mjesečno: ${m(ingreso * 0.5)} za osnovne troškove, ${m(ingreso * 0.3)} za želje i zadovoljstva i ${m(ingreso * 0.2)} za štednju.`,
      `Za godinu dana tih 20 % iznosi ukupno ${m(ingreso * 0.2 * 12)} ušteđevine.`,
    ],
    faq: [
      {
        pregunta: "Što spada u osnovne troškove, a što u želje?",
        respuesta:
          "Osnovni troškovi su oni koje morate platiti: stanovanje, osnovne namirnice, računi, prijevoz, zdravlje i obvezne rate. Želje i zadovoljstva su stvari bez kojih biste se u nuždi snašli.",
      },
      {
        pregunta: "Što ako osnovni troškovi odnose više od 50 %?",
        respuesta: "To je često, naročito kada je stanarina visoka. Probajte raspodjelu 60/20/20 ili 70/20/10 i nemojte spuštati štednju na nulu.",
      },
      {
        pregunta: "Računa li se otplata dugova kao štednja?",
        respuesta: "Obvezne rate spadaju u osnovne troškove. Ono što otplaćujete iznad toga, da biste se ranije riješili duga, računa se kao štednja, jer vašu financijsku situaciju popravlja jednako kao ušteđevina.",
      },
    ],
    glosario: [
      { termino: "Neto prihod", definicion: "Koliko primate nakon odbitka poreza i doprinosa." },
      { termino: "Pravilo 50/30/20", definicion: "Način da se prihod rasporedi na osnovne troškove, želje i štednju." },
    ],
  };
};

import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionHu } from "../../dias-entre-fechas/textos/hu";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Életkor kalkulátor",
    title: tituloQueEntre(
      `Életkor kalkulátor: hány éves vagyok? (${ctx.nombrePais})`,
      "Életkor kalkulátor: hány éves vagyok?",
      "Életkor kalkulátor",
    ),
    description:
      "Számold ki a pontos életkorodat években, hónapokban és napokban, hány napot éltél már, és mennyi van hátra a következő születésnapodig.",
    intro: [
      "Írd be a születési dátumodat, és látod a pontos életkorodat a mai napon, hónapokban, hetekben és napokban is.",
      "Változtasd meg a második dátumot, ha arra vagy kíváncsi, hány éves volt valaki egy adott napon, vagy hány éves lesz.",
    ],
    comoSeCalcula: [
      "A kalkulátor a születéstől a választott napig eltelt teljes hónapokat számolja. Minden 12 hónap egy év.",
      "Az utolsó teljes hónap után megmaradó napok adják az életkor napjait.",
      "A szökőévek 366 nappal számítanak.",
    ],
    ejemplo: [
      `Aki ${fechaLarga(ctx.locale, nac)} napján született, annak az életkora ${fechaLarga(ctx.locale, ref)} napján pontosan ${duracionHu(Math.floor(meses / 12), meses % 12, dias)} volt.`,
      `Ez összesen ${formatearNumero(ctx, total)} nap.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolják a pontos életkort?",
        respuesta: "Először a teljes éveket, aztán az utolsó születésnap óta eltelt teljes hónapokat, végül a megmaradó napokat.",
      },
      {
        pregunta: "Mi a helyzet azokkal, akik február 29. napján születtek?",
        respuesta: "A nem szökőévekben ez a kalkulátor február 28. napját veszi születésnapnak. Egyes jogszabályok ehelyett március 1. napját használják.",
      },
      {
        pregunta: "Hány napos vagyok?",
        respuesta: "Nézd meg a „Napokban” sort. A születésedtől a választott napig minden napot beleszámol, az utolsó napot kivéve.",
      },
    ],
    glosario: [
      { termino: "Életkor", definicion: "A születés óta eltelt teljes évek száma." },
      { termino: "Szökőév", definicion: "366 napos év, amelyben van február 29. Négyévente jön el, kivéve néhány századfordulós évet." },
    ],
  };
};

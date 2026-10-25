import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "50/30/20 szabály kalkulátor",
    title: tituloQueEntre(`50/30/20 szabály kalkulátor (${ctx.nombrePais})`, `Családi költségvetés: 50/30/20 (${ctx.nombrePais})`, "50/30/20 szabály kalkulátor"),
    description: "Oszd be a havi nettó fizetésed az 50/30/20 szabály szerint: mennyi jut a szükségletekre, a vágyakra és a megtakarításra. Az arányokat át is írhatod.",
    intro: [
      "Az 50/30/20 szabály egyszerű módja a havi költségvetés megtervezésének. A jövedelem fele megy a létfontosságú kiadásokra, 30 százaléka arra, amit szeretsz, 20 százaléka pedig megtakarításra.",
      "Írd be a nettó jövedelmedet, és megmutatjuk, mennyi jut az egyes részekre. Ha más a helyzeted, például magas az albérlet, igazítsd az arányokat.",
    ],
    comoSeCalcula: ["Szükségletek = jövedelem × 50%.", "Vágyak = jövedelem × 30%.", "Megtakarítás = jövedelem × 20%. A három százalék összege pontosan 100 legyen."],
    ejemplo: [
      `Havi nettó jövedelem: ${m(ingreso)}. Szükségletekre: ${m(ingreso * 0.5)}, vágyakra: ${m(ingreso * 0.3)}, megtakarításra: ${m(ingreso * 0.2)}.`,
      `Egy év alatt ez a 20 százalék ennyi megtakarítást jelent: ${m(ingreso * 0.2 * 12)}.`,
    ],
    faq: [
      {
        pregunta: "Mi számít szükségletnek és mi vágynak?",
        respuesta:
          "Szükséglet az, amit mindenképp ki kell fizetned: lakhatás, alapvető élelmiszer, rezsi, közlekedés, egészség és a hitelek minimális törlesztése. Vágy az, amiről szükség esetén lemondhatnál.",
      },
      {
        pregunta: "Mi van, ha a szükségleteim a jövedelmem felénél többet visznek el?",
        respuesta: "Ez gyakori, főleg magas lakbér mellett. Próbáld a 60/20/20 vagy a 70/20/10 arányt, de a megtakarítást ne vidd le nullára.",
      },
      {
        pregunta: "A hiteltörlesztés megtakarításnak számít?",
        respuesta: "A minimális törlesztés a szükségletek közé tartozik. Amit ezen felül fizetsz, hogy hamarabb megszabadulj a tartozástól, megtakarításnak számít, mert ugyanúgy növeli a vagyonodat.",
      },
    ],
    glosario: [
      { termino: "Nettó jövedelem", definicion: "Amit adók és járulékok levonása után kézhez kapsz." },
      { termino: "50/30/20 szabály", definicion: "A jövedelem felosztása szükségletek, vágyak és megtakarítás között." },
    ],
  };
};

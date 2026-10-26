import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Calculator adaos comercial și marjă de profit",
    title: tituloQueEntre(`Calculator adaos comercial: ${ctx.nombrePais}`, "Calculator adaos comercial și marjă", "Calculator adaos comercial"),
    description: "Calculați adaosul comercial și marja de profit din cost și preț, sau prețul de vânzare de care aveți nevoie pentru marja dorită.",
    intro: [
      "Adaosul comercial și marja de profit se confundă des, iar diferența poate costa bani. Amândouă măsoară același profit, dar față de o altă bază.",
      "Introduceți costul și prețul și vă arătăm ambele valori. Sau alegeți o marjă și vă spunem cu cât să vindeți.",
    ],
    comoSeCalcula: [
      "Profit = preț de vânzare − cost.",
      "Marjă = profit ÷ preț de vânzare × 100.",
      "Adaos comercial = profit ÷ cost × 100.",
      "Preț pentru o marjă dorită = cost ÷ (1 − marjă ÷ 100).",
    ],
    ejemplo: [
      `Un produs cu un cost de ${m(costo)} vândut cu ${m(precio)} aduce un profit de ${m(precio - costo)}: o marjă de ${p(((precio - costo) / precio) * 100)} și un adaos comercial de ${p(((precio - costo) / costo) * 100)}.`,
      `Pentru o marjă de 50% la același cost, trebuie să vindeți cu ${m(precioConMargen(costo, 50))}. Un adaos de 50% la cost dă o marjă de doar ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Care este diferența dintre adaosul comercial și marjă?",
        respuesta: "Marja raportează profitul la prețul de vânzare. Adaosul comercial îl raportează la cost. Pentru același profit, adaosul este mereu numărul mai mare.",
      },
      {
        pregunta: "Cum se stabilește prețul pentru o marjă dorită?",
        respuesta: `Împărțiți costul la (1 − marjă). Pentru o marjă de 30%, împărțiți costul la ${formatearNumero(ctx, 0.7, 2)}. Nu adăugați 30% la cost: ați câștiga mai puțin decât credeți.`,
      },
      {
        pregunta: "Costul trebuie să includă TVA?",
        respuesta: "Folosiți costul și prețul fără TVA sau alte taxe colectate de la client. Altfel marja pare mai mare decât este.",
      },
    ],
    glosario: [
      { termino: "Marjă de profit", definicion: "Profitul ca procent din prețul de vânzare." },
      { termino: "Adaos comercial", definicion: "Profitul ca procent din costul de achiziție." },
    ],
  };
};

import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Calculator credit",
    title: tituloQueEntre(`Calculator credit: ${ctx.nombrePais}`, "Calculator credit: rata lunară și dobânda", "Calculator credit"),
    description: "Calculați rata lunară a unui credit, dobânda totală și graficul de rambursare complet. Vedeți cât economisiți cu plăți în avans.",
    intro: [
      "Înainte să semnați pentru un credit de nevoi personale, contează două cifre: cât plătiți în fiecare lună și cât vă costă creditul în dobânzi.",
      "Introduceți suma, dobânda anuală și perioada. Dacă vreți să plătiți lunar puțin în plus, adăugați suma și vedeți cu cât terminați mai devreme.",
    ],
    comoSeCalcula: [
      "Se folosește rata egală (anuități), metoda obișnuită la creditele de nevoi personale, auto și ipotecare.",
      "Rata lunară a dobânzii = dobânda anuală ÷ 12.",
      "Rata = suma × dobânda lunară ÷ (1 − (1 + dobânda lunară) la puterea minus numărul de rate).",
      "În fiecare lună, dobânda se calculează la cât mai datorați. Restul ratei reduce principalul.",
    ],
    ejemplo: [
      `Un credit de ${m(monto)} cu o dobândă de 12% pe an, pe 36 de luni, are o rată de ${m(cuota36)}. În total plătiți ${m(interesesTotales(monto, 12, 36))} dobândă.`,
      `Pe 60 de luni, rata scade la ${m(cuota60)}, dar dobânda totală urcă la ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează rata la credit?",
        respuesta:
          "Cu formula ratelor egale. Toate ratele sunt la fel, dar primele sunt aproape numai dobândă, iar ultimele aproape numai principal. De aceea soldul scade încet la început.",
      },
      {
        pregunta: "Merită să rambursați creditul în avans?",
        respuesta:
          "De obicei da, dacă nu există un comision mare de rambursare anticipată. Banii în plus merg direct la principal și nu mai produc dobândă pentru bancă. Cu cât plătiți mai devreme, cu atât economisiți mai mult.",
      },
      {
        pregunta: "Este mai bună o perioadă mai lungă?",
        respuesta: "Rata este mai mică, dar plătiți mult mai multă dobândă în total. Comparați ambele cifre înainte să decideți.",
      },
      {
        pregunta: "De ce banca îmi arată o altă rată?",
        respuesta:
          "Băncile adaugă des asigurări, comisioane sau taxe, ori folosesc o dobândă diferită de cea din reclamă. Comparați ofertele după DAE și costul total al creditului, nu doar după dobândă.",
      },
    ],
    glosario: [
      { termino: "Principal", definicion: "Partea din datorie pe care nu ați rambursat-o încă." },
      { termino: "DAE", definicion: "Dobânda anuală efectivă: costul total al creditului pe an, cu dobândă, comisioane și asigurări obligatorii." },
      { termino: "Rambursare", definicion: "Partea din fiecare rată care reduce datoria." },
    ],
  };
};

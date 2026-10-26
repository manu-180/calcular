import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Calculator credit ipotecar",
    title: tituloQueEntre(`Calculator credit ipotecar: ${ctx.nombrePais}`, "Calculator credit ipotecar: rată și dobânzi", "Calculator credit ipotecar"),
    description: "Calculați rata lunară a creditului ipotecar după preț, avans, dobândă și perioadă. Vedeți totalul dobânzilor și cum scade soldul în fiecare an.",
    intro: [
      "Creditul ipotecar este cea mai mare datorie pe care o iau cele mai multe familii. Merită să vedeți toate cifrele înainte de discuția cu banca.",
      "Introduceți prețul locuinței, avansul, dobânda și perioada. Dacă plătiți asigurarea sau impozitul pe clădire odată cu rata, adăugați-le și vedeți rata reală.",
    ],
    comoSeCalcula: [
      "Suma împrumutată = prețul locuinței − avansul.",
      "Rata este egală (anuitate): aceeași în fiecare lună, cu dobânda anuală împărțită la 12 și perioada în luni.",
      "Pentru fiecare an se adună dobânda plătită și principalul rambursat și se arată soldul rămas.",
    ],
    ejemplo: [
      `O locuință de ${m(precio)} cu un avans de 20% necesită un credit de ${m(prestado)}. La o dobândă de 7% pe an, pe 30 de ani, rata lunară este ${m(cuota30)}.`,
      `În 30 de ani plătiți dobânzi de ${m(interesesTotales(prestado, 7, 360))}. Pe 15 ani rata urcă la ${m(cuota15)}, dar dobânzile scad la ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Ce avans este necesar pentru un credit ipotecar?",
        respuesta:
          "Depinde de bancă și de programul de creditare. Cu cât avansul este mai mare, cu atât suma împrumutată, rata și dobânzile totale sunt mai mici. Puneți deoparte și bani pentru costurile de acordare.",
      },
      {
        pregunta: "De ce scade atât de puțin datoria în primii ani?",
        respuesta:
          "Dobânda se calculează la soldul rămas. La început soldul este mare, așa că aproape toată rata merge la dobândă. Cu timpul, partea de principal din rată crește.",
      },
      {
        pregunta: "Este mai bine un credit pe o perioadă mai scurtă?",
        respuesta:
          "Dacă vă permiteți o rată mai mare, da: plătiți mult mai puțină dobândă. Dacă nu, o perioadă lungă cu rambursări anticipate atunci când aveți bani în plus poate fi o soluție.",
      },
      {
        pregunta: "Se poate schimba rata creditului ipotecar?",
        respuesta: "Cu dobândă fixă, rata rămâne aceeași. Cu dobândă variabilă, se poate modifica. Calculatorul presupune că dobânda nu se schimbă pe toată perioada.",
      },
    ],
    glosario: [
      { termino: "Avans", definicion: "Partea din prețul locuinței pe care o plătiți din banii proprii." },
      { termino: "Principal", definicion: "Suma împrumutată pe care încă o aveți de rambursat." },
      { termino: "Sold", definicion: "Cât mai datorați băncii în acest moment." },
    ],
  };
};

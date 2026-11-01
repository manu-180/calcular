import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Fizetésemelés kalkulátor",
    title: tituloQueEntre(`Fizetésemelés kalkulátor (${ctx.nombrePais})`, `Béremelés számítás (${ctx.nombrePais})`, "Fizetésemelés kalkulátor"),
    description: "Számold ki az új fizetésedet béremelés után, a különbséget havonta és évente, és azt, hogy a reálbér-emeléssel megverted-e az inflációt.",
    intro: [
      "Fizetésemelést ajánlottak, vagy éppen kérni készülsz. Írd be a fizetésedet és az emelést, százalékban vagy összegben, és nézd meg, mennyit változik havonta és évente.",
      "Add meg az időszak inflációját is, és megmondjuk, valóban nőtt-e a vásárlóerőd, vagy csak behoztad a lemaradást.",
    ],
    comoSeCalcula: [
      "Új fizetés = jelenlegi fizetés × (1 + emelés ÷ 100).",
      "Különbség évente = különbség havonta × havi bérek száma évente.",
      "Reálbér-emelés = (1 + emelés) ÷ (1 + infláció) − 1.",
    ],
    ejemplo: [
      `Havi fizetés: ${m(sueldo)}. Öt százalék emeléssel ennyi lesz: ${m(sueldo * 1.05)}. Ez havonta ${m(sueldo * 0.05)}, évente ${m(sueldo * 0.05 * 12)} többlet.`,
      `Ha az időszak inflációja 3 százalék volt, a reálbér-emelés ennyi: ${p(aumentoReal(5, 3))}. Hat százalék inflációnál ennyi: ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Mi a reálbér-emelés?",
        respuesta: "Az emelés az infláció levonása után. Megmutatja, hogy az új fizetésedből többet vagy kevesebbet vehetsz-e, mint korábban.",
      },
      {
        pregunta: "Miért nem elég kivonni az inflációt az emelésből?",
        respuesta: `Mert a két százalék összeszorzódik, nem összeadódik. Öt százalék emelésnél és három százalék inflációnál a reálbér-emelés ennyi: ${p(aumentoReal(5, 3))}, nem pedig 2 százalék. Magas inflációnál a különbség sokkal nagyobb.`,
      },
      {
        pregunta: "Mekkora fizetésemelést kérjek?",
        respuesta: "Legalább a legutóbbi emelés óta eltelt időszak inflációját, hogy ne maradj le. Ezen felül azt, amit más munkáltatók fizetnek egy hasonló munkakörért, és amennyit a feladataid bővültek.",
      },
    ],
    glosario: [
      { termino: "Nominális emelés", definicion: "Az emelés úgy, ahogy a bérpapíron látszik, az infláció figyelembevétele nélkül." },
      { termino: "Vásárlóerő", definicion: "Amennyit a fizetésedből meg tudsz venni." },
    ],
  };
};

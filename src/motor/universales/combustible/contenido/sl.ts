import { formaSl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const litrov = (x: number) => formaSl(x, "liter", "litra", "litri", "litrov");
  const galon = (x: number) => formaSl(x, "galono", "galoni", "galone", "galon");
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Za pot 150 milj v obe smeri avtomobil, ki prevozi 30 milj na galono, potrebuje ${formatearNumero(ctx, galones)} ${galon(galones)} goriva.`,
          `Pri ceni ${m(precio)} na galono to znese ${m(galones * precio)}. Če si strošek delita 2 osebi, vsaka plača ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Za pot 300 km v obe smeri avtomobil, ki porabi 8 litrov na 100 km, potrebuje ${formatearNumero(ctx, litros)} ${litrov(litros)} goriva.`,
          `Pri ceni ${m(precio)} na liter to znese ${m(litros * precio)}. Če si strošek delita 2 osebi, vsaka plača ${m((litros * precio) / 2)}.`,
        ];
      })();
  const prevod = Math.round((235.215 / 30) * 10) / 10;
  return {
    h1: "Kalkulator porabe goriva",
    title: tituloQueEntre(
      `Kalkulator porabe goriva (${ctx.nombrePais})`,
      "Kalkulator porabe goriva in stroškov poti",
      "Kalkulator porabe goriva",
    ),
    description:
      "Izračunajte, koliko goriva porabite na poti in koliko vas bo to stalo, glede na razdaljo, porabo avtomobila in ceno goriva.",
    intro: [
      `Vnesite razdaljo, porabo svojega avtomobila in ceno na ${imperial ? "galono" : "liter"}. Videli boste, koliko goriva potrebujete in koliko stane pot.`,
      imperial ? "Poraba je izražena v miljah na galono." : "Porabo lahko vnesete v litrih na 100 km ali v kilometrih na liter.",
    ],
    comoSeCalcula: imperial
      ? ["Galone = razdalja ÷ milje na galono.", "Strošek = galone × cena na galono. Če izberete „V obe smeri“, se razdalja podvoji."]
      : [
          "V litrih na 100 km: litri = razdalja × poraba ÷ 100.",
          "V kilometrih na liter: litri = razdalja ÷ poraba.",
          "Strošek = litri × cena na liter. Če izberete „V obe smeri“, se razdalja podvoji.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Kako pretvoriti milje na galono v litre na 100 km?",
        respuesta: `Število ${formatearNumero(ctx, 235.215, 1)} delite z vrednostjo mpg (ameriška galona). Avtomobil, ki prevozi 30 milj na galono, porabi približno ${formatearNumero(ctx, prevod, 1)} l na 100 km.`,
      },
      {
        pregunta: "Sta cestnina in parkiranje upoštevana?",
        respuesta: "Ne. Izračun zajema samo gorivo. Cestnino, vinjete in parkiranje prištejte posebej.",
      },
      {
        pregunta: "Zakaj avtomobil v mestu porabi več?",
        respuesta:
          "Vožnja s pogostim ustavljanjem in speljevanjem zahteva več energije kot vožnja po avtocesti s stalno hitrostjo. Zato je poraba v mestu običajno večja.",
      },
    ],
    glosario: [
      { termino: "Poraba goriva", definicion: "Koliko goriva avtomobil porabi na določeni razdalji ali koliko prevozi z določeno količino goriva." },
      { termino: "mpg", definicion: "Milje na galono. Višja kot je vrednost, varčnejši je avtomobil." },
    ],
  };
};

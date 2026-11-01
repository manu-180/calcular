import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const vinner = (a: { comprar: number; alquilar: number }, anios: string) =>
    `${a.comprar >= a.alquilar ? "borgar sig betur að kaupa" : "borgar sig betur að leigja"} og munurinn er ${m(Math.abs(a.comprar - a.alquilar))} eftir ${anios} ár`;
  return {
    h1: "Leigja eða kaupa húsnæði",
    title: tituloQueEntre(
      `Leigja eða kaupa: reiknaðu hvað borgar sig | ${ctx.nombrePais}`,
      `Leigja eða kaupa | ${ctx.nombrePais}`,
      "Leigja eða kaupa",
    ),
    description: "Berðu saman að leigja og kaupa húsnæði yfir þau ár sem þú velur. Sjáðu hvor kosturinn gefur meira í lokin, frá hvaða ári og hve miklu munar.",
    intro: [
      "Það dugar ekki að bera saman mánaðarlega greiðslu af láni og leigu. Sá sem kaupir greiðir vexti, viðhald og gjöld en á að lokum eignina. Sá sem leigir getur látið útborgunina vaxa.",
      "Reiknivélin leggur þetta allt saman ár fyrir ár og sýnir hvor kosturinn skilar þér mestri hreinni eign.",
    ],
    comoSeCalcula: [
      "Kaupa: í hverjum mánuði greiðirðu af láninu og kostnaðinn við að eiga. Hrein eign þín er verðmæti eignarinnar að frádregnum eftirstöðvum lánsins.",
      "Leigja: útborgunin og kostnaðurinn við kaupin fara í staðinn í fjárfestingu með hinni ávöxtuninni og leigan hækkar á hverju ári.",
      "Í hverjum mánuði fjárfestir sá sem hefur lægri útgjöld mismuninn, svo báðir kostir miðast við sömu fjárhagsáætlun.",
      "Betri kosturinn er sá sem skilar mestri hreinni eign í lokin.",
    ],
    ejemplo: [
      `Eign á ${m(precio)} með 20% útborgun og húsnæðisláni með 7% vöxtum til 25 ára, borin saman við leigu upp á ${m(alquiler)} á mánuði.`,
      `Á 10 árum ${vinner(a10, "10")}. Á 3 árum ${vinner(a3, "3")}.`,
    ],
    faq: [
      {
        pregunta: "Er leiga bara peningum kastað á glæ?",
        respuesta:
          "Ekki alveg. Sá sem kaupir hefur líka kostnað sem aldrei skilar sér aftur, eins og vexti, gjöld og viðhald. Það sem skiptir máli er hve mikið þú átt í lokin í hvoru tilviki.",
      },
      {
        pregunta: "Af hverju breytist svarið eftir fjölda ára?",
        respuesta:
          "Kaupum fylgir mikill kostnaður í byrjun (kostnaður við kaupin og miklir vextir fyrstu árin) sem tekur tíma að vinna upp. Ef þú ætlar að flytja fljótlega borgar sig oftast betur að leigja.",
      },
      {
        pregunta: "Hvaða tala hefur mest áhrif?",
        respuesta:
          "Hlutfallið milli verðs og leigu, vextir á húsnæðisláni og hve hratt húsnæðisverð hækkar. Prófaðu að breyta verðhækkuninni og ávöxtuninni og sjáðu hve mikið svarið hreyfist.",
      },
    ],
    glosario: [
      { termino: "Hrein eign", definicion: "Það sem þú átt að frádregnu því sem þú skuldar." },
      { termino: "Verðhækkun", definicion: "Hve mikið verðmæti eignarinnar hækkar á hverju ári." },
      { termino: "Fórnarkostnaður", definicion: "Það sem útborgunin hefði gefið ef þú hefðir fjárfest hana í staðinn." },
    ],
  };
};

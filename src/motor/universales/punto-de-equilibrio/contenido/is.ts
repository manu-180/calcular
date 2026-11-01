import { formaIs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Núllpunktsreiknivél: finndu núllpunktinn þinn",
    title: tituloQueEntre(
      `Núllpunktur: reiknaðu hvað þú þarft að selja | ${ctx.nombrePais}`,
      `Núllpunktsreiknivél | ${ctx.nombrePais}`,
      "Núllpunktsreiknivél",
    ),
    description: "Reiknaðu hve margar einingar þú þarft að selja og hve mikla veltu þú þarft í hverjum mánuði til að dekka kostnað og ná hagnaðinum sem þú vilt.",
    intro: [
      "Núllpunkturinn er sú sala þar sem reksturinn skilar hvorki hagnaði né tapi. Undir honum tapar þú peningum, yfir honum ferðu að hagnast.",
      "Sláðu inn fastan kostnað, verð og kostnað á hverja einingu. Þú sérð hve mikið þú þarft að selja til að dekka kostnaðinn og ná markmiðinu þínu.",
    ],
    comoSeCalcula: [
      "Framlegð á einingu = verð − breytilegur kostnaður á einingu.",
      "Einingar að núllpunkti = fastur kostnaður ÷ framlegð á einingu, hækkað upp í heila tölu.",
      "Velta við núllpunkt = fastur kostnaður ÷ (framlegð á einingu ÷ verð).",
      "Fyrir hagnað sem þú vilt bætirðu honum við fastan kostnað og reiknar á sama hátt.",
    ],
    ejemplo: [
      `Með ${m(fijos)} í fastan kostnað, ${m(precio)} í verð og ${m(variable)} í breytilegan kostnað skilar hver sala ${m(precio - variable)}.`,
      `Þú þarft að selja ${formatearNumero(ctx, base.unidades)} ${formaIs(base.unidades, "einingu", "einingar")} (${m(base.facturacion)}) til að dekka kostnaðinn og ${formatearNumero(ctx, meta.unidades)} til að hagnast um ${m(objetivo)} á mánuði.`,
    ],
    faq: [
      {
        pregunta: "Hvað er fastur og breytilegur kostnaður?",
        respuesta: "Fastur kostnaður er sá sami þótt þú seljir ekkert: leiga, föst laun, rafmagn. Breytilegur kostnaður hækkar með hverri sölu: innkaup, efni, þóknun og flutningur.",
      },
      {
        pregunta: "Hvernig lækka ég núllpunktinn minn?",
        respuesta: "Leiðirnar eru þrjár: hækka verðið, lækka breytilegan kostnað á einingu eða minnka fastan kostnað. Verðið skiptir yfirleitt mestu.",
      },
      {
        pregunta: "Virkar þetta fyrir þjónustufyrirtæki?",
        respuesta: "Já. Eining getur verið klukkustund, tími eða viðskiptavinur á mánuði. Notaðu það sem kostar þig að skila hverri einingu sem breytilegan kostnað.",
      },
    ],
    glosario: [
      { termino: "Núllpunktur", definicion: "Sölumagnið þar sem tekjur og kostnaður eru jafnhá." },
      { termino: "Framlegð á einingu", definicion: "Það sem hver sala skilar upp í fastan kostnað." },
    ],
  };
};

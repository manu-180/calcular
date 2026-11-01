import { formaIs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "hverja mílu" : "hvern kílómetra";
  const unidadNominativo = imperial ? "hver míla" : "hver kílómetri";
  return {
    h1: "Kostnaður við bíl: hvað kostar bíllinn á mánuði?",
    title: tituloQueEntre(
      `Kostnaður við bíl: hvað kostar bíllinn á mánuði? | ${ctx.nombrePais}`,
      `Kostnaður við bíl | ${ctx.nombrePais}`,
      "Kostnaður við bíl",
    ),
    description: `Reiknaðu hvað bíllinn kostar í raun á mánuði, á ári og á ${unidad}: eldsneyti, tryggingar, viðhald, bílastæði og verðrýrnun.`,
    intro: [
      "Flestir vita hvað þeir borga fyrir eldsneyti. Færri reikna með tryggingum, viðhaldi, bílastæðum og ekki síst verðmætinu sem bíllinn tapar á hverju ári.",
      "Sláðu inn kostnaðinn þinn og þú sérð hvað bíllinn kostar þig í raun. Það hjálpar þér að ákveða hvort þú kaupir, skiptir eða ferð aðra leið á milli staða.",
    ],
    comoSeCalcula: [
      imperial
        ? "Eldsneyti á mánuði = mílur á mánuði ÷ mílur á gallon × verð á gallon."
        : "Eldsneyti á mánuði = kílómetrar á mánuði × lítrar á 100 km ÷ 100 × verð á lítra.",
      "Verðrýrnun á mánuði = verðmæti bílsins × verðrýrnun á ári ÷ 12.",
      "Raunkostnaður = eldsneyti + tryggingar + viðhald + bílastæði + annar kostnaður + verðrýrnun.",
      `Kostnaður á ${unidad} = raunkostnaður á mánuði ÷ vegalengdin sem þú ekur á mánuði.`,
    ],
    ejemplo: [
      `Bíll sem er ${m(g.precio)} virði og er ekið ${formatearNumero(ctx, g.distancia)} ${imperial ? formaIs(g.distancia, "mílu", "mílur") : "km"} á mánuði kostar ${m(mensual)} á mánuði, með verðrýrnun.`,
      `Það gerir ${m(mensual * 12)} á ári og ${formatearMonto(ctx, mensual / g.distancia)} á ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Hvað er verðrýrnun á bíl?",
        respuesta: "Það er verðmætið sem bíllinn tapar með tímanum. Þú borgar það ekki í hverjum mánuði en finnur fyrir því þegar þú selur. Á nýjum bíl er það oft stærsti kostnaðurinn.",
      },
      {
        pregunta: "Af hverju er afborgun af bílaláninu ekki talin með?",
        respuesta:
          "Hluti afborgunarinnar greiðir bílinn sjálfan og hann er þegar talinn með sem verðrýrnun. Ef hvort tveggja er tekið með er bíllinn talinn tvisvar. Vextirnir af láninu eru aukakostnaður þar ofan á.",
      },
      {
        pregunta: "Hvernig lækka ég kostnaðinn við bílinn?",
        respuesta:
          "Berðu saman tryggingar á hverju ári, fylgstu með loftþrýstingi í dekkjum og þjónustuskoðunum og skiptu ekki of oft um bíl. Bíllinn tapar mestu verðmæti fyrstu árin.",
      },
    ],
    glosario: [
      { termino: "Verðrýrnun", definicion: "Verðmætið sem bíllinn tapar með tíma og notkun." },
      { termino: `Kostnaður á ${unidad}`, definicion: `Hvað ${unidadNominativo} kostar að meðaltali þegar allur kostnaður er tekinn með.` },
    ],
  };
};

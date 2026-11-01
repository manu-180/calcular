import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Í verönd sem er 10 × 10 ft og 4 in á þykkt þarf ${n(ft3)} ft³ af steypu, það er ${n(ft3 / 27)} rúmjarda.`,
          `Með viðmiðunarblöndunni gerir það um ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb af sementi.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Í plötu sem er 4 × 3 m og 10 cm á þykkt þarf ${n(volumen, 1)} m³ af steypu.`,
          `Með viðmiðunarblöndunni gerir það um ${n(MEZCLA.cementoKg * volumen, 0)} kg af sementi, ${n(MEZCLA.arenaM3 * volumen)} m³ af sandi og ${n(MEZCLA.piedraM3 * volumen)} m³ af möl.`,
        ];
      })();
  return {
    h1: "Steypureiknivél: hvað þarf ég mikla steypu?",
    title: tituloQueEntre(
      `Steypureiknivél: hvað þarf ég mikla steypu? | ${ctx.nombrePais}`,
      `Steypureiknivél | ${ctx.nombrePais}`,
      "Steypureiknivél",
    ),
    description: `Reiknaðu hvað þú þarft mikla steypu í verkið, í ${imperial ? "rúmjördum" : "rúmmetrum"}, og um það bil hvað þú þarft að kaupa mikið af sementi, sandi og möl.`,
    intro: [
      "Sláðu inn lengd, breidd og þykkt. Þá sérðu rúmmál steypunnar og um það bil hvað fer mikið efni í blönduna.",
      "Efnismagnið fer eftir uppskriftinni. Reiknivélin gerir ráð fyrir almennri blöndu 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Rúmmál = lengd × breidd × þykkt, með þykktina í fetum. Deildu rúmfetum með 27 til að fá rúmjarda."
        : "Rúmmál = lengd × breidd × þykkt, með þykktina í metrum.",
      "Síðan bætist við aukaskammtur fyrir ójafnt undirlag og rýrnun.",
      `Á hvern m³: um ${n(MEZCLA.cementoKg, 0)} kg af sementi, ${n(MEZCLA.arenaM3)} m³ af sandi, ${n(MEZCLA.piedraM3, 1)} m³ af möl og ${n(MEZCLA.aguaL, 0)} lítra af vatni.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvernig reikna ég hvað fer mikil steypa í verkið?",
        respuesta: `Margfaldaðu saman lengd, breidd og þykkt í metrum. Plata sem er 4 × 3 m og 10 cm á þykkt er ${n(4 * 3 * 0.1, 1)} m³.`,
      },
      {
        pregunta: "Hvað fer mikið sement í rúmmetra af steypu?",
        respuesta: `Í blöndu 1:2:3 um ${n(MEZCLA.cementoKg, 0)} kg. Sterkari steypa þarf meira sement.`,
      },
      {
        pregunta: "Á ég að panta tilbúna steypu?",
        respuesta: "Í stórum verkum verður hún oftast jafnari og verkið gengur hraðar. Í minni verkum er algengt að blanda sjálfur með þessu magni.",
      },
    ],
    glosario: [
      { termino: "Blönduhlutfall", definicion: "Hlutfallið á milli sements, sands, malar og vatns í blöndunni." },
      { termino: "Steypun", definicion: "Þegar steypunni er hellt í mótin og hún látin harðna." },
    ],
  };
};

import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const vienibas = (n: number) => `${formatearNumero(ctx, n)} ${formaLv(n, "vienība", "vienības", "vienību")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Bezzaudējuma punkta kalkulators",
    title: tituloQueEntre(`Bezzaudējuma punkta kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Kā aprēķināt bezzaudējuma punktu", "Bezzaudējuma punkta kalkulators"),
    description: "Uzziniet, cik vienību jāpārdod un kādi ieņēmumi vajadzīgi katru mēnesi, lai segtu izmaksas un sasniegtu vēlamo peļņu.",
    intro: [
      "Bezzaudējuma punkts ir pārdošanas apjoms, pie kura uzņēmums nepelna, bet arī necieš zaudējumus. Zem tā strādājat ar zaudējumiem, virs tā sākat pelnīt.",
      "Ievadiet pastāvīgās izmaksas, cenu un vienas vienības izmaksas. Parādīsim, cik jāpārdod, lai segtu izmaksas un sasniegtu savu mērķi.",
    ],
    comoSeCalcula: [
      "Seguma marža = cena − mainīgās izmaksas uz vienību.",
      "Bezzaudējuma punkts vienībās = pastāvīgās izmaksas ÷ seguma marža, noapaļots uz augšu.",
      "Bezzaudējuma punkts ieņēmumos = pastāvīgās izmaksas ÷ (seguma marža ÷ cena).",
      "Vēlamo peļņu pieskaitiet pastāvīgajām izmaksām un rēķiniet tāpat.",
    ],
    ejemplo: [
      `Ja pastāvīgās izmaksas ir ${m(fijos)}, cena ${m(precio)}, bet mainīgās izmaksas ${m(variable)}, katrs pārdošanas darījums atstāj ${m(precio - variable)}.`,
      `Izmaksu segšanai pārdošanas apjomam jābūt: ${vienibas(base.unidades)} (ieņēmumi ${m(base.facturacion)}). Mēneša peļņai ${m(objetivo)} vajag: ${vienibas(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Kas ir pastāvīgās un mainīgās izmaksas?",
        respuesta:
          "Pastāvīgās izmaksas nemainās, pat ja neko nepārdodat: īre, fiksētas algas, komunālie maksājumi. Mainīgās izmaksas pieaug ar katru pārdošanas darījumu: preces, materiāli, komisijas, transports.",
      },
      {
        pregunta: "Kā samazināt bezzaudējuma punktu?",
        respuesta: "Iespējami trīs veidi: paaugstināt cenu, samazināt mainīgās izmaksas uz vienību vai apcirpt pastāvīgās izmaksas. Visvairāk parasti nosaka cena.",
      },
      {
        pregunta: "Vai tas der arī pakalpojumiem?",
        respuesta: "Jā. Vienība var būt stunda, konsultācija vai klients mēnesī. Kā mainīgās izmaksas ievadiet, cik izmaksā katra no tām.",
      },
    ],
    glosario: [
      { termino: "Bezzaudējuma punkts", definicion: "Pārdošanas apjoms, pie kura ieņēmumi ir vienādi ar izmaksām." },
      { termino: "Seguma marža", definicion: "Cik katrs pārdošanas darījums atstāj pastāvīgo izmaksu segšanai." },
    ],
  };
};

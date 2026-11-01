import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Peļņas maržas un uzcenojuma kalkulators",
    title: tituloQueEntre(`Peļņas maržas kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Peļņas maržas un uzcenojuma kalkulators", "Peļņas maržas kalkulators"),
    description: "Aprēķiniet peļņas maržu un uzcenojumu pēc pašizmaksas un pārdošanas cenas vai pārdošanas cenu, kas nodrošinās vēlamo maržu.",
    intro: [
      "Maržu un uzcenojumu bieži jauc, un šī atšķirība var maksāt naudu. Abi rāda to pašu peļņu, tikai salīdzinot ar atšķirīgu bāzi.",
      "Ievadiet pašizmaksu un pārdošanas cenu un redzēsiet abus rādītājus. Vai izvēlieties maržu, un kalkulators pateiks, par cik pārdot.",
    ],
    comoSeCalcula: [
      "Peļņa = pārdošanas cena − pašizmaksa.",
      "Marža = peļņa ÷ pārdošanas cena × 100.",
      "Uzcenojums = peļņa ÷ pašizmaksa × 100.",
      "Cena pēc vēlamās maržas = pašizmaksa ÷ (1 − marža ÷ 100).",
    ],
    ejemplo: [
      `Ja preces pašizmaksa ir ${m(costo)} un pārdošanas cena ${m(precio)}, peļņa ir ${m(precio - costo)}: marža ${p(((precio - costo) / precio) * 100)}, uzcenojums ${p(((precio - costo) / costo) * 100)}.`,
      `Lai marža būtu 50% pie tās pašas pašizmaksas, cenai jābūt ${m(precioConMargen(costo, 50))}. Ja pašizmaksai tikai pieskaitīsiet 50%, marža būs tikai ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Kāda ir atšķirība starp maržu un uzcenojumu?",
        respuesta: "Marža ir peļņa, salīdzinot ar pārdošanas cenu. Uzcenojums ir peļņa, salīdzinot ar pašizmaksu. Ja peļņa ir tā pati, uzcenojums vienmēr ir lielāks skaitlis.",
      },
      {
        pregunta: "Kā noteikt cenu pēc vēlamās maržas?",
        respuesta: `Daliet pašizmaksu ar (1 − marža). Ja vēlamā marža ir 30%, daliet pašizmaksu ar ${formatearNumero(ctx, 0.7, 2)}. Nepieskaitiet pašizmaksai 30%: nopelnītu mazāk, nekā gaidāt.`,
      },
      {
        pregunta: "Vai pašizmaksā jāiekļauj nodokļi?",
        respuesta: "Rēķiniet pašizmaksu un cenu bez nodokļiem, ko pārnesat uz klientu, piemēram, bez PVN. Citādi marža būs lielāka, nekā ir patiesībā.",
      },
    ],
    glosario: [
      { termino: "Peļņas marža", definicion: "Peļņa procentos no pārdošanas cenas." },
      { termino: "Uzcenojums", definicion: "Peļņa procentos no pašizmaksas." },
    ],
  };
};

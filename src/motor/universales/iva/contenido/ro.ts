import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Calculator TVA: ${ctx.nombrePais}`,
    title: tituloQueEntre(`Calculator TVA ${tasa}: ${ctx.nombrePais}`, `Calculator TVA: ${ctx.nombrePais}`, `Calculator TVA (${tasa})`),
    description: `Adăugați sau scoateți TVA de ${tasa} din orice preț, într-un singur pas: prețul fără TVA, valoarea taxei și totalul, exact la ban.`,
    intro: [
      `Cota standard de TVA folosită aici ${GRAMATICA.ro.para(ctx.nombrePais)} este ${tasa}.`,
      "Alegeți dacă adăugați TVA la un preț fără taxă sau o scoateți dintr-un preț care o include deja, apoi introduceți suma.",
    ],
    comoSeCalcula: [
      "Adăugare: TVA = preț fără TVA × cotă ÷ 100. Preț cu TVA = preț fără TVA + TVA.",
      "Scoatere: preț fără TVA = preț cu TVA ÷ (1 + cotă ÷ 100). Diferența este valoarea TVA.",
      "Dacă un produs sau un serviciu are cotă redusă, o puteți introduce la „Altă cotă de TVA”.",
    ],
    ejemplo: [
      `Ca să adăugați TVA la un preț de ${precio} fără taxă, înmulțiți-l cu cota de ${tasa} și adunați rezultatul la preț.`,
      `Ca să aflați cât TVA conține o sumă de ${precio}, împărțiți-o la 1 plus cota și scădeți rezultatul din sumă.`,
    ],
    faq: [
      {
        pregunta: "Cum se calculează TVA dintr-o sumă?",
        respuesta: "Împărțiți suma la 1 plus cota scrisă ca număr zecimal. Rezultatul este prețul fără TVA, iar diferența dintre cele două este taxa.",
      },
      {
        pregunta: "De ce nu se poate scădea pur și simplu procentul din total?",
        respuesta: "Pentru că TVA s-a calculat la prețul mai mic, cel fără taxă. Dacă scădeți procentul din total, scoateți prea mult.",
      },
      {
        pregunta: `Toate produsele au TVA de ${tasa}?`,
        respuesta: "Nu întotdeauna. Unele alimente, medicamente sau servicii au cotă redusă sau sunt scutite. În acest caz, folosiți „Altă cotă de TVA”.",
      },
    ],
    glosario: [
      { termino: "TVA", definicion: "Taxa pe valoarea adăugată. Se adaugă la prețul bunurilor și al serviciilor." },
      { termino: "Preț fără TVA", definicion: "Prețul înainte de adăugarea taxei, numit și preț net." },
    ],
  };
};

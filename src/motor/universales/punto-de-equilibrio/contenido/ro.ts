import { pluralRo } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const u = (n: number) => pluralRo(formatearNumero(ctx, n), "unitate", "unități");
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Calculator prag de rentabilitate",
    title: tituloQueEntre(`Prag de rentabilitate: ${ctx.nombrePais}`, "Calculator prag de rentabilitate", "Prag de rentabilitate"),
    description: "Aflați câte unități trebuie să vindeți și ce încasări vă trebuie în fiecare lună ca să acoperiți costurile și să atingeți profitul dorit.",
    intro: [
      "Pragul de rentabilitate este nivelul vânzărilor la care o afacere nici nu câștigă, nici nu pierde. Sub el aveți pierdere, peste el începe profitul.",
      "Introduceți costurile fixe, prețul și costul fiecărei unități. Calculatorul vă arată cât trebuie să vindeți ca să acoperiți costurile și ca să atingeți obiectivul.",
    ],
    comoSeCalcula: [
      "Marja de contribuție = preț − cost variabil pe unitate.",
      "Unități la pragul de rentabilitate = costuri fixe ÷ marja de contribuție, rotunjit în sus.",
      "Vânzări la pragul de rentabilitate = costuri fixe ÷ (marja de contribuție ÷ preț).",
      "Pentru un profit dorit, acesta se adaugă la costurile fixe și se face același calcul.",
    ],
    ejemplo: [
      `Cu costuri fixe de ${m(fijos)}, un preț de ${m(precio)} și un cost variabil de ${m(variable)}, fiecare vânzare lasă ${m(precio - variable)}.`,
      `Trebuie să vindeți ${u(base.unidades)} (${m(base.facturacion)}) ca să acoperiți costurile și ${u(meta.unidades)} ca să câștigați ${m(objetivo)} pe lună.`,
    ],
    faq: [
      {
        pregunta: "Ce sunt costurile fixe și costurile variabile?",
        respuesta: "Costurile fixe rămân la fel chiar dacă nu vindeți nimic: chirie, salarii fixe, utilități. Costurile variabile cresc cu fiecare vânzare: marfă, materiale, comisioane, transport.",
      },
      {
        pregunta: "Cum pot coborî pragul de rentabilitate?",
        respuesta: "Aveți trei pârghii: creșteți prețul, reduceți costul variabil pe unitate sau tăiați din costurile fixe. De obicei prețul are cel mai mare efect.",
      },
      {
        pregunta: "Se poate folosi și pentru o afacere cu servicii?",
        respuesta: "Da. O unitate poate fi o oră, o ședință sau un client pe lună. Drept cost variabil folosiți cât vă costă să livrați fiecare unitate.",
      },
    ],
    glosario: [
      { termino: "Prag de rentabilitate", definicion: "Nivelul vânzărilor la care încasările sunt egale cu costurile." },
      { termino: "Marjă de contribuție", definicion: "Ce lasă fiecare vânzare pentru acoperirea costurilor fixe." },
    ],
  };
};

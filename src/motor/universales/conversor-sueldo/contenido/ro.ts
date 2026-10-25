import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const anual = mensual * 12;
  return {
    h1: "Calculator salariu pe oră",
    title: tituloQueEntre(`Calculator salariu pe oră: ${ctx.nombrePais}`, "Calculator salariu pe oră", "Salariu pe oră"),
    description: "Transformați salariul între oră, zi, săptămână, jumătate de lună, lună și an, cu orele și săptămânile plătite reale.",
    intro: [
      "Cât înseamnă salariul dumneavoastră pe oră? Cât face pe an o ofertă plătită la oră? Introduceți o sumă, alegeți perioada și vă arătăm toate celelalte.",
      "Vă ajută să comparați oferte de muncă, să calculați orele suplimentare sau să vedeți cât valorează timpul dumneavoastră.",
    ],
    comoSeCalcula: [
      "Mai întâi totul se transformă într-o sumă anuală.",
      "Pe oră = anual ÷ (ore pe săptămână × săptămâni plătite).",
      "Pe zi = anual ÷ (zile pe săptămână × săptămâni plătite). Pe săptămână = anual ÷ săptămâni plătite.",
      "Pe lună = anual ÷ 12. Pe jumătate de lună = anual ÷ 24.",
    ],
    ejemplo: [
      `Un salariu de ${m(mensual)} pe lună, cu 40 de ore pe săptămână, înseamnă ${m(anual)} pe an și ${m(anual / 2080)} pe oră.`,
      `O ofertă de ${m(hora)} pe oră, cu normă întreagă, ajunge la ${m(hora * 2080)} pe an.`,
    ],
    faq: [
      {
        pregunta: "Câte ore de lucru are un an?",
        respuesta: `La 40 de ore pe săptămână și 52 de săptămâni plătite, ${formatearNumero(ctx, 2080)} de ore. De aceea o regulă rapidă este să înmulțiți tariful pe oră cu aproximativ ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "De ce salariul săptămânal înmulțit cu 4 nu dă salariul lunar?",
        respuesta: `Pentru că o lună are în medie ${formatearNumero(ctx, 52 / 12, 2)} săptămâni, nu 4. Ca să treceți de la săptămână la lună, înmulțiți cu 52 și împărțiți la 12.`,
      },
      {
        pregunta: "Include bonusuri sau impozite?",
        respuesta: "Nu. Transformă aceeași cifră între perioade. Dacă primiți bonusuri, adăugați-le separat când comparați ofertele.",
      },
    ],
    glosario: [
      { termino: "Salariu brut", definicion: "Salariul înainte de impozite și contribuții." },
      { termino: "Normă întreagă", definicion: "Programul complet de lucru, de obicei 40 de ore pe săptămână." },
    ],
  };
};

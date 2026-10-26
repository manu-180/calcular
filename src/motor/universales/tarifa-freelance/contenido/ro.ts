import { pluralRo } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Calculator tarif orar freelancer",
    title: tituloQueEntre(`Tarif orar freelancer: ${ctx.nombrePais}`, "Calculator tarif orar freelancer", "Tarif orar freelancer"),
    description: "Calculați tariful orar și pe zi ca freelancer din venitul dorit, cheltuieli, impozite, zilele libere și orele pe care le puteți factura.",
    intro: [
      "Cea mai frecventă greșeală a unui freelancer este să ia salariul pe care l-ar vrea ca angajat și să îl împartă la 160 de ore. Așa rămân pe dinafară impozitele, cheltuielile, concediul și toate orele care nu se pot factura.",
      "Calculatorul pornește de la cât doriți să vă rămână și vă arată cât trebuie să cereți ca să ajungeți acolo.",
    ],
    comoSeCalcula: [
      "Facturare necesară = venitul dorit ÷ (1 − cota de impozitare) + cheltuielile activității.",
      "Zile lucrate = 52 de săptămâni × zile pe săptămână − zile libere.",
      "Ore facturabile pe an = zile lucrate × ore facturabile pe zi.",
      "Tarif orar = facturarea necesară ÷ orele facturabile pe an.",
    ],
    ejemplo: [
      `Ca să vă rămână ${m(ingreso)} pe an, cu cheltuieli de ${m(gastos)} și impozite de 25%, trebuie să facturați ${m(r.facturado)}.`,
      `Cu 30 de zile libere și 25 de ore facturabile pe săptămână, rezultă ${pluralRo(formatearNumero(ctx, Math.round(r.horas)), "oră", "ore")} pe an: un tarif de ${m(r.hora)} pe oră sau ${m(r.dia)} pe zi.`,
    ],
    faq: [
      {
        pregunta: "Câte ore pe săptămână pot factura?",
        respuesta: "Mai puține decât lucrați. Căutarea clienților, e-mailurile, facturarea și învățatul cer timp pe care nu îl plătește nimeni. De obicei se facturează între 20 și 30 de ore din 40.",
      },
      {
        pregunta: "Este mai bine să cer tarif pe oră sau pe proiect?",
        respuesta: "Ambele variante funcționează. Chiar dacă stabiliți prețul pe proiect, estimați orele și înmulțiți-le cu acest tarif, ca să nu ieșiți în pierdere.",
      },
      {
        pregunta: "Ce cotă de impozitare să folosesc?",
        respuesta: "Depinde de țară și de forma în care vă desfășurați activitatea. Adunați impozitul pe venit și contribuțiile sociale. Dacă nu sunteți sigur, întrebați un contabil.",
      },
    ],
    glosario: [
      { termino: "Ore facturabile", definicion: "Orele de lucru pe care le facturați unui client." },
      { termino: "Venit net", definicion: "Ce rămâne după impozite și cheltuielile activității." },
    ],
  };
};

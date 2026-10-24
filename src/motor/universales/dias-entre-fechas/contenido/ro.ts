import { pluralRo } from "../../../i18n/plural";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Calculator zile între două date",
    title: tituloQueEntre(`Calculator zile între două date: ${ctx.nombrePais}`, "Calculator zile între două date"),
    description: "Aflați câte zile sunt între două date: zile calendaristice, săptămâni, luni și zile lucrătoare de luni până vineri.",
    intro: [
      "Alegeți data de început și data de sfârșit. Vedeți zilele calendaristice, aceeași perioadă în săptămâni și luni, precum și zilele lucrătoare.",
      "Vă ajută pentru termene, scadențe, concedii, sarcină sau o numărătoare inversă.",
    ],
    comoSeCalcula: [
      "Zilele calendaristice sunt toate zilele dintre cele două date. Prima zi se numără, ultima nu, dacă nu bifați opțiunea.",
      "Zilele lucrătoare sunt zilele de luni până vineri din aceeași perioadă. Sărbătorile legale nu se scad.",
      "Anii bisecți se numără cu 29 februarie.",
    ],
    ejemplo: [`De la ${f(desde)} până la ${f(hasta)} sunt ${pluralRo(dias, "zi calendaristică", "zile calendaristice")}.`, `Dintre acestea, ${pluralRo(habiles, "zi cade", "zile cad")} de luni până vineri.`],
    faq: [
      {
        pregunta: "Se numără prima zi sau ultima?",
        respuesta: "Implicit se numără prima zi și nu ultima, ca atunci când scădeți două date. Dacă aveți nevoie de amândouă, bifați „Includeți și ziua de sfârșit”.",
      },
      {
        pregunta: "Zilele lucrătoare exclud sărbătorile legale?",
        respuesta: "Nu. Se numără de luni până vineri. Sărbătorile diferă de la o țară la alta și de la un an la altul, așa că scădeți-le separat.",
      },
      {
        pregunta: "Câte zile are un an?",
        respuesta: "365 de zile, sau 366 în anii bisecți. De aceea, aceleași două date pot fi la un număr diferit de zile distanță în ani diferiți.",
      },
    ],
    glosario: [
      { termino: "Zile calendaristice", definicion: "Toate zilele din calendar, inclusiv weekendurile și sărbătorile." },
      { termino: "Zile lucrătoare", definicion: "În acest calculator, zilele de luni până vineri." },
    ],
  };
};

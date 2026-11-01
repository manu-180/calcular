import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Laisvai samdomo darbo valandinio įkainio skaičiuoklė",
    title: tituloQueEntre(
      `Valandinio įkainio skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Kiek imti už valandą: įkainio skaičiuoklė",
      "Valandinio įkainio skaičiuoklė",
    ),
    description:
      "Apskaičiuokite laisvai samdomo darbo valandinį ir dienos įkainį pagal norimas pajamas, išlaidas, mokesčius, laisvas dienas ir apmokamas valandas.",
    intro: [
      "Dažniausia laisvai samdomo darbo klaida yra paimti norimą samdomo darbo atlyginimą ir padalyti iš 160 valandų. Taip pamirštami mokesčiai, išlaidos, atostogos ir visos valandos, už kurias niekas nemoka.",
      "Ši skaičiuoklė remiasi grynosiomis pajamomis, kurias norite turėti, ir parodo, kiek reikia imti iš klientų.",
    ],
    comoSeCalcula: [
      "Reikalingos pajamos = grynosios pajamos ÷ (1 − mokesčių norma) + veiklos išlaidos.",
      "Darbo dienos = 52 savaitės × darbo dienos per savaitę − laisvos dienos.",
      "Apmokamos valandos per metus = darbo dienos × apmokamos valandos per dieną.",
      "Valandinis įkainis = reikalingos pajamos ÷ apmokamos valandos per metus.",
    ],
    ejemplo: [
      `Kad grynųjų pajamų per metus būtų ${m(ingreso)}, kai išlaidos yra ${m(gastos)}, o mokesčiai 25 %, reikia uždirbti ${m(r.facturado)}.`,
      `Kai laisvų dienų yra 30, o apmokamų valandų per savaitę 25, per metus susidaro ${formatearNumero(ctx, horas)} ${formaLt(horas, "valanda", "valandos", "valandų")}: įkainis yra ${m(r.hora)} už valandą arba ${m(r.dia)} už dieną.`,
    ],
    faq: [
      {
        pregunta: "Kiek valandų per savaitę gali būti apmokama?",
        respuesta:
          "Mažiau, nei dirbate. Klientų paieška, el. laiškai, sąskaitų išrašymas ir mokymasis užima laiką, už kurį niekas nesumoka. Paprastai apmokama nuo 20 iki 30 valandų iš 40.",
      },
      {
        pregunta: "Ar imti mokestį už valandą, ar už projektą?",
        respuesta: "Tinka abu būdai. Net jei įkainojate visą projektą, įvertinkite valandų skaičių ir padauginkite jį iš šio įkainio, kad neliktumėte nuostolyje.",
      },
      {
        pregunta: "Kokią mokesčių normą naudoti?",
        respuesta:
          "Priklauso nuo šalies ir veiklos formos. Sudėkite pajamų mokestį ir socialinio bei sveikatos draudimo įmokas. Jei abejojate, pasiteiraukite buhalterio.",
      },
    ],
    glosario: [
      { termino: "Apmokamos valandos", definicion: "Darbo valandos, už kurias išrašote sąskaitą klientui." },
      { termino: "Grynosios pajamos", definicion: "Kas lieka sumokėjus mokesčius ir atskaičius veiklos išlaidas." },
    ],
  };
};

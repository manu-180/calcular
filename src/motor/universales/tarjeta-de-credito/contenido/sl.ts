import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mesece = (n: number) => `${formatearNumero(ctx, n)} ${formaSl(n, "mesec", "meseca", "mesece", "mesecev")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Izračun odplačila kreditne kartice",
    title: tituloQueEntre(
      `Odplačilo kreditne kartice: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Odplačilo kreditne kartice: izračun obresti",
      "Izračun odplačila kreditne kartice",
    ),
    description: "Ugotovite, koliko mesecev boste odplačevali dolg na kreditni kartici in koliko boste plačali obresti, s fiksnim ali minimalnim mesečnim plačilom.",
    intro: [
      "Kreditna kartica je pogosto vaš najdražji dolg. Če poravnate samo minimalno plačilo, odplačevanje traja leta, obresti pa se kopičijo.",
      "Vnesite dolg, letno obrestno mero in koliko lahko plačate na mesec. Prikazali bomo, kdaj bo dolg odplačan, koliko boste plačali obresti in načrt po mesecih.",
    ],
    comoSeCalcula: [
      "Vsak mesec se prištejejo obresti: preostali dolg × letna obrestna mera ÷ 12.",
      "Nato se odšteje plačilo. Pri minimalnem plačilu je to odstotek dolga, vendar najmanj določen znesek.",
      "Postopek se ponavlja, dokler dolg ne pade na nič. Če plačilo ni višje od obresti, se dolg nikoli ne zmanjša.",
    ],
    ejemplo: [
      `Pri dolgu v višini ${m(saldo)}, obrestni meri 22 % na leto in plačilu ${m(fijo)} na mesec odplačevanje traja ${mesece(conFijo.meses)}, za obresti pa plačate ${m(conFijo.intereses)}.`,
      `Če vsak mesec poravnate samo minimalno plačilo 3 %, odplačevanje traja ${mesece(conMinimo.meses)}, obresti pa narastejo na ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Kaj se zgodi, če poravnam samo minimalno plačilo?",
        respuesta:
          "Minimalno plačilo se zmanjšuje skupaj z dolgom, zato vsak mesec plačate manj, odplačevanje pa se vleče leta. Če lahko, plačujte višji fiksni znesek, četudi le malo višji.",
      },
      {
        pregunta: "Ali se splača prenesti dolg s kartice na gotovinski kredit?",
        respuesta:
          "Če je obrestna mera kredita občutno nižja od tiste na kartici, največkrat da. Primerjajte skupni strošek obeh možnosti z vsemi nadomestili, najbolje po EOM.",
      },
      {
        pregunta: "Katero kartico odplačati najprej?",
        respuesta: "Na vseh karticah plačujte minimum, preostanek pa namenite tisti z najvišjo obrestno mero. Tako skupaj plačate najmanj obresti.",
      },
    ],
    glosario: [
      { termino: "Minimalno plačilo", definicion: "Najmanjši znesek, ki ga lahko plačate na mesec brez kazni. Z njim se dolg zmanjšuje zelo počasi." },
      { termino: "Letna obrestna mera", definicion: "Mera, ki jo kartica na leto zaračuna za neodplačani dolg." },
      { termino: "Brezobrestno obdobje", definicion: "Čas, v katerem za nakupe ne plačate obresti, če ves dolg poravnate pravočasno." },
    ],
  };
};

import { GRAMATICA } from "../../../i18n/gramatica";
import { formaBs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Kalkulator satnice za freelancere",
    title: tituloQueEntre(
      `Satnica za freelancere: kalkulator ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Koliko naplatiti sat rada: kalkulator satnice",
      "Kalkulator satnice za freelancere",
    ),
    description:
      "Izračunajte cijenu sata i dana rada kao freelancer, prema tome koliko želite zaraditi, uz troškove, poreze, slobodne dane i sate za naplatu.",
    intro: [
      "Najčešća je greška freelancera uzeti platu koju bi željeli kao zaposlenici i podijeliti je na 160 sati. Tu nedostaju porezi, troškovi, odmor i svi sati koji se ne mogu naplatiti.",
      "Ovaj kalkulator polazi od toga koliko želite neto i kaže vam koliko trebate naplaćivati.",
    ],
    comoSeCalcula: [
      "Potreban promet = neto prihod ÷ (1 − stopa poreza) + troškovi poslovanja.",
      "Radni dani = 52 sedmice × radni dani sedmično − slobodni dani.",
      "Sati za naplatu godišnje = radni dani × sati za naplatu dnevno.",
      "Cijena sata = potreban promet ÷ sati za naplatu godišnje.",
    ],
    ejemplo: [
      `Da biste imali neto ${m(ingreso)} godišnje, uz troškove od ${m(gastos)} i poreze od 25 %, trebate fakturisati ${m(r.facturado)}.`,
      `Uz 30 slobodnih dana i 25 sati za naplatu sedmično, to je ${formatearNumero(ctx, horas)} ${formaBs(horas, "sat", "sata", "sati")} godišnje: cijena od ${m(r.hora)} po satu ili ${m(r.dia)} po danu.`,
    ],
    faq: [
      {
        pregunta: "Koliko sati sedmično mogu naplatiti?",
        respuesta:
          "Manje nego što radite. Traženje klijenata, e-pošta, fakturisanje i učenje oduzimaju vrijeme koje vam niko ne plaća. Obično je to 20 do 30 sati za naplatu od 40.",
      },
      {
        pregunta: "Naplaćivati po satu ili po projektu?",
        respuesta: "Oba načina funkcionišju. I kada dajete cijenu za cijeli projekt, procijenite broj sati i pomnožite ga ovom satnicom, da ne biste radili u gubitku.",
      },
      {
        pregunta: "Koju stopu poreza koristiti?",
        respuesta:
          "Ovisi o zemlji i obliku poslovanja. Saberite porez na dohodak i doprinose za penziono i zdravstveno osiguranje. Ako niste sigurni, pitajte računovođu.",
      },
    ],
    glosario: [
      { termino: "Sati za naplatu", definicion: "Radni sati koje naplaćujete klijentu." },
      { termino: "Neto prihod", definicion: "Ono što vam ostaje nakon poreza i troškova poslovanja." },
    ],
  };
};

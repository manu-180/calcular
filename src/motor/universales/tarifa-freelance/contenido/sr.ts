import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Kalkulator satnice za frilensere",
    title: tituloQueEntre(
      `Satnica za frilensere: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Koliko naplatiti sat rada: kalkulator satnice",
      "Kalkulator satnice za frilensere",
    ),
    description:
      "Izračunajte cenu sata i dana rada kao frilenser, prema tome koliko želite da zaradite, uz troškove, poreze, slobodne dane i sate za naplatu.",
    intro: [
      "Najčešća greška frilensera je da uzme platu koju bi želeo kao zaposleni i podeli je sa 160 sati. Tu nedostaju porezi, troškovi, odmor i svi sati koji se ne mogu naplatiti.",
      "Ovaj kalkulator polazi od toga koliko želite neto i kaže vam koliko treba da naplaćujete.",
    ],
    comoSeCalcula: [
      "Potreban promet = neto prihod ÷ (1 − stopa poreza) + troškovi poslovanja.",
      "Radni dani = 52 nedelje × radni dani nedeljno − slobodni dani.",
      "Sati za naplatu godišnje = radni dani × sati za naplatu dnevno.",
      "Cena sata = potreban promet ÷ sati za naplatu godišnje.",
    ],
    ejemplo: [
      `Da biste imali neto ${m(ingreso)} godišnje, uz troškove od ${m(gastos)} i poreze od 25%, treba da fakturišete ${m(r.facturado)}.`,
      `Uz 30 slobodnih dana i 25 sati za naplatu nedeljno, to je ${formatearNumero(ctx, horas)} ${formaSr(horas, "sat", "sata", "sati")} godišnje: cena od ${m(r.hora)} po satu ili ${m(r.dia)} po danu.`,
    ],
    faq: [
      {
        pregunta: "Koliko sati nedeljno mogu da naplatim?",
        respuesta:
          "Manje nego što radite. Traženje klijenata, imejlovi, fakturisanje i učenje oduzimaju vreme koje vam niko ne plaća. Obično je to 20 do 30 sati za naplatu od 40.",
      },
      {
        pregunta: "Da li da naplaćujem po satu ili po projektu?",
        respuesta: "Oba načina funkcionišu. I kada dajete cenu za ceo projekat, procenite broj sati i pomnožite ga ovom satnicom, da ne biste radili u gubitku.",
      },
      {
        pregunta: "Koju stopu poreza da koristim?",
        respuesta:
          "Zavisi od zemlje i od oblika poslovanja. Saberite porez na dohodak i doprinose za penzijsko i zdravstveno osiguranje. Ako niste sigurni, pitajte knjigovođu.",
      },
    ],
    glosario: [
      { termino: "Sati za naplatu", definicion: "Radni sati koje naplaćujete klijentu." },
      { termino: "Neto prihod", definicion: "Ono što vam ostaje posle poreza i troškova poslovanja." },
    ],
  };
};

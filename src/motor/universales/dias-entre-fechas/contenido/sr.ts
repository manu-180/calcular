import { formaSr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, habilesEntre } from "../../comun/fechas";
import { fechaGenitivSr } from "../textos/sr";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaGenitivSr(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Broj dana između dva datuma",
    title: tituloQueEntre(`Broj dana između dva datuma: kalkulator (${ctx.nombrePais})`, "Broj dana između dva datuma: kalkulator", "Broj dana između datuma"),
    description: "Izračunajte koliko dana ima između dva datuma: kalendarski dani, nedelje, meseci i radni dani od ponedeljka do petka.",
    intro: [
      "Izaberite početni i krajnji datum. Dobijate broj kalendarskih dana, isti period u nedeljama i mesecima i broj radnih dana.",
      "Korisno za rokove, termine, godišnji odmor, trudnoću ili odbrojavanje do važnog dana.",
    ],
    comoSeCalcula: [
      "Kalendarski dani obuhvataju svaki dan između dva datuma. Prvi dan se računa, a poslednji ne, osim ako označite tu opciju.",
      "Radni dani obuhvataju ponedeljke, utorke, srede, četvrtke i petke u istom periodu. Praznici se ne oduzimaju.",
      "Prestupne godine se računaju zajedno sa 29. februarom.",
    ],
    ejemplo: [
      `Od ${f(desde)} do ${f(hasta)} ima ${n(dias)} ${formaSr(dias, "kalendarski dan", "kalendarska dana", "kalendarskih dana")}.`,
      `Od toga, broj dana od ponedeljka do petka: ${n(habiles)}.`,
    ],
    faq: [
      {
        pregunta: "Da li se računa prvi ili poslednji dan?",
        respuesta: "Podrazumevano se računa prvi dan, a poslednji ne, kao kada se jedan datum oduzme od drugog. Ako su vam potrebna oba, označite „Računa se i poslednji dan“.",
      },
      {
        pregunta: "Da li se praznici oduzimaju od radnih dana?",
        respuesta: "Ne. Računaju se dani od ponedeljka do petka. Praznici se razlikuju po zemlji, regionu i godini, pa ih oduzmite posebno.",
      },
      {
        pregunta: "Koliko dana ima godina?",
        respuesta: "365, a prestupna 366. Zato između istih datuma u različitim godinama može da izađe drugačiji broj dana.",
      },
    ],
    glosario: [
      { termino: "Kalendarski dani", definicion: "Svi dani u kalendaru, uključujući vikende i praznike." },
      { termino: "Radni dani", definicion: "U ovom kalkulatoru, dani od ponedeljka do petka." },
    ],
  };
};

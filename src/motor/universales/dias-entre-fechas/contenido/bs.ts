import { formaBs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, habilesEntre } from "../../comun/fechas";
import { fechaGenitivBs } from "../textos/bs";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaGenitivBs(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Broj dana između dva datuma",
    title: tituloQueEntre(`Broj dana između dva datuma: kalkulator (${ctx.nombrePais})`, "Broj dana između dva datuma: kalkulator", "Broj dana između datuma"),
    description: "Izračunajte koliko dana ima između dva datuma: kalendarski dani, sedmice, mjeseci i radni dani od ponedjeljka do petka.",
    intro: [
      "Izaberite početni i završni datum. Dobijate broj kalendarskih dana, isti period u sedmicama i mjesecima te broj radnih dana.",
      "Korisno za rokove, termine, godišnji odmor, trudnoću ili odbrojavanje do važnog dana.",
    ],
    comoSeCalcula: [
      "Kalendarski dani obuhvataju svaki dan između dva datuma. Prvi dan se računa, a posljednji ne, osim ako označite tu opciju.",
      "Radni dani obuhvataju ponedjeljke, utorke, srijede, četvrtke i petke u istom periodu. Praznici se ne oduzimaju.",
      "Prijestupne godine računaju se zajedno s 29. februara.",
    ],
    ejemplo: [
      `Od ${f(desde)} do ${f(hasta)} ima ${n(dias)} ${formaBs(dias, "kalendarski dan", "kalendarska dana", "kalendarskih dana")}.`,
      `Od toga, broj dana od ponedjeljka do petka: ${n(habiles)}.`,
    ],
    faq: [
      {
        pregunta: "Računa li se prvi ili posljednji dan?",
        respuesta: "Prema zadanim postavkama računa se prvi dan, a posljednji ne, kao kada se jedan datum oduzme od drugog. Ako su vam potrebna oba, označite „Računa se i posljednji dan”.",
      },
      {
        pregunta: "Oduzimaju li se praznici od radnih dana?",
        respuesta: "Ne. Računaju se dani od ponedjeljka do petka. Praznici se razlikuju po državi, regiji i godini, pa ih oduzmite zasebno.",
      },
      {
        pregunta: "Koliko dana ima godina?",
        respuesta: "365, a prijestupna 366. Zato između istih datuma u različitim godinama može izaći drugačiji broj dana.",
      },
    ],
    glosario: [
      { termino: "Kalendarski dani", definicion: "Svi dani u kalendaru, uključujući vikende i praznike." },
      { termino: "Radni dani", definicion: "U ovom kalkulatoru, dani od ponedjeljka do petka." },
    ],
  };
};

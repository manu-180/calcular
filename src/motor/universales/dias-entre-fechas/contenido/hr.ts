import { formaHr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, habilesEntre } from "../../comun/fechas";
import { fechaGenitivHr } from "../textos/hr";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaGenitivHr(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Broj dana između dva datuma",
    title: tituloQueEntre(`Broj dana između dva datuma: kalkulator (${ctx.nombrePais})`, "Broj dana između dva datuma: kalkulator", "Broj dana između datuma"),
    description: "Izračunajte koliko dana ima između dva datuma: kalendarski dani, tjedni, mjeseci i radni dani od ponedjeljka do petka.",
    intro: [
      "Odaberite početni i završni datum. Dobivate broj kalendarskih dana, isto razdoblje u tjednima i mjesecima te broj radnih dana.",
      "Korisno za rokove, termine, godišnji odmor, trudnoću ili odbrojavanje do važnog dana.",
    ],
    comoSeCalcula: [
      "Kalendarski dani obuhvaćaju svaki dan između dva datuma. Prvi dan se računa, a posljednji ne, osim ako označite tu opciju.",
      "Radni dani obuhvaćaju ponedjeljke, utorke, srijede, četvrtke i petke u istom razdoblju. Blagdani se ne oduzimaju.",
      "Prijestupne godine računaju se zajedno s 29. veljače.",
    ],
    ejemplo: [
      `Od ${f(desde)} do ${f(hasta)} ima ${n(dias)} ${formaHr(dias, "kalendarski dan", "kalendarska dana", "kalendarskih dana")}.`,
      `Od toga, broj dana od ponedjeljka do petka: ${n(habiles)}.`,
    ],
    faq: [
      {
        pregunta: "Računa li se prvi ili posljednji dan?",
        respuesta: "Prema zadanim postavkama računa se prvi dan, a posljednji ne, kao kada se jedan datum oduzme od drugog. Ako su vam potrebna oba, označite „Računa se i posljednji dan”.",
      },
      {
        pregunta: "Oduzimaju li se blagdani od radnih dana?",
        respuesta: "Ne. Računaju se dani od ponedjeljka do petka. Blagdani se razlikuju po državi, regiji i godini, pa ih oduzmite zasebno.",
      },
      {
        pregunta: "Koliko dana ima godina?",
        respuesta: "365, a prijestupna 366. Zato između istih datuma u različitim godinama može izaći drugačiji broj dana.",
      },
    ],
    glosario: [
      { termino: "Kalendarski dani", definicion: "Svi dani u kalendaru, uključujući vikende i blagdane." },
      { termino: "Radni dani", definicion: "U ovom kalkulatoru, dani od ponedjeljka do petka." },
    ],
  };
};

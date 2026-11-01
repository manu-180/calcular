import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Število dni med dvema datumoma",
    title: tituloQueEntre(`Število dni med dvema datumoma: izračun (${ctx.nombrePais})`, "Število dni med dvema datumoma: izračun", "Dnevi med datumoma"),
    description: "Izračunajte, koliko dni je med dvema datumoma: koledarski dnevi, tedni, meseci in delovni dnevi od ponedeljka do petka.",
    intro: [
      "Izberite začetni in končni datum. Dobili boste število koledarskih dni, isto obdobje v tednih in mesecih ter število delovnih dni.",
      "Uporabno za roke, termine, dopust, nosečnost ali odštevanje do pomembnega dne.",
    ],
    comoSeCalcula: [
      "Koledarski dnevi zajemajo vsak dan med datumoma. Prvi dan se šteje, zadnji pa ne, razen če označite to možnost.",
      "Delovni dnevi zajemajo ponedeljke, torke, srede, četrtke in petke v istem obdobju. Praznikov ne odštevamo.",
      "Prestopna leta so upoštevana, skupaj z 29. februarjem.",
    ],
    ejemplo: [
      `Začetni datum: ${f(desde)}. Končni datum: ${f(hasta)}. Število koledarskih dni med njima: ${n(dias)}.`,
      `Od tega je število dni od ponedeljka do petka: ${n(habiles)}.`,
    ],
    faq: [
      {
        pregunta: "Ali se šteje prvi ali zadnji dan?",
        respuesta: "Privzeto se šteje prvi dan, zadnji pa ne, kot pri odštevanju enega datuma od drugega. Če potrebujete oba, označite „Vključno z zadnjim dnem“.",
      },
      {
        pregunta: "Ali se prazniki odštejejo od delovnih dni?",
        respuesta: "Ne. Šteti so dnevi od ponedeljka do petka. Prazniki se razlikujejo po državah, regijah in letih, zato jih odštejte posebej.",
      },
      {
        pregunta: "Koliko dni ima leto?",
        respuesta: "365, prestopno pa 366. Zato se lahko število dni med enakima datumoma v različnih letih razlikuje.",
      },
    ],
    glosario: [
      { termino: "Koledarski dnevi", definicion: "Vsi dnevi v koledarju, tudi vikendi in prazniki." },
      { termino: "Delovni dnevi", definicion: "V tem izračunu dnevi od ponedeljka do petka." },
    ],
  };
};

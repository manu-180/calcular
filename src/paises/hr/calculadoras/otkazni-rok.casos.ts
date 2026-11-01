import { definirCasos } from "@/motor/calculo";
import calc from "./otkazni-rok";

const U = "https://narodne-novine.nn.hr/clanci/sluzbeni/2014_07_93_1872.html" as const;
const c = (nombre: string, detalle: string, godine: number, dob: number, skrivljeno: boolean, rok: string) => ({ nombre, origen: { tipo: "recalculado" as const, url: U, detalle }, fecha: "2026-11-01" as const, entrada: { godine, dob, skrivljeno, mirovina: false }, esperado: { rok } });

export default definirCasos(calc, [
  { nombre: "65 godina života i 15 godina staža", origen: { tipo: "recalculado", url: "https://narodne-novine.nn.hr/clanci/sluzbeni/2022_12_151_2343.html", detalle: "Čl. 122. st. 8. (NN 151/2022): bez otkaznog roka." }, fecha: "2026-11-01", entrada: { godine: 20, dob: 66, skrivljeno: false, mirovina: true }, esperado: { rok: "Nema otkaznog roka" } },
  c("Manje od godine", "Čl. 122. st. 1.: dva tjedna.", 0, 30, false, "2 tjedna"),
  c("Godina dana", "Čl. 122.: mjesec dana.", 1, 30, false, "1 mjesec"),
  c("Dvije godine", "Čl. 122.: mjesec i dva tjedna.", 2, 30, false, "1 mjesec i 2 tjedna"),
  c("Pet godina", "Čl. 122.: dva mjeseca.", 5, 30, false, "2 mjeseca"),
  c("Deset godina", "Čl. 122.: dva mjeseca i dva tjedna.", 10, 40, false, "2 mjeseca i 2 tjedna"),
  c("Dvadeset godina", "Čl. 122.: tri mjeseca.", 20, 45, false, "3 mjeseca"),
  c("Dvadeset godina, dob 50", "Čl. 122. st. 2.: plus dva tjedna.", 20, 50, false, "3 mjeseca i 2 tjedna"),
  c("Dvadeset godina, dob 55", "Čl. 122. st. 2.: plus mjesec dana.", 20, 55, false, "4 mjeseca"),
  c("Skrivljeno, šest godina", "Čl. 122. st. 3.: polovica od dva mjeseca.", 6, 40, true, "1 mjesec"),
  c("Skrivljeno, manje od godine", "Polovica od dva tjedna.", 0, 30, true, "1 tjedan"),
]);

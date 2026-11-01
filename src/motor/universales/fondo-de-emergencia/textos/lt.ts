import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosLt: TextosUi<UiFondoDeEmergencia> = {
  slug: "finansinis-rezervas",
  ui: () => ({
    gastos: "Būtinos mėnesio išlaidos",
    gastosAyuda: "Tai, ko negalite nustoti mokėti: būstas, maistas, komunaliniai mokesčiai, transportas, sveikata ir paskolų įmokos.",
    meses: "Kelių mėnesių išlaidoms",
    mesesAyuda: "Kai pajamos stabilios, nuo 3 iki 6 mėnesių. Daugiau, jei pajamos svyruoja arba namų ūkis turi tik vieną pajamų šaltinį.",
    actual: "Kiek jau sutaupyta (neprivaloma)",
    aporte: "Kiek galite atidėti per mėnesį (neprivaloma)",
    meta: "Rekomenduojamas finansinis rezervas",
    falta: "Dar reikia sutaupyti",
    mesesParaLlegar: "Mėnesiai iki tikslo",
    cobertura: "Kelių mėnesių išlaidoms šiandien pakaktų santaupų",
    errorGastos: "Įveskite būtinas mėnesio išlaidas.",
    yaCubierto: "Finansinį rezervą jau turite. Tai, ką atidėsite toliau, galite skirti kitiems tikslams.",
    sinAporte: "Įveskite, kiek galite atidėti per mėnesį, ir parodysime, kiek laiko tai užtruks.",
    observacionDonde: "Šiuos pinigus laikykite atskiroje sąskaitoje, iš kurios galite juos paimti tą pačią dieną ir kurioje jie nepraranda vertės, pavyzdžiui, taupomojoje sąskaitoje.",
  }),
};

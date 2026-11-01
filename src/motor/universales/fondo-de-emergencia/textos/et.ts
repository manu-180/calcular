import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosEt: TextosUi<UiFondoDeEmergencia> = {
  slug: "hadaabifond",
  ui: () => ({
    gastos: "Hädavajalikud kulud kuus",
    gastosAyuda: "Kulud, mida sa lõpetada ei saa: eluase, toit, elekter, liikumine, tervis ja laenumaksed.",
    meses: "Mitu kuud fond peab vastu pidama",
    mesesAyuda: "3-6 kuud, kui su sissetulek on stabiilne. Rohkem, kui sissetulek kõigub või leibkonnas on ainult üks teenija.",
    actual: "Juba säästetud summa (valikuline)",
    aporte: "Kui palju suudad kuus säästa (valikuline)",
    meta: "Soovitatav hädaabifond",
    falta: "Veel säästa",
    mesesParaLlegar: "Kuude arv, kuni fond on koos",
    cobertura: "Mitu kuud praegused säästud vastu peavad",
    errorGastos: "Sisesta oma hädavajalikud kulud ühe kuu kohta.",
    yaCubierto: "Sinu fond on juba koos. Edaspidi saad säästa muude eesmärkide jaoks.",
    sinAporte: "Sisesta, kui palju suudad kuus säästa, siis näed, kui kaua säästmine kestab.",
    observacionDonde: "Hoia fondi eraldi kontol, kust saad raha kätte samal päeval ja mille väärtus ei kõigu, näiteks säästukontol.",
  }),
};

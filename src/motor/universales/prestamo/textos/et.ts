import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosEt: TextosUi<UiPrestamo> = {
  slug: "laenukalkulaator",
  ui: () => ({
    monto: "Laenusumma",
    tasa: "Aastaintress (%)",
    tasaAyuda: "Pakkumises toodud nominaalne aastaintress. Tasusid see ei sisalda.",
    meses: "Laenuperiood kuudes",
    extra: "Lisamakse kuus (valikuline)",
    extraAyuda: "Summa, mille maksad iga kuu kuumaksele lisaks, et laen kiiremini tagasi maksta. Kogu summa läheb põhiosa vähendamiseks.",
    cuota: "Kuumakse",
    intereses: "Intressid kokku",
    total: "Maksad kokku",
    mesesReales: "Kuude arv laenu tagasimaksmiseni lisamaksega",
    ahorro: "Säästad intressidelt",
    tabla: "Maksegraafik",
    colMes: "Kuu",
    colPago: "Makse",
    colInteres: "Intress",
    colCapital: "Põhiosa",
    colSaldo: "Laenujääk",
    errorMonto: "Sisesta summa, mis on suurem kui null.",
    observacionCostos: "Kuumakse ei sisalda kindlustust, tasusid ega makse, mida laenuandja võib lisada. Küsi laenu kogukulu enne, kui lepingu allkirjastad.",
    observacionExtra: (meses, ahorro) => `Lisamaksega on laen tagasi makstud ${meses} kuu jooksul ja intressidelt säästad ${ahorro}.`,
  }),
};

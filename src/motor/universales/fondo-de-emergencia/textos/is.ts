import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosIs: TextosUi<UiFondoDeEmergencia> = {
  slug: "varasjodur",
  ui: () => ({
    gastos: "Nauðsynleg útgjöld á mánuði",
    gastosAyuda: "Það sem þú getur ekki hætt að greiða: húsnæði, mat, rafmagn, ferðir, heilbrigðisþjónustu og afborganir af lánum.",
    meses: "Hve marga mánuði varasjóðurinn á að duga",
    mesesAyuda: "3 til 6 mánuði ef tekjurnar eru stöðugar. Lengur ef tekjurnar sveiflast eða ef aðeins ein fyrirvinna er á heimilinu.",
    actual: "Það sem þú hefur þegar sparað (valfrjálst)",
    aporte: "Það sem þú getur lagt fyrir á mánuði (valfrjálst)",
    meta: "Ráðlagður varasjóður",
    falta: "Eftir að spara",
    mesesParaLlegar: "Mánuðir þar til varasjóðurinn er tilbúinn",
    cobertura: "Mánuðir sem sparnaðurinn dugar í dag",
    errorGastos: "Sláðu inn nauðsynleg útgjöld þín á mánuði.",
    yaCubierto: "Varasjóðurinn er tilbúinn. Það sem þú sparar héðan í frá getur farið í önnur markmið.",
    sinAporte: "Sláðu inn hve mikið þú getur lagt fyrir á mánuði og þá sérðu hve langan tíma þetta tekur.",
    observacionDonde: "Geymdu varasjóðinn á sérstökum reikningi sem þú getur tekið út af samdægurs og sem sveiflast ekki í verði, til dæmis sparireikningi.",
  }),
};

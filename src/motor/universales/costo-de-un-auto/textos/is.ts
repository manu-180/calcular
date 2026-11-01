import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosIs: TextosUi<UiCostoDeUnAuto> = {
  slug: "kostnadur-vid-bil",
  ui: () => ({
    precio: "Verðmæti bílsins",
    precioAyuda: "Það sem þú borgaðir, eða hvað bíllinn er virði í dag ef þú hefur átt hann um tíma.",
    depreciacion: "Verðrýrnun á ári (%)",
    depreciacionAyuda: "Nýr bíll tapar 15% til 25% af verðgildi sínu á fyrsta árinu. Notaður bíll tapar minna.",
    cuota: "Mánaðarleg afborgun af bílaláni (valfrjálst)",
    cuotaAyuda: "Aðeins til að sýna hvað fer út af reikningnum í hverjum mánuði. Hún bætist ekki við raunkostnaðinn.",
    seguro: "Tryggingar á mánuði",
    distanciaKm: "Kílómetrar á mánuði",
    distanciaMi: "Mílur á mánuði",
    consumoL100: "Eldsneytiseyðsla (lítrar á 100 km)",
    consumoMpg: "Eldsneytiseyðsla (mílur á gallon)",
    precioLitro: "Eldsneytisverð á lítra",
    precioGalon: "Eldsneytisverð á gallon",
    mantenimiento: "Viðhald á mánuði",
    mantenimientoAyuda: "Þjónustuskoðun, dekk, viðgerðir og þvottur, að meðaltali á mánuði.",
    estacionamiento: "Bílastæði á mánuði (valfrjálst)",
    otros: "Skattar, gjöld og annar kostnaður á mánuði (valfrjálst)",
    otrosAyuda: "Bifreiðagjöld, skoðun, veggjöld og sektir, að meðaltali á mánuði.",
    costoMensual: "Raunkostnaður á mánuði",
    costoAnual: "Raunkostnaður á ári",
    porKm: "Kostnaður á kílómetra",
    porMilla: "Kostnaður á mílu",
    combustible: "Eldsneyti á mánuði",
    depreciacionMensual: "Verðrýrnun á mánuði",
    gastoBolsillo: "Það sem fer út af reikningnum í hverjum mánuði",
    errorConsumo: "Sláðu inn eldsneytiseyðslu bílsins svo hægt sé að reikna eldsneytiskostnaðinn.",
    observacionCuota:
      "Afborgun af láninu er ekki hluti af raunkostnaðinum, því hluti hennar greiðir bílinn sjálfan og hann er þegar talinn með sem verðrýrnun. Vextirnir af láninu eru aukakostnaður þar ofan á.",
  }),
};

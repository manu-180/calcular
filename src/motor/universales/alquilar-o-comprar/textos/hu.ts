import { conNeveloHu } from "../../../i18n/gramatica";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

export const textosHu: TextosUi<UiAlquilarOComprar> = {
  slug: "berlet-vagy-vasarlas",
  ui: () => ({
    precio: "A lakás vételára",
    entrada: "Önerő (a vételár százalékában)",
    gastosCompra: "Vásárlási költségek (a vételár százalékában)",
    gastosCompraAyuda: "Illeték, ügyvédi díj, értékbecslés és ingatlanközvetítői jutalék.",
    tasa: "Lakáshitel kamata (évi %)",
    aniosHipoteca: "A hitel futamideje (év)",
    alquiler: "Egy hasonló lakás havi bérleti díja",
    aumentoAlquiler: "A bérleti díj éves emelkedése (%)",
    gastosPropietario: "Tulajdonosi költségek évente (az érték százalékában)",
    gastosPropietarioAyuda: "Karbantartás, felújítás, ingatlanadó és lakásbiztosítás. Általában 1 és 2% között van.",
    revalorizacion: "A lakás értékének éves növekedése (%)",
    rendimiento: "Egy másik befektetés hozama (évi %)",
    rendimientoAyuda: "Ennyit hozna az önerő, ha vásárlás helyett befektetnéd.",
    horizonte: "Hány évre hasonlítsunk",
    veredicto: "Eredmény",
    patrimonioComprar: "Vagyonod a végén, ha veszel",
    patrimonioAlquilar: "Vagyonod a végén, ha bérelsz",
    diferencia: "Különbség",
    anioDesde: "Ettől az évtől éri meg jobban a vásárlás",
    pagadoAlquilando: "Kifizetett bérleti díj összesen",
    pagadoComprando: "Törlesztőrészletek és tulajdonosi költségek összesen",
    tabla: "Összehasonlítás évről évre",
    colAnio: "Év",
    colComprar: "Vásárlás",
    colAlquilar: "Bérlés",
    colDiferencia: "Különbség",
    errorPrecio: "Add meg a lakás vételárát.",
    errorAlquiler: "Add meg, mennyibe kerülne egy hasonló lakás bérlése.",
    convieneComprar: (anios, diferencia) => `A vásárlás a jobb: ${anios} év után ennyivel több vagyonod lenne: ${diferencia}.`,
    convieneAlquilar: (anios, diferencia) => `A bérlés a jobb: ${anios} év után ennyivel több vagyonod lenne: ${diferencia}.`,
    empate: (anios) => `${anios} év után a két lehetőség ugyanoda jut.`,
    observacionDesde: (anio) => `A vásárlás ${conNeveloHu(anio)}. évben kerül a bérlés elé, és onnantól előnyben marad.`,
    observacionMetodo:
      "Azt hasonlítja össze, mennyi vagyonod lenne az egyes esetekben. Ha bérelsz, az önerő és amit havonta megspórolsz, befektetve marad. Az eladás költségeit nem vonja le.",
  }),
};

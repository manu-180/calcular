import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosHu: TextosUi<UiMetaDeAhorro> = {
  slug: "megtakaritas-kalkulator",
  ui: () => ({
    meta: "Mennyit szeretnél összegyűjteni?",
    actual: "Eddigi megtakarításod (nem kötelező)",
    meses: "Hány hónap alatt",
    rendimiento: "A megtakarítás éves hozama (%, nem kötelező)",
    rendimientoAyuda: "Ha a pénz megtakarítási számlán vagy kamatozó befektetésben van. Ha nem hoz semmit, hagyd üresen.",
    aporteMensual: "Havonta ennyit kell félretenned",
    aporteSemanal: "Ez hetente",
    totalAportado: "Összesen befizetsz",
    intereses: "Kamatjövedelem",
    errorMeta: "Add meg, mennyit szeretnél összegyűjteni.",
    yaLlegas: "Az eddigi megtakarításod ennyi idő alatt további befizetés nélkül is eléri a célt.",
  }),
};

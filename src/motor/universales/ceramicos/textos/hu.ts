import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosHu: TextosUi<UiCeramicos> = {
  slug: "csempe-kalkulator",
  ui: () => ({
    superficie: (u) => `Burkolandó felület (${u})`,
    largo: (u) => `A lap hossza (${u})`,
    ancho: (u) => `A lap szélessége (${u})`,
    desperdicio: "Vágási ráhagyás (%)",
    desperdicioAyuda: "A vágásokra és a törésekre. Egyenes rakásnál 10%, átlós rakásnál 15% a szokásos.",
    porCaja: "Darab dobozonként",
    porCajaAyuda: "Nem kötelező. Ha kitöltöd, látod, hány dobozt kell venned.",
    piezas: "Szükséges lapok",
    cajas: "Megvásárolandó dobozok",
    conDesperdicio: (u) => `Felület ráhagyással (${u})`,
    cubre: (u) => `A dobozokkal lefedhető felület (${u})`,
    errorSuperficie: "A felületnek nullánál nagyobbnak kell lennie.",
    errorPieza: "A lap méreteinek nullánál nagyobbnak kell lenniük.",
  }),
};

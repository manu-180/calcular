import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosEn: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (u) => `Area to tile (${u})`,
    largo: (u) => `Tile length (${u})`,
    ancho: (u) => `Tile width (${u})`,
    desperdicio: "Waste allowance (%)",
    desperdicioAyuda: "For cuts and breakage. Use 10% for a straight layout and 15% for diagonal.",
    porCaja: "Tiles per box",
    porCajaAyuda: "Optional. Fill it in to see how many boxes to buy.",
    piezas: "Tiles needed",
    cajas: "Boxes to buy",
    conDesperdicio: (u) => `Area with waste (${u})`,
    cubre: (u) => `Area the boxes cover (${u})`,
    errorSuperficie: "The area has to be more than 0.",
    errorPieza: "Tile measurements have to be more than 0.",
  }),
};

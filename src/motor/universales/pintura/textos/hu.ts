import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "liter" : "gallon");

export const textosHu: TextosUi<UiPintura> = {
  slug: "festekszukseglet-kalkulator",
  ui: () => ({
    modo: "Milyen méreteid vannak?",
    modoMedidas: "A falak hossza és magassága",
    modoSuperficie: "A teljes felület",
    largo: (u) => `A falak teljes hossza (${u})`,
    largoAyuda: "Az összes festendő fal hossza összeadva. Egy szobánál a kerület.",
    alto: (u) => `A fal magassága (${u})`,
    superficie: (u) => `Festendő felület (${u})`,
    aberturas: (u) => `Ajtók és ablakok, amelyeket levonunk (${u})`,
    aberturasAyuda: "Egy ajtó nagyjából 2 m² (21 ft²), egy átlagos ablak 1 és 2 m² között van.",
    manos: "Rétegek száma",
    rendimiento: (u) => `A festék kiadóssága (${u})`,
    rendimientoAyuda: "A dobozon szerepel: mekkora felületet fed le egy réteggel. Ha nem tudod, hagyd a javasolt értéket.",
    recomendado: (u) => `Megvásárolandó festék (${volumen(u)})`,
    recomendadoAyuda: "Benne van 10% ráhagyás a javításokra és arra, ami a hengeren marad.",
    necesario: (u) => `Pontos mennyiség (${volumen(u)})`,
    neta: (u) => `Festendő felület (${u})`,
    errorMedidas: "Add meg a falak hosszát és magasságát.",
    errorSuperficie: "Add meg a festendő felületet.",
    errorAberturas: "Az ajtók és ablakok nem foglalhatják el az egész falat.",
    errorRendimiento: "A kiadósságnak nullánál nagyobbnak kell lennie.",
  }),
};

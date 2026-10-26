import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosTr: TextosUi<UiRitmo> = {
  slug: "kosu-temposu-hesaplama",
  ui: () => ({
    calcular: "Neyi hesaplamak istiyorsunuz?",
    calcRitmo: "Tempo (mesafe ve süreden)",
    calcTiempo: "Süre (mesafe ve tempodan)",
    calcDistancia: "Mesafe (süre ve tempodan)",
    distancia: "Mesafe",
    distanciaAyuda: "Bir yarış seçin ya da mesafeyi yazmak için “Başka mesafe” seçeneğini seçin.",
    otra: "Başka mesafe",
    cincoK: "5K",
    diezK: "10K",
    media: "Yarı maraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Başka mesafe (${u})`,
    horas: "Süre: saat",
    minutos: "Süre: dakika",
    segundos: "Süre: saniye",
    ritmoMin: (u) => `Tempo: dakika (${u} başına)`,
    ritmoSeg: "Tempo: saniye",
    ritmo: (u) => `Tempo (dk/${u})`,
    tiempo: "Bitiş süresi",
    distanciaRes: (u) => `Mesafe (${u})`,
    velocidad: (u) => `Ortalama hız (${u})`,
    errorDistancia: "Sıfırdan büyük bir mesafe girin.",
    errorTiempo: "Süreyi girin: saat, dakika ya da saniye.",
    errorRitmo: "Tempoyu girin: mesafe birimi başına dakika ve saniye.",
  }),
};

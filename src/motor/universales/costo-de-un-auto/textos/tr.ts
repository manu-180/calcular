import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosTr: TextosUi<UiCostoDeUnAuto> = {
  slug: "arac-masrafi-hesaplama",
  ui: () => ({
    precio: "Aracın değeri",
    precioAyuda: "Ödediğiniz fiyat ya da araç bir süredir sizdeyse bugünkü piyasa değeri.",
    depreciacion: "Yıllık değer kaybı (%)",
    depreciacionAyuda: "Sıfır bir araç ilk yılda değerinin %15 ile %25 arasını kaybeder. İkinci el bir araç daha az.",
    cuota: "Aylık taşıt kredisi taksiti (isteğe bağlı)",
    cuotaAyuda: "Yalnızca her ay hesabınızdan çıkan tutarı göstermek için. Gerçek maliyete eklenmez.",
    seguro: "Aylık sigorta (kasko ve trafik sigortası)",
    distanciaKm: "Aylık kilometre",
    distanciaMi: "Aylık mil",
    consumoL100: "Yakıt tüketimi (100 km'de litre)",
    consumoMpg: "Yakıt verimi (galon başına mil)",
    precioLitro: "Yakıtın litre fiyatı",
    precioGalon: "Yakıtın galon fiyatı",
    mantenimiento: "Aylık bakım",
    mantenimientoAyuda: "Periyodik bakım, lastik, onarım ve yıkama; aylık ortalama olarak.",
    estacionamiento: "Aylık otopark (isteğe bağlı)",
    otros: "Aylık vergi, geçiş ücreti ve diğer giderler (isteğe bağlı)",
    otrosAyuda: "Motorlu taşıt vergisi, muayene, köprü ve otoyol geçişleri ve cezalar; aylık ortalama olarak.",
    costoMensual: "Aylık gerçek maliyet",
    costoAnual: "Yıllık gerçek maliyet",
    porKm: "Kilometre başına maliyet",
    porMilla: "Mil başına maliyet",
    combustible: "Aylık yakıt",
    depreciacionMensual: "Aylık değer kaybı",
    gastoBolsillo: "Her ay hesabınızdan çıkan tutar",
    errorConsumo: "Yakıt maliyetini hesaplamak için aracınızın yakıt tüketimini girin.",
    observacionCuota:
      "Kredi taksiti gerçek maliyete dâhil değildir, çünkü bir kısmı aracın kendisini öder ve bu zaten değer kaybı olarak sayılır. Kredinin faizi bunun üzerine ek bir maliyettir.",
  }),
};

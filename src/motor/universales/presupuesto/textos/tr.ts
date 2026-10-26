import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosTr: TextosUi<UiPresupuesto> = {
  slug: "butce-hesaplama",
  ui: () => ({
    ingreso: "Aylık net gelir",
    ingresoAyuda: "Vergiler ve kesintilerden sonra her ay hesabınıza yatan tutar.",
    pctNecesidades: "İhtiyaçlar (%)",
    pctNecesidadesAyuda: "Kira, temel market alışverişi, faturalar, ulaşım, sağlık ve borçların asgari ödemeleri.",
    pctGustos: "İstekler (%)",
    pctGustosAyuda: "Dışarıda yemek, zorunlu olmayan alışveriş, abonelikler, tatiller.",
    pctAhorro: "Birikim (%)",
    pctAhorroAyuda: "Acil durum fonu, hedefler, emeklilik ve borçlara yapılan ek ödemeler.",
    necesidades: "İhtiyaçlar için",
    gustos: "İstekler için",
    ahorro: "Birikim için",
    ahorroAnual: "Bir yıllık birikim",
    errorIngreso: "Aylık gelirinizi girin.",
    errorSuma: (suma) => `Üç yüzdenin toplamı %${suma} ediyor. Toplam %100 olmalıdır.`,
    observacionAhorroBajo: "Gelirin %10 kadarından azını biriktirmek sürprizlere pek yer bırakmaz. Mümkünse isteklerden biraz kısın.",
  }),
};

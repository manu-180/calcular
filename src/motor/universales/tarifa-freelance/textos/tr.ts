import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosTr: TextosUi<UiTarifaFreelance> = {
  slug: "freelance-ucret-hesaplama",
  ui: () => ({
    ingreso: "Yılda elinize geçmesini istediğiniz tutar",
    ingresoAyuda: "Vergi ve giderlerden sonra kalan tutar. Serbest çalışan olarak maaşınız budur.",
    gastos: "Yıllık işletme giderleri",
    gastosAyuda: "Ekipman, yazılım, internet, eğitim, mali müşavir, sağlık sigortası ve emeklilik birikimi.",
    impuestos: "Tahmini vergi ve primler (%)",
    impuestosAyuda: "Kestiğiniz faturalardan giderler düşüldükten sonra vergiye ve primlere giden pay. Emin değilseniz bir mali müşavire danışın. %25 bir başlangıç noktasıdır.",
    diasLibres: "Yıllık izin günleri",
    diasLibresAyuda: "Tatil, resmî tatiller ve hastalık günleri. Bu günlerin ücretini kimse ödemez, bu yüzden ücretiniz onları da karşılamalıdır.",
    diasSemana: "Haftalık çalışma günü",
    horasSemana: "Haftalık faturalandırılabilir saat",
    horasSemanaAyuda: "Yalnızca ücret aldığınız saatler. Müşteri bulmak, idari işler ve öğrenmek faturalandırılmaz. 40 saatin 20 ile 30 arası olağandır.",
    tarifaHora: "Saatlik ücret",
    tarifaDia: "Günlük ücret",
    facturacionMensual: "Aylık gereken fatura tutarı",
    facturacionAnual: "Yıllık gereken fatura tutarı",
    horasAnio: "Yıllık faturalandırılabilir saat",
    errorIngreso: "Yılda ne kadar kazanmak istediğinizi girin.",
    errorImpuestos: "Vergi oranı %100'ün altında olmalıdır.",
    errorDias: "Bu kadar izin günüyle yılda çalışma günü kalmıyor.",
    errorHoras: "Haftada kaç saat faturalandırabileceğinizi girin.",
    observacionFacturables: "Bundan daha düşük bir ücret alırsanız planladığınızdan az kazanır ya da daha çok saat çalışırsınız.",
  }),
};

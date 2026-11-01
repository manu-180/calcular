import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosTr: TextosUi<UiConversorSueldo> = {
  slug: "saatlik-ucret-hesaplama",
  ui: () => ({
    monto: "Ücret",
    periodo: "Ücretin dönemi",
    hora: "Saatlik",
    dia: "Günlük",
    semana: "Haftalık",
    quincena: "On beş günlük (yılda 24)",
    mes: "Aylık",
    anio: "Yıllık",
    horasSemana: "Haftalık çalışma saati",
    diasSemana: "Haftalık çalışma günü",
    semanasAnio: "Yılda ücret alınan hafta",
    semanasAnioAyuda: "Ücretli izniniz varsa 52. Yalnızca çalıştığınız haftalar için ödeme alıyorsanız diğerlerini çıkarın.",
    porHora: "Saatlik",
    porDia: "Günlük",
    porSemana: "Haftalık",
    porQuincena: "On beş günlük",
    porMes: "Aylık",
    porAnio: "Yıllık",
    errorHoras: "Haftada kaç saat çalıştığınızı girin.",
    errorSemanas: "Yılda ücret alınan hafta sayısı sıfırdan büyük olmalıdır.",
    observacionBruto: "Aynı tutarın başka dönemlere çevrilmiş hâlidir. İkramiyeler eklenmez, vergiler düşülmez.",
  }),
};

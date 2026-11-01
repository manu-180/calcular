import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosKa: TextosUi<UiConversorSueldo> = {
  slug: "saatobrivi-khelpasi",
  ui: () => ({
    monto: "ხელფასი",
    periodo: "ხელფასის პერიოდი",
    hora: "საათი",
    dia: "დღე",
    semana: "კვირა",
    quincena: "ნახევარი თვე (წელიწადში 24 გადახდა)",
    mes: "თვე",
    anio: "წელი",
    horasSemana: "სამუშაო საათები კვირაში",
    diasSemana: "სამუშაო დღეები კვირაში",
    semanasAnio: "ანაზღაურებადი კვირები წელიწადში",
    semanasAnioAyuda: "52, თუ შვებულებაც ანაზღაურდება. თუ ხელფასს მხოლოდ ნამუშევარი კვირებისთვის იღებთ, დანარჩენი გამოაკელით.",
    porHora: "საათობრივი ანაზღაურება",
    porDia: "დღიური ანაზღაურება",
    porSemana: "კვირის ხელფასი",
    porQuincena: "ნახევარი თვის ხელფასი",
    porMes: "თვიური ხელფასი",
    porAnio: "წლიური ხელფასი",
    errorHoras: "მიუთითეთ, რამდენ საათს მუშაობთ კვირაში.",
    errorSemanas: "ანაზღაურებადი კვირების რაოდენობა ნულზე მეტი უნდა იყოს.",
    observacionBruto: "იგივე თანხაა, სხვა პერიოდზე გადაანგარიშებული. პრემიები არ ემატება, გადასახადები და შენატანები არ აკლდება.",
  }),
};

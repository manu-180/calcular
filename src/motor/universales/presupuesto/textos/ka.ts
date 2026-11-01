import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosKa: TextosUi<UiPresupuesto> = {
  slug: "ojakhis-biujeti",
  ui: () => ({
    ingreso: "ხელზე ასაღები თვიური შემოსავალი",
    ingresoAyuda: "რამდენი ირიცხება ყოველთვე თქვენს ანგარიშზე, გადასახადებისა და შენატანების შემდეგ.",
    pctNecesidades: "საჭიროებები (%)",
    pctNecesidadesAyuda: "საცხოვრებელი, საკვები, კომუნალური, ტრანსპორტი, ჯანმრთელობა და სესხების მინიმალური შენატანები.",
    pctGustos: "სურვილები (%)",
    pctGustosAyuda: "რესტორანი, არასასიცოცხლო შესყიდვები, გამოწერები, მოგზაურობა.",
    pctAhorro: "დანაზოგი (%)",
    pctAhorroAyuda: "საგანგებო ფონდი, მიზნები, პენსია და სესხების წინსწრებით დაფარვა.",
    necesidades: "საჭიროებებისთვის",
    gustos: "სურვილებისთვის",
    ahorro: "დანაზოგისთვის",
    ahorroAnual: "დანაზოგი ერთ წელიწადში",
    errorIngreso: "შეიყვანეთ თვიური შემოსავალი.",
    errorSuma: (suma) => `სამი პროცენტის ჯამი ახლა: ${suma}%. ჯამი ზუსტად 100% უნდა იყოს.`,
    observacionAhorroBajo: "თუ 10 პროცენტზე ნაკლებს გადადებთ, გაუთვალისწინებელი ხარჯებისთვის ცოტა დაგრჩებათ. თუ შეგიძლიათ, სურვილებს მოაკელით.",
  }),
};

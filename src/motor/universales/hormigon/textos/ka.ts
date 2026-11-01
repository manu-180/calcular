import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const largoU = (u: string) => (u === "ft" ? "ფუტი" : "მ");
const espesorU = (u: string) => (u === "in" ? "დიუმი" : "სმ");
const masaU = (u: string) => (u === "lb" ? "ფუნტი" : "კგ");
const volumenU = (u: string) => (u === "yd³" ? "კუბური იარდი" : u === "ft³" ? "კუბური ფუტი" : "მ³");

export const textosKa: TextosUi<UiHormigon> = {
  slug: "betonis-kalkulatori",
  ui: () => ({
    largo: (u) => `სიგრძე (${largoU(u)})`,
    ancho: (u) => `სიგანე (${largoU(u)})`,
    espesor: (u) => `სისქე (${espesorU(u)})`,
    espesorAyuda: "ტერასა ან ტროტუარი: ჩვეულებრივ 10 სმ (4 დიუმი). ავტოსადგომი: 12-15 სმ.",
    margen: "მარაგი (%)",
    margenAyuda: "არათანაბარი გრუნტისა და დაღვრილი ბეტონისთვის. ჩვეულებრივ 5-10%.",
    bolsa: (u) => `ცემენტის ერთი ტომრის წონა (${masaU(u)})`,
    volumen: (u) => `ზუსტი მოცულობა (${volumenU(u)})`,
    volumenTotal: (u) => `საჭირო ბეტონი (${volumenU(u)})`,
    volumenPies: "საჭირო ბეტონი (კუბური ფუტი)",
    cemento: (u) => `ცემენტი (${masaU(u)})`,
    bolsas: "ცემენტის ტომრები",
    arena: (u) => `ქვიშა (${volumenU(u)})`,
    piedra: (u) => `ღორღი (${volumenU(u)})`,
    agua: (u) => (u === "L" ? "წყალი (ლიტრი)" : "წყალი (გალონი)"),
    errorMedida: "ეს ზომა ნულზე მეტი უნდა იყოს.",
    aviso: "მასალების რაოდენობა საორიენტაციოა ზოგადი დანიშნულების ნარევისთვის, პროპორციით 1:2:3 (ერთ კუბურ მეტრზე დაახლოებით 350 კგ ცემენტი). ის იცვლება ნარევის პროპორციის, სამუშაოსა და ადგილობრივი მასალების მიხედვით: შეათანხმეთ სამუშაოს ხელმძღვანელთან.",
  }),
};

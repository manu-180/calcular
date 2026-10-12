import { definirCasos } from "@/motor/calculo";
import inss from "./inss";

export default definirCasos(inss, [
  {
    nombre: "Régimen integral en una empresa chica",
    origen: { tipo: "recalculado", detalle: "Decreto 06-2019, art. 11: laboral 7 %, patronal 21.5 % con menos de 50 trabajadores; INATEC 2 %. 15000 × 7 % = 1050; × 21.5 % = 3225; × 2 % = 300. Total 4575." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, regimen: "integral", tamano: "menos-50" },
    esperado: { laboral: 1050, patronal: 3225, inatec: 300, total: 4575 },
  },
  {
    nombre: "Régimen IVM en una empresa grande",
    origen: { tipo: "recalculado", detalle: "IVM: laboral 5 %, patronal 16.5 % con 50 o más. 20000 × 5 % = 1000; × 16.5 % = 3300; INATEC 400. Total 4700." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, regimen: "ivm", tamano: "50-o-mas" },
    esperado: { tasaLaboral: 5, laboral: 1000, tasaPatronal: 16.5, patronal: 3300, inatec: 400, total: 4700 },
  },
]);

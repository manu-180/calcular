import { definirCasos } from "@/motor/calculo";
import trosokNaRabotodavach from "./trosok-na-rabotodavach";

const UJP = "https://www.ujp.gov.mk/mk/vodic/category/643";

export default definirCasos(trosokNaRabotodavach, [
  {
    nombre: "60.000 денари бруто без додатоци",
    origen: { tipo: "recalculado", url: UJP, detalle: "Трошокот е бруто-платата; годишно 720.000. Нето 39.973,2; придонеси 16.800; данок 3.226,8." },
    fecha: "2026-11-01",
    entrada: { bruto: 60000, ishrana: 0, prevoz: 0, regres: 0 },
    esperado: { mesechno: 60000, godishno: 720000, neto: 39973, pridonesi: 16800, danok: 3227 },
  },
  {
    nombre: "60.000 денари со исхрана, превоз и регрес",
    origen: { tipo: "recalculado", url: UJP, detalle: "60.000 + 4.000 + 1.500 + 12.000 / 12 = 66.500; годишно 798.000." },
    fecha: "2026-11-01",
    entrada: { bruto: 60000, ishrana: 4000, prevoz: 1500, regres: 12000 },
    esperado: { mesechno: 66500, godishno: 798000 },
  },
]);

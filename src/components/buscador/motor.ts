import { MAS_USADAS, PAGINAS } from "@/data/navegacion";
import { crearMotor } from "./indice";

export { normalizar, type Resultado } from "./indice";

const motor = crearMotor(PAGINAS, MAS_USADAS, ["argentina"]);

export const buscar = motor.buscar;
export const masUsadas = motor.masUsadas;
export const paginasDe = motor.paginasDe;

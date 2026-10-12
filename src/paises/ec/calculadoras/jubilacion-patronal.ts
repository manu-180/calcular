import { definirCalculadora, porcentaje } from "@/motor/calculo";

// La pensión mensual exacta sale del haber individual dividido para un coeficiente actuarial por
// edad (Acuerdo Ministerial MDT 99 de 2016), que no tenemos en una fuente legible. Por eso se
// calculan el haber, el mínimo del fondo global y los topes legales, no la pensión.
export default definirCalculadora({
  id: "ec.jubilacion-patronal",
  mercado: "ec",
  concepto: "propio",
  slug: "jubilacion-patronal",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.jubilacion-patronal-anios": "numero",
    "ec.jubilacion-patronal-haber": "numero",
    "ec.jubilacion-patronal-minima": "numero",
    "ec.jubilacion-patronal-minima-doble": "numero",
    "ec.jubilacion-patronal-global": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Años de servicio con el mismo empleador", min: 0, porDefecto: 25 },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Remuneración anual promedio de los últimos 5 años",
      ayuda: "Suma lo que ganaste en los últimos 5 años y divide para 5.",
      min: 0,
    },
    {
      id: "basicoPuesto",
      tipo: "moneda",
      etiqueta: "Salario básico de tu puesto",
      ayuda: "El básico sectorial de tu cargo. Si no lo sabes, deja el campo vacío y usamos el salario básico unificado.",
      min: 0,
      requerido: false,
    },
    { id: "doble", tipo: "si-no", etiqueta: "También tienes jubilación del IESS", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const sbu = valores["ec.sbu"];
    const basico = entrada.basicoPuesto === null || entrada.basicoPuesto === 0 ? sbu : entrada.basicoPuesto;
    const requisito = valores["ec.jubilacion-patronal-anios"];
    const tieneDerecho = entrada.anios >= requisito;
    const haber = redondear(porcentaje(entrada.promedio, valores["ec.jubilacion-patronal-haber"]) * entrada.anios);
    const fondoGlobalMinimo = redondear(porcentaje(basico, valores["ec.jubilacion-patronal-global"]) * entrada.anios);
    const observaciones: string[] = [];
    if (!tieneDerecho) {
      observaciones.push(`Necesitas ${requisito} años con el mismo empleador. Si te despiden con 20 años o más, cobras la parte proporcional.`);
    }
    observaciones.push("Del haber, el empleador puede descontar el fondo de reserva que te pagó y, si estabas afiliado, los aportes patronales al IESS. Si eliges cobrar el fondo global de una vez, nunca puede ser menor al mínimo.");
    observaciones.push("La pensión mensual se obtiene dividiendo el haber para un coeficiente según tu edad. Pide el cálculo actuarial a tu empleador.");
    return {
      derecho: tieneDerecho ? "Sí" : "Todavía no",
      haber,
      fondoGlobalMinimo,
      pensionMinima: entrada.doble ? valores["ec.jubilacion-patronal-minima-doble"] : valores["ec.jubilacion-patronal-minima"],
      pensionMaxima: sbu,
      observaciones,
    };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Tienes derecho a la jubilación patronal", formato: "texto" },
    { clave: "haber", etiqueta: "Haber individual antes de descuentos", formato: "moneda" },
    { clave: "fondoGlobalMinimo", etiqueta: "Mínimo del fondo global si lo cobras de una vez", formato: "moneda", destacada: true },
    { clave: "pensionMinima", etiqueta: "Pensión mensual mínima", formato: "moneda" },
    { clave: "pensionMaxima", etiqueta: "Pensión mensual máxima (un salario básico)", formato: "moneda" },
  ],
});

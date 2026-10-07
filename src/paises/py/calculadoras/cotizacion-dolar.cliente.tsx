"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import cotizacionDolar from "./cotizacion-dolar";
export default crearCalculadoraCliente(cotizacionDolar);

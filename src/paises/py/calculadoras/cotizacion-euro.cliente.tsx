"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import cotizacionEuro from "./cotizacion-euro";
export default crearCalculadoraCliente(cotizacionEuro);

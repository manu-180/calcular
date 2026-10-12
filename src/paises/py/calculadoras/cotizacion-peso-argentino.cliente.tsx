"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import cotizacionPesoArgentino from "./cotizacion-peso-argentino";
export default crearCalculadoraCliente(cotizacionPesoArgentino);

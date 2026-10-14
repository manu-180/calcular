"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import cotizacionSeguridadSocial from "./cotizacion-seguridad-social";
export default crearCalculadoraCliente(cotizacionSeguridadSocial);

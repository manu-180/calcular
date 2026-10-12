"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import deduccionesPersonales from "./deducciones-personales";
export default crearCalculadoraCliente(deduccionesPersonales);

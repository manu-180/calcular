"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import feriadosPagos from "./feriados-pagos";
export default crearCalculadoraCliente(feriadosPagos);

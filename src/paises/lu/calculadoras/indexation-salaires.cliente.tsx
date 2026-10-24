"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import indexationSalaires from "./indexation-salaires";
export default crearCalculadoraCliente(indexationSalaires);

import { Temperatura } from './temperatura';
import { TermometroSeco } from './termometro-seco';
import { TermometroHumedo } from './termometro-humedo';
import { PresionAtmosferica } from './presion-atmosferica';
import { DireccionViento } from './direccion-viento';
import { Nubosidad } from './nubosidad';
import { Visibilidad } from './visibilidad';
import { Geotermometro } from './geotermometro';
export class Registro{
    id: number;
    fecha: Date;
    agua_caida: number;
    horas_sol: number;
    evaporamiento: number;
    createdAt: Date;
    updatedAt: Date;
    Temperatura: Temperatura;
    TermometroSeco: TermometroSeco;
    TermometroHumedo: TermometroHumedo;
    PresionAtmosferica: PresionAtmosferica;
    DireccionViento: DireccionViento;
    Nubosidad: Nubosidad;
    Visibilidad: Visibilidad;
    Geotermometro: Geotermometro;
}
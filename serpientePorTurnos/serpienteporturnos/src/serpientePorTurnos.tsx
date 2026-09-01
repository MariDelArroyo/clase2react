import { useState } from 'react';
import type { KeyboardEvent } from 'react';

type Posicion = {
    fila: number;
    columna: number;
};

type Direccion = 'Arriba' | 'Abajo' | 'Izquierda' | 'Derecha';

const totalFilas = 8;
const totalColumnas = 8;

const estarEnSerpiente = (posicion: Posicion, serpiente: Posicion[]): boolean => {
    for (const segmento of serpiente) {
        if (segmento.fila === posicion.fila && segmento.columna === posicion.columna) {
            return true;
        }
    }
    return false;
};

const crearComida = (serpiente: Posicion[]): Posicion => {
    const celdasLibres: Posicion[] = [];
    for (let fila = 0; fila < totalFilas; fila++) {
        for (let columna = 0; columna < totalColumnas; columna++) {
            const posicion = { fila, columna };
            if (!estarEnSerpiente(posicion, serpiente)) {
                celdasLibres.push(posicion);
            }
        }
    }
    const indice = Math.floor(Math.random() * celdasLibres.length);
    return celdasLibres[indice];
};

const serpienteInicial: Posicion[] = [
    { fila: 3, columna: 4 },
    { fila: 3, columna: 3 },
    { fila: 3, columna: 2 },
];

export default function SerpientePorTurnos() {
    const [serpiente, setSerpiente] = useState<Posicion[]>(serpienteInicial);
    const [comida, setComida] = useState<Posicion>(() => crearComida(serpienteInicial));
    const [juegoTerminado, setJuegoTerminado] = useState<boolean>(false);

    const avanzar = (direccion: Direccion) => {
        if (juegoTerminado) { return; }

        const cabeza = serpiente[0];
        const nuevaCabeza: Posicion = { fila: cabeza.fila, columna: cabeza.columna };

        if (direccion === 'Arriba') {
            nuevaCabeza.fila = cabeza.fila - 1;
        }
        if (direccion === 'Abajo') {
            nuevaCabeza.fila = cabeza.fila + 1;
        }
        if (direccion === 'Izquierda') {
            nuevaCabeza.columna = cabeza.columna - 1;
        }
        if (direccion === 'Derecha') {
            nuevaCabeza.columna = cabeza.columna + 1;
        }

        const salioDelTablero =
            nuevaCabeza.fila < 0 ||
            nuevaCabeza.fila >= totalFilas ||
            nuevaCabeza.columna < 0 ||
            nuevaCabeza.columna >= totalColumnas;

        if (salioDelTablero || estarEnSerpiente(nuevaCabeza, serpiente)) {
            setJuegoTerminado(true);
            return;
        }

        let nuevoCuerpo = [nuevaCabeza, ...serpiente];

        const comio = nuevaCabeza.fila === comida.fila && nuevaCabeza.columna === comida.columna;

        if (!comio) {
            nuevoCuerpo = nuevoCuerpo.slice(0, nuevoCuerpo.length - 1);
        }

        if (comio) {
            setComida(crearComida(nuevoCuerpo));
        }

        setSerpiente(nuevoCuerpo);
    };

    const manejartecla = (evento: KeyboardEvent<HTMLDivElement>) => {
        if (evento.key === 'ArrowUp') {
            avanzar('Arriba');
        }
        if (evento.key === 'ArrowDown') {
            avanzar('Abajo');
        }
        if (evento.key === 'ArrowLeft') {
            avanzar('Izquierda');
        }
        if (evento.key === 'ArrowRight') {
            avanzar('Derecha');
        }
    };

    const claseCelda = (fila: number, columna: number): string => {
        if (fila === comida.fila && columna === comida.columna) {
            return 'comida';
        }
        for (const segmento of serpiente) {
            if (segmento.fila === fila && segmento.columna === columna) {
                if (segmento.fila === serpiente[0].fila && segmento.columna === serpiente[0].columna) {
                    return 'cabeza';
                }
                return 'cuerpo';
            }
        }
        return 'vacia';
    };

    return (
        <div tabIndex={0} onKeyDown={manejartecla}>
            <h1>Serpiente por turnos</h1>
            <p>Usa las flechas del teclado para mover la serpiente por turnos.</p>
            <h2 className={juegoTerminado ? 'mensaje-fin' : 'oculto'}>
                Juego terminado
            </h2>
            <table className="tablero">
                <tbody>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((fila) => (
                        <tr key={fila}>
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((columna) => (
                                <td key={columna} className={claseCelda(fila, columna)}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
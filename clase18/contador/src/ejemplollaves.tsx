const mensaje: string = 'Hola UPB';
const sumar = (a: number, b: number): number => a + b;
const suma = sumar(2, 2);
export default function EjemploLlaves() {
    return (
        <section>
            <h1>{mensaje}</h1>
            <p>La suma de 2 + 2 es: {suma}</p>
        </section>
        )}
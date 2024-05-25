export const insertDotsInPrice = (price) => {                                           //Función que inserta un punto cada 3 números en los precios
    const priceArr = price.toString().split("");
    for (let i = priceArr.length - 3; i > 0; i -= 3) {
        priceArr.splice(i, 0, ".");
    }
    return priceArr.join("");
}

export const  formatDate = (timestamp) => {                                             //Función que convierte un timestamp del tipo Date.now() a formato de fecha y hora
    // Crea un objeto Date a partir del timestamp
    const date = new Date(timestamp);

    // Ajusta la fecha/hora a la zona horaria de Argentina (UTC-3)
    const offset = date.getTimezoneOffset() * 60000; // offset en milisegundos
    const argentinaTime = new Date(date.getTime() - offset - 3 * 60 * 60000); // UTC-3

    // Extrae y formatea las partes necesarias
    const day = String(argentinaTime.getDate()).padStart(2, '0');
    const month = String(argentinaTime.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = String(argentinaTime.getFullYear()).slice(-2); // Obtiene los dos últimos dígitos del año
    const hours = String(argentinaTime.getHours()).padStart(2, '0');
    const minutes = String(argentinaTime.getMinutes()).padStart(2, '0');

    // Devuelve la fecha formateada
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}
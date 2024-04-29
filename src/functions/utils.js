export const insertDotsInPrice = (price) => {
    const priceArr = price.toString().split("");
    for (let i = priceArr.length - 3; i > 0; i -= 3) {
        priceArr.splice(i, 0, ".");
    }
    return priceArr.join("");
}
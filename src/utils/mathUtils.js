const getRandom = (max) => Math.floor(Math.random() * max) + 1;

export const generateExercise = (max, op) => {
    let n1, n2;

    if (op === '+') {
        n1 = getRandom(max);
        n2 = getRandom(max);
    }
    else if (op === '-') {
        n1 = getRandom(max);
        n2 = getRandom(n1); // מבטיח n1 >= n2
    }
    else if (op === '×') {
        const multMax = max === 10 ? 10 : (max === 100 ? 12 : 25);
        n1 = getRandom(max);
        n2 = getRandom(multMax);
    }
    else if (op === '÷') {
        // הלוגיקה המעמיקה שהסברנו:
        const resLimit = max/10 < 10 ? 10 : max/10;
        const result = getRandom(resLimit);
        const divisor = getRandom(10);
        n1 = result * divisor;
        n2 = divisor;
    }

    return { n1, n2 };
};
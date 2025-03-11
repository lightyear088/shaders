export const range = (start: number, end?: number, step: number = 1): number[] => {
    const output: number[] = [];

    // Если end не задан, значит start будет концом диапазона
    if (typeof end === "undefined") {
        end = start;
        start = 0;
    }

    // Генерация чисел в заданном диапазоне
    for (let i = start; i <= end; i += step) {
        output.push(i);
    }

    return output;
};



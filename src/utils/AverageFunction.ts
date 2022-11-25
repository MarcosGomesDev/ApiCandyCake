export const sumOfArray = function (arr: Array<number>) {
    const initialValue = 0;

    const totalSum = arr.reduce((previousValue, currentValue) =>
    previousValue + currentValue, initialValue);

    return totalSum
}

export const averageOfArray = function (arr: Array<number>) {
    return ((sumOfArray(arr)) / arr.length)
}

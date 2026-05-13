const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

// 1
const mergedIds = [...classA, ...classB];

console.log(mergedIds);

// 2
const idMap = {};
const ids = [];

for (const id of mergedIds) {
    if (!idMap[id]) {
        idMap[id] = true;

        ids.push(id);
    }
}

console.log(ids);

// 3
function quickSort(numbers) {
    if (numbers.length <= 1) {
        return numbers;
    }

    const mid = Math.floor(numbers.length / 2);
    const pivot = numbers[mid];
    const left = [];
    const right = [];

    for (let i = 0; i < numbers.length; i++) {
        if (i === mid) {
            continue;
        }

        const currentNumber = numbers[i];

        if (currentNumber < pivot) {
            left.push(currentNumber);
        } else {
            right.push(currentNumber);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort(ids));

function getSecondLargestNumber(numbers) {
    let largestNumber = numbers[0];
    let secondLargestNumber = null;

    for (let i = 1; i < numbers.length; i++) {
        const currentNumber = numbers[i];

        if (currentNumber > largestNumber) {
            secondLargestNumber = largestNumber;
            largestNumber = currentNumber;
        } else if (
            currentNumber < largestNumber &&
            (secondLargestNumber === null ||
                currentNumber > secondLargestNumber)
        ) {
            secondLargestNumber = currentNumber;
        }
    }

    return secondLargestNumber;
}

const numbers = [9, 8, 3, 5, 6, 2, 7, 9];

console.log(getSecondLargestNumber(numbers)); // 8

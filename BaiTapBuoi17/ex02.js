function getElectricityBill(kwh) {
    let result;
    let cap1 = 50 * 1678;
    let cap2 = 50 * 1734;
    let cap3 = 100 * 2014;
    let cap4 = 100 * 2536;
    let cap5 = 100 * 2834;

    if (kwh > 400) {
        result = cap1 + cap2 + cap3 + cap4 + cap5 + (kwh - 400) * 2927;
    } else if (kwh > 300) {
        result = cap1 + cap2 + cap3 + cap4 + (kwh - 300) * 2834;
    } else if (kwh > 200) {
        result = cap1 + cap2 + cap3 + (kwh - 200) * 2536;
    } else if (kwh > 100) {
        result = cap1 + cap2 + (kwh - 100) * 2014;
    } else if (kwh > 50) {
        result = cap1 + (kwh - 50) * 1734;
    } else result = kwh * 1678;
    return result;
}

console.log(getElectricityBill(70));
// Mong đợi: (50 * 1678) + (20 * 1734) = 118580

console.log(getElectricityBill(120));
// Mong đợi: (50 * 1678) + (50 * 1734) + (20 * 2014) = 210880

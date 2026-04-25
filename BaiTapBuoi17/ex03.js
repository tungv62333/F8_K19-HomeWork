function cleanName(name, keyword) {
    name = name.toLowerCase().trim();
    return name.includes(keyword.toLowerCase());
}

console.log(cleanName("   NGUYEN Van An   ", "an")); // Mong đợi: true (vì 'nguyen van an' có chứa 'an')
console.log(cleanName("   Tran Thi B ", "hoang")); // Mong đợi: false

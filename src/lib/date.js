function getCurrentDateWithYearOffset(yearsOffset) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + yearsOffset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 示例：获取当前日期加上2年的日期
console.log(getCurrentDateWithYearOffset(2));
const IS_ABSENT = 0;
const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;
const NUM_OF_WORKING_DAYS = 20;
const MAX_WORKING_HOURS_IN_MONTH = 160;

function getWorkingHours(empCheck) {
    switch (empCheck) {
        case IS_PART_TIME:
            return PART_TIME_HOURS;
        case IS_FULL_TIME:
            return FULL_TIME_HOURS;
        default:
            return 0;
    }
}

function calculateWage(empHours) {
    return empHours * WAGE_PER_HOUR;
}

{
    let totalEmpHours = 0;
    let totalWorkingDays = 0;
    let empDailyWageArray = new Array();
    let empDailyWageMap = new Map();
    let empDailyHoursMap = new Map();

    while (totalEmpHours <= MAX_WORKING_HOURS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS) {
        totalWorkingDays++;
        let empCheck = Math.floor(Math.random() * 10) % 3;
        let empHours = getWorkingHours(empCheck);
        totalEmpHours += empHours;
        empDailyWageArray.push(calculateWage(empHours));
        empDailyWageMap.set(totalWorkingDays, calculateWage(empHours));
        empDailyHoursMap.set(totalWorkingDays, empHours);
    }
    let empWage = calculateWage(totalEmpHours);
    console.log(`\nTotal Working Days:${totalWorkingDays}  Total Working Hours:${totalEmpHours}  Total Employee Wage:${empWage}`);

    // 7. Array Helper Functions
    // 7.a.1. Calculate Total Employee Wage using forEach traversal
    let totalEmpWage = 0;
    function sum(dailyWage) {
        totalEmpWage += dailyWage;
    }
    empDailyWageArray.forEach(sum);
    console.log("\nUC-7-A1: Total Employee Wage (using forEach traversal): " + totalEmpWage);

    // 7.a.2. Calculate Total Employee Wage using reduce method
    function totalWages(totalWage, dailyWage) {
        return totalWage + dailyWage;
    }
    console.log("UC-7-A2: Total Employee Wage (using reduce method and array): " + empDailyWageArray.reduce(totalWages, 0));

    // 7.b. Show Day along with Daily Wage using Array map helper function
    let dayCounter = 0;
    function mapDayWithWage(dailyWage) {
        dayCounter++;
        return dayCounter + " = " + dailyWage;
    }
    let mapDayWithWageArray = empDailyWageArray.map(mapDayWithWage);
    console.log("UC-7-B: Daily Wage Map:");
    console.log(mapDayWithWageArray);

    // 7.c. Show Days when Full-time wage of '160' were earned
    function fullTimeWage(dailyWage) {
        return dailyWage.includes(FULL_TIME_HOURS);
    }
    let fullDayWageArray = mapDayWithWageArray.filter(fullTimeWage);
    console.log("UC-7-C: Map of Daily Wages with filter when full-time wage is earned:\n" + fullDayWageArray);

    // 7.d. Find the first occurrence when full-time wage was earned (using find function)
    function findFulltimeWage(dailyWage) {
        return dailyWage.includes(FULL_TIME_HOURS);
    }
    console.log("UC-7-D: First full-time wage was earned on day: " + mapDayWithWageArray.find(findFulltimeWage));

    // 7.e. Check if Every element of fullDayWageArray is truly holding full-time wage
    function isAllFulltimeWage(dailyWage) {
        return dailyWage.includes(FULL_TIME_HOURS);
    }
    console.log("UC-7-E: Check if all elements of fullDayWageArray have full-time wage: " + fullDayWageArray.every(isAllFulltimeWage));

    // 7.f. Check if there is any part-time wage in the array
    function isAnyParttimeWage(dailyWage) {
        return dailyWage.includes(PART_TIME_HOURS);
    }
    console.log("UC-7-F: Check if there is any part-time wage: " + mapDayWithWageArray.some(isAnyParttimeWage));

    // 7.g. Find number of days the employee worked (or) was present
    function totalDaysWorked(numOfDays, dailyWage) {
        if (dailyWage > 0) return ++numOfDays;
        return numOfDays;
    }
    console.log("UC-7-G: Number of days Employee worked: " + empDailyWageArray.reduce(totalDaysWorked, 0));

    // 8. Map Functions
    console.log("\nUC-8-A: Daily Wage Map(as stored in Map):");
    for (let [day, wage] of empDailyWageMap) console.log("Day" + day + "  Wage:" + wage);
    console.log("UC-8-B: Total Employee Wage (using Map): " + Array.from(empDailyWageMap.values()).reduce(totalWages, 0));

    // 9. Arrow Functions
    const findTotal = (totalValue, dailyValue) => {
        return totalValue + dailyValue;
    }
    let totalHours = Array.from(empDailyHoursMap.values())
        .filter(dailyHours => dailyHours > 0)
        .reduce(findTotal, 0);
    let totalSalary = empDailyWageArray
        .filter(dailyWage => dailyWage > 0)
        .reduce(findTotal, 0);
    console.log(`\nUC-9-A: Employee Wage with Arrow functions:\nTotal Working Hours: ${totalHours}  Total Wage: ${totalSalary}`);

    let nonWorkingDays = new Array();
    let partWorkingDays = new Array();
    let fullWorkingDays = new Array();
    empDailyHoursMap.forEach((value, key) => {
        if (value == FULL_TIME_HOURS) fullWorkingDays.push(key);
        else if (value == PART_TIME_HOURS) partWorkingDays.push(key);
        else nonWorkingDays.push(key);
    });
    console.log(`UC-9-B: Full Working Days: ${fullWorkingDays}\nPart Working Days: ${partWorkingDays}\nNon Working Days: ${nonWorkingDays}`);
}

// 10. Object Creation
let totalEmpHours = 0;
let totalWorkingDays = 0;
let empDailyHoursAndWageArray = new Array();
while (totalEmpHours <= MAX_WORKING_HOURS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS) {
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let empHours = getWorkingHours(empCheck);
    totalEmpHours += empHours;
    empDailyHoursAndWageArray.push(
        {
            dayNum: totalWorkingDays,
            dailyHours: empHours,
            dailyWage: calculateWage(empHours),
            toString() {
                return '\nDay' + this.dayNum + ' => Working Hours is ' + this.dailyHours + ' And Wage Earned = ' + this.dailyWage
            },
        });
}
console.log("\nUC-10: Showing Daily Hours Worked and Wage Earned: " + empDailyHoursAndWageArray);

// 11. Using object functions along with arrow functions
// 11.a. Calculate total wage and total hours worked
let totalWages = empDailyHoursAndWageArray
    .filter(dailyHoursAndWage => dailyHoursAndWage.dailyWage > 0)
    .reduce((totalWage, dailyHoursAndWage) => totalWage += dailyHoursAndWage.dailyWage, 0);
let totalHours = empDailyHoursAndWageArray
    .filter(dailyHoursAndWage => dailyHoursAndWage.dailyWage > 0)
    .reduce((totalHour, dailyHoursAndWage) => totalHour += dailyHoursAndWage.dailyHours, 0);
console.log("\nUC-11-A: Employee Wage with objects and arrow functions:\nTotal Working Hours: " + totalHours + "  Total Wage: " + totalWages);

// 11.b. Show the full working days using forEach
process.stdout.write("UC-11-B: Logging full-work days:");
empDailyHoursAndWageArray.filter(dailyHoursAndWage => dailyHoursAndWage.dailyHours == FULL_TIME_HOURS)
    .forEach(dailyHoursAndWage => process.stdout.write(dailyHoursAndWage.toString()));

// 11.c. Show part working days using map by reducing to String Array
let partWorkingDayStrArray = empDailyHoursAndWageArray
    .filter(dailyHoursAndWage => dailyHoursAndWage.dailyHours == PART_TIME_HOURS)
    .map(dailyHoursAndWage => dailyHoursAndWage.toString());
console.log("\nUC-11-C: Part-working day strings: " + partWorkingDayStrArray);

// 11.d. No working days only using map function
let nonWorkingDayNums = empDailyHoursAndWageArray
    .filter(dailyHoursAndWage => dailyHoursAndWage.dailyHours == IS_ABSENT)
    .map(dailyHoursAndWage => dailyHoursAndWage.dayNum);
console.log("UC-11-D: Non-working days: " + nonWorkingDayNums);
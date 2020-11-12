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
console.log(`Total Working Days:${totalWorkingDays}  Total Working Hours:${totalEmpHours}  Total Employee Wage:${empWage}`);

// 7. Array Helper Functions
// Calculate Total Employee Wage using forEach traversal
let totalEmpWage = 0;
function sum(dailyWage) {
    totalEmpWage += dailyWage;
}
empDailyWageArray.forEach(sum);
console.log("UC-7-A1:Total Employee Wage (using forEach traversal): " + totalEmpWage);

// Calculate Total Employee Wage using reduce method
function totalWages(totalWage, dailyWage) {
    return totalWage + dailyWage;
}
console.log("UC-7-A2:Total Employee Wage (using reduce method and array): " + empDailyWageArray.reduce(totalWages, 0));

// Show Day along with Daily Wage using Array map helper function
let dayCounter = 0;
function mapDayWithWage(dailyWage) {
    dayCounter++;
    return dayCounter + " = " + dailyWage;
}
let mapDayWithWageArray = empDailyWageArray.map(mapDayWithWage);
console.log("UC-7-B:Daily Wage Map:");
console.log(mapDayWithWageArray);

// Show Days when Full-time wage of '160' were earned
function fullTimeWage(dailyWage) {
    return dailyWage.includes("160");
}
let fullDayWageArray = mapDayWithWageArray.filter(fullTimeWage);
console.log("UC-7-C:Map of Daily Wages with filter when full-time wage is earned:" + fullDayWageArray);

// Find the first occurrence when full-time wage was earned (using find function)
function findFulltimeWage(dailyWage) {
    return dailyWage.includes("160");
}
console.log("UC-7-D:First full-time wage was earned on day: " + mapDayWithWageArray.find(findFulltimeWage));

// Check if Every element of fullDayWageArray is truly holding full-time wage
function isAllFulltimeWage(dailyWage) {
    return dailyWage.includes("160");
}
console.log("UC-7-E:Check if all elements of fullDayWageArray have full-time wage: " + fullDayWageArray.every(isAllFulltimeWage));

// Check if there is any part-time wage in the array
function isAnyParttimeWage(dailyWage) {
    return dailyWage.includes("80");
}
console.log("UC-7-F:Check if there is any part-time wage: " + mapDayWithWageArray.some(isAnyParttimeWage));

// Find number of days the employee worked (or) was present
function totalDaysWorked(numOfDays, dailyWage) {
    if (dailyWage > 0) return ++numOfDays;
    return numOfDays;
}
console.log("UC-7-G:Number of days Employee worked: " + empDailyWageArray.reduce(totalDaysWorked, 0));

// 8. Map Functions
console.log("UC-8-A:Daily Wage Map(as stored in Map): ");
for (let [day, wage] of empDailyWageMap) console.log("Day" + day + "  Wage:" + wage);
console.log("UC-8-B:Total Employee Wage (using Map): " + Array.from(empDailyWageMap.values()).reduce(totalWages, 0));

// 9. Arrow Functions
const findTotal = (totalValue, dailyValue) => { totalValue + dailyValue; }
let totalHours = Array.from(empDailyHoursMap.values())
    .filter(dailyHours => dailyHours > 0)
    .reduce(findTotal, 0);
let totalSalary = empDailyWageArray
    .filter(dailyWage => dailyWage > 0)
    .reduce(findTotal, 0);
console.log(`UC-9:Employee Wage with Arrow functions:  Total Working Hours: ${totalHours}  Total Wage: ${totalSalary}`);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();
empDailyHoursMap.forEach((value, key) => {
    if (value == 8) fullWorkingDays.push(key);
    else if (value == 4) partWorkingDays.push(key);
    else nonWorkingDays.push(key);
});
console.log(`Full Working Days: ${fullWorkingDays}
Part Working Days: ${partWorkingDays}
Non Working Days: ${nonWorkingDays}`);
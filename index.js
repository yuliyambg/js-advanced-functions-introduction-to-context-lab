// Your code here

function createEmployeeRecord(record) {
    let employeeRecord = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arr) {
    return arr.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, datestamp) {
    let [date, hour] = datestamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour)
    })

    return employee;
}

function createTimeOutEvent(employee, datestamp) {
    let [date, hour] = datestamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour)
    })

    return employee;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let endTime = employeeRecord.timeOutEvents.find(event => event.date === date);
    let startTime = employeeRecord.timeInEvents.find(event => event.date === date);

    return (endTime.hour - startTime.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(empRecord) {
    const allWages = empRecord.timeInEvents.map(event => wagesEarnedOnDate(empRecord, event.date));
    return allWages.reduce((total, wage) => total + wage);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(arr) {
    return arr.reduce(function(total, employee) {
        return total + allWagesFor(employee)
    }, 0)
}
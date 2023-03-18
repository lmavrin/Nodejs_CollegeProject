const format = require('date-fns/format');

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

var Employee = function(emp_name="", emp_no="", hire_date=format(new Date(), 'YYYY-MM-DD'),
    job="", salary=0.00, dept_id= null, mng_id=null, emp_id=null) {
    
    if (!(this instanceof Employee)) {
        throw new Error("Employee needs to be called with the new keyword");
    }

    this.emp_id=emp_id; 
    this.emp_name=emp_name; 
    this.emp_no=emp_no; 
    if (isValidDate(hire_date)) {
        this.hire_date=hire_date; 
    } else {
        this.hire_date=format(new Date(), 'YYYY-MM-DD')
    }
    this.job=job;
    this.salary=salary; 
    this.dept_id=dept_id; 
    this.mng_id = mng_id;
   
};

Employee.prototype.getId = function() {
    return this.emp_id;
}

Employee.prototype.getEmpName = function() {
    return this.emp_name; 
}

Employee.prototype.getEmpNo = function() {
    return this.emp_no;
}

Employee.prototype.getHireDate = function() {
    return this.hire_date;
}

Employee.prototype.getJob = function() {
    return this.job;
}

Employee.prototype.getSalary = function() {
    return this.salary;
}

Employee.prototype.getDeptId = function() {
    return this.dept_id;
}

Employee.prototype.getMngId = function() {
    return this.mng_id;
}

Employee.prototype.setId = function(newId) {
    this.emp_id = newId;
}

Employee.prototype.setEmpName = function(newEmpName) {
    this.emp_name = newEmpName;
}

Employee.prototype.setEmpNo = function(newEmpNo) {
    this.emp_no = newEmpNo;
}

Employee.prototype.setHireDate = function(newHireDate) {
    
    if (isValidDate(newHireDate)) {
        this.hire_date=newHireDate; 
    } else {
        this.hire_date=format(new Date(), 'YYYY-MM-DD')
    }
}

Employee.prototype.setJob = function(newJob) {
    this.job = newJob;
}

Employee.prototype.setSalary = function(newSalary) {
    this.salary = newSalary;
}

Employee.prototype.setDeptId = function(newDeptId) {
    this.dept_id = newDeptId;
}

Employee.prototype.setMngId = function(newMngId) {
    this.mng_id = newMngId;
}

module.exports = Employee;

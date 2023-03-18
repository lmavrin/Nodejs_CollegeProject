'use strict';

var MySql = require('sync-mysql');
 
var connection = new MySql({
  host: 'bdfvks-docker.ist.rit.edu',
  user: '576',
  password: '576',
  database: 'company'
});

var Department = require('./lib/department');
module.exports.Department = Department;
var Employee = require('./lib/employee');
module.exports.Employee = Employee;
var Timecard = require('./lib/timecard');
module.exports.Timecard = Timecard;

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    return d.toISOString().slice(0,10) === dateString;
};

function validateTime(strTime){
    var regex = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])");    
    if (regex.test(strTime)) {
        return true;
    } else {
        return false;
    }    
};

//************ delete all for a company

module.exports.deleteCompany = function(company) {
    const format = require('date-fns/format');
    if (!company || company.length === 0 || /^\s*$/.test(company)) {
        company = "n/a";
    } 
    var numRows = 0;
    var departments = getAllDepartment(company);
    var employees = getAllEmployee(company);

    //insert a new "manager" temporarily
    if (employees.length > 0) {

       var manager = new Employee("mgr delete","mgr delete",format(new Date(), 'YYYY-MM-DD'),
            "delete",0.00,employees[0].dept_id,null,null);

       manager = insertEmployee(manager);
       var id = manager.getId();
       for (var e of employees) {
          if (e.getId() != id) {
             e.setMngId(id);
             updateEmployee(e);
             
             //get and delete timecards
             var timecards = getAllTimecard(e.getId());
             for (var tc of timecards) {
                deleteTimecard(tc.getId());
                numRows++;
             }
          }
       }
       employees = getAllEmployee(company);
       for (var e of employees) {
          if (e.getId() != id) {
             deleteEmployee(e.getId());
             numRows++;
          }
       }                                           
       deleteEmployee(id);
       numRows++;
       
    } //delete employees  
    
    for(var d of departments) {
       deleteDepartment(company, d.getId());
       numRows++;
    }
    
    return numRows;
 
}

//Department

function getAllDepartment(company) {
    if (!company || company.length === 0 || /^\s*$/.test(company)) {
        company = "n/a";
    }     
    var results = connection.query("SELECT * FROM department WHERE company = ?",[company]);
    return results.map(d=> new Department(d.company,d.dept_name,d.dept_no,d.location,d.dept_id));
}
module.exports.getAllDepartment = getAllDepartment;

module.exports.getDepartment = function(company, dept_id) {
    if (!dept_id || !company) return null;
    var results = connection.query("SELECT * FROM department WHERE dept_id = ? AND company = ?",
        [dept_id,company]);

    if (results.length == 1) {
        return new Department(results[0].company,
                results[0].dept_name,results[0].dept_no,results[0].location,results[0].dept_id,);
    } else {
        return null;
    }
} 

module.exports.getDepartmentNo = function(company, dept_no) {
    if (!dept_no || !company) return null;
    var results = connection.query("SELECT * FROM department WHERE dept_no = ? AND company = ?",
        [dept_no,company]);

    if (results.length == 1) {
        return new Department(results[0].company,
                results[0].dept_name,results[0].dept_no,results[0].location,results[0].dept_id,);
    } else {
        return null;
    }
} 

module.exports.insertDepartment = function(inDept) {
    try {
        var results = connection.query("INSERT INTO department (company, dept_name, dept_no, location ) VALUES (?, ?, ?, ?)",
            [inDept.company,inDept.dept_name,inDept.dept_no,inDept.location]);
        results = connection.query("SELECT * FROM department WHERE dept_id = ?",
                    [results.insertId]);
        return new Department(results[0].company, results[0].dept_name,
            results[0].dept_no,results[0].location,results[0].dept_id);
    } catch (exception) {
        console.log(exception);
        return null;
    }
}

module.exports.updateDepartment = function(inDept) {
    try {
        var results = connection.query("UPDATE department SET dept_name = ?, dept_no = ?, location = ? WHERE dept_id = ?",
            [inDept.dept_name,inDept.dept_no,inDept.location,inDept.dept_id]);

        results = connection.query("SELECT * FROM department WHERE dept_id = ?",
                    [inDept.dept_id]);
        if (results.length == 1) {
            return new Department(results[0].company, results[0].dept_name,
                results[0].dept_no,results[0].location,results[0].dept_id);
        } else {
            return null;
        }
    } catch (exception) {
        console.log(exception);
        return null;
    }
}

function deleteDepartment(company,dept_id) {
    try {
        var results = connection.query("DELETE from department WHERE dept_id = ? AND company = ?",
            [dept_id,company]);

        return results.affectedRows;

    } catch (exception) {
        console.log(exception);
        return 0;
    }
}
module.exports.deleteDepartment = deleteDepartment;

//Employee

function insertEmployee(inEmp) {

    if (!inEmp.hire_date || !isValidDate(inEmp.hire_date)) {
        return null; 
    }

    try {
        var results = connection.query("INSERT INTO employee (emp_name, emp_no, hire_date, job, salary, dept_id, mng_id ) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [inEmp.emp_name,inEmp.emp_no,inEmp.hire_date,inEmp.job,inEmp.salary,inEmp.dept_id,inEmp.mng_id]);
        results = connection.query("SELECT * FROM employee WHERE emp_id = ?",
                    [results.insertId]);
        var d = new Date(results[0].hire_date);      
        var dString = d.toISOString().slice(0,10)   
        return new Employee(results[0].emp_name,results[0].emp_no,
            dString,results[0].job,results[0].salary,results[0].dept_id,
            results[0].mng_id,results[0].emp_id);
    } catch (exception) {
        console.log(exception);
        return null;
    }
}
module.exports.insertEmployee = insertEmployee;

function getAllEmployee(company) {
    if (!company || company.length === 0 || /^\s*$/.test(company)) {
        company = "n/a";
    }     
    var results = connection.query("SELECT * FROM employee LEFT JOIN department USING(dept_id) WHERE department.company = ?",
                    [company]);
    return results.map(e=> {
        var d = new Date(e.hire_date);      
        var dString = d.toISOString().slice(0,10)
        return new Employee(e.emp_name,e.emp_no,
        dString,e.job,e.salary,e.dept_id,e.mng_id,e.emp_id);
    });
}
module.exports.getAllEmployee = getAllEmployee;

module.exports.getEmployee = function(emp_id) {
    if (!emp_id ) return null;
    var results = connection.query("SELECT * FROM employee WHERE emp_id = ?",
        [emp_id]);

    if (results.length == 1) {
        var d = new Date(results[0].hire_date);      
        var dString = d.toISOString().slice(0,10)
        return new Employee(results[0].emp_name,results[0].emp_no,
            dString,results[0].job,results[0].salary,results[0].dept_id,
            results[0].mng_id,results[0].emp_id);
    } else {
        return null;
    }
} 

function updateEmployee(inEmp) {
    if (!inEmp.hire_date || !isValidDate(inEmp.hire_date)) {
        return null; 
    }
    try {
        var results = connection.query("UPDATE employee SET emp_name = ?, emp_no = ?, hire_date = ?, job = ?, salary = ?, dept_id = ?, mng_id = ? WHERE emp_id = ?",
            [inEmp.emp_name,inEmp.emp_no,inEmp.hire_date,inEmp.job,inEmp.salary,inEmp.dept_id,inEmp.mng_id,inEmp.emp_id]);
        results = connection.query("SELECT * FROM employee WHERE emp_id = ?",
            [inEmp.emp_id]);

        if (results.length == 1) {
            var d = new Date(results[0].hire_date);      
            var dString = d.toISOString().slice(0,10)
            return new Employee(results[0].emp_name,results[0].emp_no,
                dString,results[0].job,results[0].salary,results[0].dept_id,
                results[0].mng_id,results[0].emp_id);
        } else {
             return null;
        }

    } catch (exception) {
        console.log(exception);
        return null;
    }
}
module.exports.updateEmployee = updateEmployee;

function deleteEmployee(emp_id) {
    try {
        var results = connection.query("DELETE from employee WHERE emp_id = ?",
            [emp_id]);

        return results.affectedRows;

    } catch (exception) {
        console.log(exception);
        return 0;
    }
}
module.exports.deleteEmployee = deleteEmployee;

//Timecard

module.exports.insertTimecard = function(inTC) {
    const format = require('date-fns/format'); 
    var startParts = inTC.start_time.split(" ");
    if (!isValidDate(startParts[0]) || !validateTime(startParts[1])) {
        return null; 
    }
    var endParts = inTC.end_time.split(" ");
    if (!isValidDate(endParts[0]) || !validateTime(endParts[1])) {
        return null; 
    } 

    try {
        var results = connection.query("INSERT INTO timecard (start_time, end_time, emp_id ) VALUES (?, ?, ?)",
            [inTC.start_time,inTC.end_time,inTC.emp_id]);

        results = connection.query("SELECT * FROM timecard WHERE timecard_id = ?",
                    [results.insertId]);
        return new Timecard(format(results[0].start_time,"YYYY-MM-DD HH:mm:ss"),format(results[0].end_time,"YYYY-MM-DD HH:mm:ss"),
        results[0].emp_id,results[0].timecard_id);
    } catch (exception) {
        console.log(exception);
        return null;
    }
}


function getAllTimecard(emp_id) { 
    const format = require('date-fns/format');    
    var results = connection.query("SELECT * FROM timecard where emp_id = ?",
                    [emp_id]);
    return results.map(t=> new Timecard(format(t.start_time,"YYYY-MM-DD HH:mm:ss"),format(t.end_time,"YYYY-MM-DD HH:mm:ss"),
        t.emp_id,t.timecard_id));
}
module.exports.getAllTimecard = getAllTimecard;

module.exports.getTimecard = function(timecard_id) {
    const format = require('date-fns/format');
    if (!timecard_id ) return null;
    var results = connection.query("SELECT * FROM timecard WHERE timecard_id = ?",
        [timecard_id]);

    if (results.length == 1) {
        return new Timecard(format(results[0].start_time,"YYYY-MM-DD HH:mm:ss"),format(results[0].end_time,"YYYY-MM-DD HH:mm:ss"),
            results[0].emp_id,results[0].timecard_id);
    } else {
        return null;
    }
} 

module.exports.updateTimecard = function(inTC) {
    const format = require('date-fns/format');
    var startParts = inTC.start_time.split(" ");
    if (!isValidDate(startParts[0]) || !validateTime(startParts[1])) {
        return null; 
    }
    var endParts = inTC.end_time.split(" ");
    if (!isValidDate(endParts[0]) || !validateTime(endParts[1])) {
        return null; 
    }
    try {
        var results = connection.query("UPDATE timecard SET start_time = ?, end_time = ? WHERE timecard_id = ?",
            [inTC.start_time,inTC.end_time,inTC.timecard_id]);
            results = connection.query("SELECT * FROM timecard WHERE timecard_id = ?",
            [inTC.timecard_id]);
    
        if (results.length == 1) {
            return new Timecard(format(results[0].start_time,"YYYY-MM-DD HH:mm:ss"),format(results[0].end_time,"YYYY-MM-DD HH:mm:ss"),
                results[0].emp_id,results[0].timecard_id);
        } else {
            return null;
        }

    } catch (exception) {
        console.log(exception);
        return null;
    }
}

function deleteTimecard(timecard_id) {
    try {
        var results = connection.query("DELETE from timecard WHERE timecard_id = ?",
            [timecard_id]);

        return results.affectedRows;

    } catch (exception) {
        console.log(exception);
        return 0;
    }
}
module.exports.deleteTimecard = deleteTimecard;



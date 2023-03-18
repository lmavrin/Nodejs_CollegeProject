const dataLayer = require('companydata');

class Employee {
    get(emp_id){
        let response;
        if (emp_id){
            let result = dataLayer.getEmployee(emp_id);
            if(result) {
                response = {"Sucess":result};
            }else {
                response = {"error": "No employee found with  with id="+emp_id+'.'};
            }
        } else {
            response = { "error": "The employee id is missing." };
        }
        return response;
    }
    put(inEmp){
        let response;
            let checkData1 = dataLayer.getDepartment(inEmp.company,inEmp.dept_id);
            if(!checkData1)
                return { "error": "The department with number="+inEmp.dept_id+" dosen't exists." };
            if(inEmp.mng_id !== 0)
            {
                let managerIdCheck = dataLayer.getEmployee(inEmp.mng_id);
                if(!managerIdCheck){
                    return { "error": "Manager with the id="+inEmp.mng_id+" does not exist." };
                }
            }
            if(new Date(inEmp.hire_date) > new Date())
                return { "error": "Can not be hired in the future" };
            if(new Date(inEmp.hire_date).getDay() === 0 || new Date(inEmp.hire_date).getDay() === 6)
                return { "error": "The hire date can not be Saturday or Sunday" };
            let checkData3 = dataLayer.getAllEmployee(inEmp.company);
            if(checkData3.map(department => department.emp_no).includes(inEmp.emp_no))
                return { "error": "The Employee with number="+inEmp.emp_no+" already exists." };
            let checkData2 = dataLayer.getAllEmployee(inEmp.company);
            if(checkData2.map(employee => employee.emp_id === inEmp.emp_id)){
                dataLayer.insertEmployee(inEmp);
                response = {"Sucess":"Data was inserted"};
                }
            else
              return { "error": "The employee id="+inEmp.emp_id+" does not exist." };
            
                
        
        return response;
        
    }
    post(inEmp){
        let response;
            let checkData1 = dataLayer.getDepartment(inEmp.company,inEmp.dept_id);
            if(!checkData1)
                return { "error": "The department with number="+inEmp.dept_id+" dosen't exists." };
            if(inEmp.mng_id > 0)
            {
                let managerIdCheck = dataLayer.getEmployee(inEmp.mng_id);
                if(!managerIdCheck){
                    return { "error": "Manager with the id="+inEmp.mng_id+" does not exist." };
                }
            }
            if(new Date(inEmp.hire_date) > new Date())
                return { "error": "Can not be hired in the future" };
            if(new Date(inEmp.hire_date).getDay() === 0 || new Date(inEmp.hire_date).getDay() === 6)
                return { "error": "The hire date can not be Saturday or Sunday" };
            let checkData3 = dataLayer.getAllEmployee(inEmp.company);
            if(checkData3.map(department => department.emp_no).includes(inEmp.emp_no))
                return { "error": "The Employee with number="+inEmp.emp_no+" already exists." };
            dataLayer.insertEmployee(inEmp);
        
            response = {"Sucess":"Data was submitted."};
        
        return response;
    }
    delete(emp_id){
        let response;
            let result = dataLayer.deleteEmployee(emp_id);
            if(result.length === 1) {
                response = {"Sucess":"The employee was deleted."};
            }else {
                response = {"error": "Unable to delete the employee with id= "+emp_id};
            }
        
        return response;
    }
}

module.exports = new Employee();


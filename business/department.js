const dataLayer = require('companydata');

class Department {
    get(company,dept_id){
        let response;
        if (company && dept_id){
            let result = dataLayer.getDepartment(company,dept_id);
            if(result) {
                response = {"Sucess":result};
            }else {
                response = {"error": "No department found for " + company + ' with id='+dept_id+'.'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }
    put(inDept){
        let response;
        if (inDept){
            let checkData1 = dataLayer.getDepartment(inDept.company,inDept.dept_id);
            if(!checkData1)
                return { "error": "The department with id="+inDept.dept_id+" dosen't exist." };
            
            let checkData2 = dataLayer.getAllDepartment(inDept.company);
            if(checkData2.map(department => department.dept_no).includes(inDept.dept_no))
                return { "error": "The department with number="+inDept.dept_no+" already exists." };
            let result = dataLayer.updateDepartment(inDept);
            if(result) {
                response = {"Sucess":result};
            }else {
                response = {"error": "Department number already exist."};
            }
        
        } else {
            response = { "error": "The JSON data is missing." };
        }
        return response;
        
    }
    post(inDept){
        let response;
            
            let checkData2 = dataLayer.getAllDepartment(inDept.company);
            if(checkData2.map(department => department.dept_no).includes(inDept.dept_no))
                return { "error": "The department with number="+inDept.dept_no+" already exists." };
            dataLayer.insertDepartment(inDept);
            response = {"Sucess":"Data was submitted"};
        
        return response;
    }
    delete(company,dept_id){
        let response;
        if (company && dept_id){
            let result = dataLayer.deleteDepartment(company,dept_id);
                response = {"Sucess":"The department was deleted."};
        } else {
            response = { "error": "The comapny name or department is missing." };
        }
        return response;
    }
}

module.exports = new Department();


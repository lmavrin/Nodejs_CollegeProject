const dataLayer = require('companydata');

class Departments {
    get(company){
        let response;
        if (company){
            let result = dataLayer.getAllDepartment(company);
            if(result) {
                response = {"Sucess":result};
            }else {
                response = {"error": "No departments found for " + company + '.'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }
}

module.exports = new Departments();


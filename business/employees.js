const dataLayer = require('companydata');

class Employees {
    get(company){
        let response;
        if (company){
            let result = dataLayer.getAllEmployee(company);
            if(result.length > 0) {
                response = {"Sucess":result};
            }else {
                response = {"error": "No Employees found for " + company + '.'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }
}

module.exports = new Employees();


const dataLayer = require('companydata');

class Timecards {
    get(emp_id){
        let response;
        if (emp_id){
            let result = dataLayer.getAllTimecard(emp_id);
            if(result.length > 0) {
                response = {"Sucess":result};
            }else {
                response = {"error": "No Timecards found for employee with id= " + emp_id + '.'};
            }
        } else {
            response = { "error": "The employee id is missing." };
        }
        return response;
    }
}

module.exports = new Timecards();


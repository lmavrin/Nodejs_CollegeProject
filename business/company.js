const dataLayer = require('companydata');

class Company {
    delete(company){
        let response;
        if (company){
            let result = dataLayer.deleteCompany(company);
            if(result) {
                response = {"Sucess": "Company " + company + ' was deleted .'};
            }else {
                response = {"error": "Company " + company + ' wasnt deleted because company dosent exist or the name is wrong.'};
            }
        } else {
            response = { "error": "The comapny name is missing." };
        }
        return response;
    }
}

module.exports = new Company();


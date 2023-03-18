const dataLayer = require('companydata');
const HOUR = 1000 * 60 * 60;

class Employee {
    get(timecard_id){
        let response;
        if (timecard_id){
            let result = dataLayer.getTimecard(timecard_id);
            if(result) {
                response = {"Sucess":result};
            }else {
                response = {"error": "No timecard found with with id="+timecard_id+'.'};
            }
        } else {
            response = { "error": "The timecard id is missing." };
        }
        return response;
    }
    put(inTimecard){
        let response;
            let checkData3 = dataLayer.getEmployee(inTimecard.emp_id);
            const startingDate = new Date(inTimecard.start_time);
            const endingDate = new Date(inTimecard.end_time);
            if(!checkData3)
                return { "error": "The employee id="+inTimecard.emp_id+" does not exist in your company." };
            if(startingDate.getDay() === 0 || startingDate.getDay() === 6)
                return { "error": "The start time can not be Saturday or Sunday" };
            if(endingDate.getDay() === 0 || endingDate.getDay() === 6)
                return { "error": "The end time can not be Saturday or Sunday" };
            var anHourAgo = new Date(inTimecard.start_time);
            anHourAgo += (2 * 60 * 60 * 1000);
            if(endingDate.getHours() < new Date(anHourAgo).getHours())
                return { "error": "The end time is not an hour before the start time." };
            if(endingDate.getDay() !== startingDate.getDay())
                return { "error": "The end time iand the start time are not in the same day." };
            var date = new Date();
            date.setDate(date.getDate() - 7);
            if(startingDate.getDate( ) < date.getDate())
                return { "error": "The start time is not within the past 7 days." };
            if(startingDate.getHours() < 8 || endingDate.getHours()>16)
                return { "error": "The time is not within the working times." };
            if(startingDate >= new Date())
                return { "error": "The start time is not valid because it is in the future." };
            let checkData5 = dataLayer.getAllTimecard(inTimecard.emp_id);
            if(checkData5.map(department => department.start_time).includes(inTimecard.start_time))
                return { "error": "The timecard with start time ="+inTimecard.start_time+" already exists." };
            const checkData1 =dataLayer.getTimecard(inTimecard.timecard_id);
            if(checkData1 === 0)
                return { "error": "The timecard with the id="+inTimecard.timecard_id+" dosen't exist." };
            dataLayer.insertTimecard(inTimecard);
                response = {"Sucess":"Data was submitted."};
        
        return response;
        
    }
    post(inTimecard){
        let response;
            let checkData3 = dataLayer.getEmployee(inTimecard.emp_id);
            const startingDate = new Date(inTimecard.start_time);
            const endingDate = new Date(inTimecard.end_time);
            if(!checkData3)
                return { "error": "The employee id="+inTimecard.emp_id+" does not exist in your company." };
            if(startingDate.getDay() === 0 || startingDate.getDay() === 6)
                return { "error": "The start time can not be Saturday or Sunday" };
            if(endingDate.getDay() === 0 || endingDate.getDay() === 6)
                return { "error": "The end time can not be Saturday or Sunday" };
            var anHourAgo = new Date(inTimecard.start_time);
            anHourAgo += (2 * 60 * 60 * 1000);
            if(endingDate.getHours() <= new Date(anHourAgo).getHours())
                return { "error": "The end time is not an hour before the start time." };
            if(endingDate.getDay() !== startingDate.getDay())
                return { "error": "The end time and the start time are not in the same day." };
            var date = new Date();
            date.setDate(date.getDate() - 7);
            if(startingDate < date)
                return { "error": "The start time is not within the past 7 days." };
            if(startingDate.getHours() < 8 || endingDate.getHours()>16)
                return { "error": "The time is not within the working times." };
            let checkData4 = dataLayer.getAllEmployee(inTimecard.emp_id);
            if(checkData4.map(department => department.start_time).includes(inTimecard.start_time))
                return { "error": "The timecard with start time ="+inTimecard.start_time+" already exists." };
            if(startingDate >= new Date())
                return { "error": "The start time is not valid because it is in the future."};
            dataLayer.insertTimecard(inTimecard);
                response = {"Sucess":"Data was submitted."};
        
        return response;
    }
    delete(timecard_id){
        let response;
        if (timecard_id){
            dataLayer.deleteTimecard(timecard_id);
            response = {"Sucess":"The Timecard was deleted."};
            
        } else {
            response = { "error": "The timecard id is missing." };
        }
        return response;
    }
}

module.exports = new Employee();


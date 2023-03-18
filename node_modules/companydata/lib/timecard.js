const format = require('date-fns/format');

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

function validateTime(strTime) {
    var regex = new RegExp("([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])");    
    if (regex.test(strTime)) {
        return true;
    } else {
        return false;
    }    
}

var Timecard = function(start_time=format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                        end_time=format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                        emp_id= 0, timecard_id=null) {
    
    if (!(this instanceof Timecard)) {
        throw new Error("Timecard needs to be called with the new keyword");
    }

    this.emp_id=emp_id; 
    this.timecard_id=timecard_id; 
    var startParts = start_time.split(" ");
    if (isValidDate(startParts[0]) && validateTime(startParts[1])) {
        this.start_time=start_time; 
    } else {
        this.start_time=format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
    var endParts = end_time.split(" ");
    if (isValidDate(endParts[0]) && validateTime(endParts[1])) {
        this.end_time=end_time; 
    } else {
        this.end_time=format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
   
};

Timecard.prototype.getId = function() {
    return this.timecard_id;
}

Timecard.prototype.getStartTime = function() {
    return this.start_time;
}

Timecard.prototype.getEndTime = function() {
    return this.end_time;
}

Timecard.prototype.getEmpId = function() {
    return this.emp_id;
}

Timecard.prototype.setId = function(newId) {
    this.timecard_id = newId;
}

Timecard.prototype.setStartTime = function(newStartTime) {
    var startParts = newStartTime.split(" ");
    if (isValidDate(startParts[0]) && validateTime(startParts[1])) {
        this.start_time=newStartTime; 
    } else {
        this.start_time=format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
}

Timecard.prototype.setEndTime = function(newEndTime) {
    var endParts = newEndTime.split(" ");
    if (isValidDate(endParts[0]) && validateTime(endParts[1])) {
        this.end_time=newEndTime; 
    } else {
        this.end_time=format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }}

Timecard.prototype.setEmpId = function(newEmpId) {
    this.emp_id = newEmpId;
}

module.exports = Timecard;


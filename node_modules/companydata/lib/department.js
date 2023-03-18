var Department = function(company="", dept_name ="", dept_no="", location="",dept_id=null) {
    
    if (!(this instanceof Department)) {
        throw new Error("Department needs to be called with the new keyword");
    }

    this.company = company;
    this.dept_id = dept_id;
    this.dept_name = dept_name;
    this.dept_no = dept_no;
    this.location = location;
   
};

Department.prototype.getCompany = function() {
    return this.company;
}

Department.prototype.getId = function() {
    return this.dept_id;
}

Department.prototype.getDeptName = function() {
    return this.dept_name;
}

Department.prototype.getDeptNo = function() {
    return this.dept_no;
}

Department.prototype.getLocation = function() {
    return this.location;
}

Department.prototype.setCompany = function(newCompany) {
    this.company = newCompany;
}

Department.prototype.setDeptId = function(newDeptId) {
    this.dept_id = newDeptId;
}

Department.prototype.setDeptName = function(newDeptName) {
    this.dept_name = newDeptName;
}

Department.prototype.setDeptNo = function(newDeptNo) {
    this.dept_no = newDeptNo;
}

Department.prototype.setLocation = function(newLocation) {
    this.location = newLocation;
}

module.exports = Department;


const express = require('express');
const app = express();
const port = 3000;
const departmentsRouter = require('./routes/departments');
const departmentRouter = require('./routes/department');
const companyRouter = require('./routes/company');
const employeesRouter = require('./routes/employees');
const employeeRouter = require('./routes/employee');
const timecardsRouter = require('./routes/timecards');
const timecardRouter = require('./routes/timecard');
const basePath = '/MavrinLP3/CompanyServices';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(basePath + '/departments', departmentsRouter);
app.use(basePath + '/department', departmentRouter);
app.use(basePath + '/employees', employeesRouter);
app.use(basePath + '/employee', employeeRouter);
app.use(basePath + '/timecards', timecardsRouter);
app.use(basePath + '/timecard', timecardRouter);
app.use(basePath + '/company', companyRouter);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
let employees = [];
let nextId = 1;

app.get("/employees", (req, res) => {
    res.json(employees);
});

app.post("/employees", (req, res) => {

    const employee = {
        id: nextId++,
        ...req.body 
    };
     
    employees.push(employee);

    res.status(201).json({
        message: "Employee added successfully",
        employee 
    });
});
app.put("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);

    if(!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.name = req.body.name;
    employee.department = req.body.department;
    employee.salary = req.body.salary;

    res.json({
        message: "Employee updated successfully",
        employee 
    });
});
 
app.delete("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employees.splice(index, 1);

    res.json({
        message: "Employee deleted successfully"
    });

});


app.get("/", (req, res) => {
    res.send("Welcome to Employee Management Backend");

});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);

});

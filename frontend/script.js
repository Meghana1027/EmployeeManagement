const form = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;

    const li = document.createElement("li");

    li.textContent = `${name} | ${department} | ₹${salary}`;
    employeeList.appendChild(li);

    form.reset();
});


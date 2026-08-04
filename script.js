let employees = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    employees = data;

    // اگر از طریق لینک ?id= وارد شده باشد
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      showEmployee(id);
    }
  })
  .catch(error => {
    console.log(error);
  });


function searchEmployee() {

  const id = document.getElementById("searchId").value.trim();

  showEmployee(id);

}


function showEmployee(id) {

  const person = employees.find(item => item.id === id);

  if (person) {

    document.getElementById("name").textContent = person.name;
    document.getElementById("national").textContent = person.national;
    document.getElementById("job").textContent = person.job;
    document.getElementById("area").textContent = person.area;

    if (person.photo) {
      document.getElementById("photo").src = person.photo;
    }

  } else {

    document.querySelector(".card").innerHTML =
    "<h2 style='text-align:center;padding:30px'>اطلاعات پیدا نشد</h2>";

  }

}

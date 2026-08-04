const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data.json")
  .then(response => response.json())
  .then(data => {

    const person = data.find(item => item.id === id);

    if(person){

      document.getElementById("name").textContent = person.name;
      document.getElementById("national").textContent = person.national;
      document.getElementById("job").textContent = person.job;
      document.getElementById("area").textContent = person.area;
      document.getElementById("photo").src = person.photo;

    } else {

      document.querySelector(".card").innerHTML =
      "<h2 style='text-align:center;padding:30px'>اطلاعات پیدا نشد</h2>";

    }

  })
  .catch(error => {
    console.log(error);
  });

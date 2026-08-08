let employees = [];

fetch("./data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("data.json پیدا نشد");
    }
    return response.json();
  })
  .then(data => {

    console.log("DATA:", data);

    employees = data;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      showEmployee(id);
    }

  })
  .catch(error => {
    console.error("ERROR:", error);
  });


function searchEmployee() {

  const id = document
    .getElementById("searchId")
    .value
    .trim();

  showEmployee(id);

}


function showEmployee(id) {

  console.log("جستجوی کد:", id);

  const person = employees.find(
    item => String(item.id).trim() === String(id).trim()
  );

  if (!person) {

    alert("اطلاعات این کد پیدا نشد: " + id);

    return;
  }


  document.getElementById("name").textContent =
    person.name || "";

  document.getElementById("national").textContent =
    person.national || "";

  document.getElementById("job").textContent =
    person.job || "";

  document.getElementById("area").textContent =
    person.area || "";


  const photo = document.getElementById("photo");

  photo.style.display = "block";

  photo.src = "./photos/" + person.id + ".webp";


  photo.onerror = function () {

    console.error(
      "عکس پیدا نشد:",
      "./photos/" + person.id + ".webp"
    );

  };


  const qr = document.getElementById("qrcode");

  qr.innerHTML = "";

  new QRCode(qr, {

    text:
      "https://mahan131313.github.io/employee-id-card/?id=" +
      person.id,

    width: 120,

    height: 120

  });

}

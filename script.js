let employees = [];

// دریافت اطلاعات از data.json
fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("خطا در دریافت data.json");
    }
    return response.json();
  })
  .then(data => {

    employees = data;

    // بررسی وجود id در آدرس
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      showEmployee(id);
    }

  })
  .catch(error => {
    console.error("خطا:", error);
  });


// جستجوی پرسنل
function searchEmployee() {

  const id = document
    .getElementById("searchId")
    .value
    .trim();

  showEmployee(id);
}


// نمایش اطلاعات پرسنل
function showEmployee(id) {

  const person = employees.find(
    item => String(item.id) === String(id)
  );

  if (!person) {

    document.querySelector(".card").innerHTML =
      "<h2 style='text-align:center;padding:30px'>اطلاعات پیدا نشد</h2>";

    return;
  }


  // اطلاعات پرسنل
  document.getElementById("name").textContent =
    person.name || "";

  document.getElementById("national").textContent =
    person.national || "";

  document.getElementById("job").textContent =
    person.job || "";

  document.getElementById("area").textContent =
    person.area || "";


  // =========================
  // نمایش عکس WebP
  // =========================

  const photo = document.getElementById("photo");

  photo.src = "photos/" + person.id + ".webp";


  // اگر عکس پیدا نشد
  photo.onerror = function () {

    console.log(
      "عکس پیدا نشد:",
      "photos/" + person.id + ".webp"
    );

    photo.style.display = "none";
  };


  // =========================
  // ساخت QR Code
  // =========================

  const qrContainer =
    document.getElementById("qrcode");

  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {

    text:
      "https://mahan131313.github.io/employee-id-card/?id=" +
      person.id,

    width: 120,

    height: 120

  });

}

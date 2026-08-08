let employees = [];

// =========================
// رمز مدیریت
// =========================

const ADMIN_PASSWORD = "1379";


// =========================
// ورود مدیر
// =========================

function checkPassword() {

  const password =
    document.getElementById("adminPassword").value;

  if (password === ADMIN_PASSWORD) {

    document.getElementById("searchBox").style.display = "flex";

    document.getElementById("adminPassword").value = "";

    alert("ورود موفق بود");

  } else {

    alert("رمز اشتباه است");

  }

}


// =========================
// دریافت اطلاعات از data.json
// =========================

fetch("data.json")
  .then(response => {

    if (!response.ok) {
      throw new Error("خطا در دریافت data.json");
    }

    return response.json();

  })
  .then(data => {

    employees = data;

    // اگر لینک ?id= داشته باشد
    const params =
      new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (id) {
      showEmployee(id);
    }

  })
  .catch(error => {

    console.error("خطا:", error);

  });


// =========================
// جستجوی پرسنل
// =========================

function searchEmployee() {

  const id =
    document
      .getElementById("searchId")
      .value
      .trim();

  showEmployee(id);

}


// =========================
// نمایش اطلاعات پرسنل
// =========================

function showEmployee(id) {

  const person = employees.find(
    item => String(item.id) === String(id)
  );


  if (!person) {

    document.querySelector(".card").innerHTML =
      "<h2 style='text-align:center;padding:30px'>اطلاعات پیدا نشد</h2>";

    return;

  }


  // نام
  document.getElementById("name").textContent =
    person.name || "";


  // کد ملی
  document.getElementById("national").textContent =
    person.national || "";


  // شغل
  document.getElementById("job").textContent =
    person.job || "";


  // محدوده کاری
  document.getElementById("area").textContent =
    person.area || "";


  // عکس
  const photo =
    document.getElementById("photo");

  photo.style.display = "block";

  photo.src =
    "photos/" + person.id + ".webp";


  // اگر عکس پیدا نشد
  photo.onerror = function () {

    console.log(
      "عکس پیدا نشد:",
      "photos/" + person.id + ".webp"
    );

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

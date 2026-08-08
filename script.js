let employees = [];

// =========================
// رمز مدیریت
// =========================

const ADMIN_PASSWORD = "8564";


// =========================
// ورود مدیر
// =========================

function checkPassword() {

  const password =
    document.getElementById("adminPassword").value.trim();

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

fetch("./data.json")
  .then(response => {

    if (!response.ok) {
      throw new Error("خطا در دریافت data.json");
    }

    return response.json();

  })
  .then(data => {

    employees = data;

    console.log("تعداد پرسنل:", employees.length);
    console.log("اولین پرسنل:", employees[0]);

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

  if (!id) {

    alert("لطفاً کد شناسایی را وارد کنید");

    return;

  }

  showEmployee(id);

}


// =========================
// نمایش اطلاعات پرسنل
// =========================

function showEmployee(id) {

  // تبدیل 1 به 001
  const searchId =
    String(id).trim().padStart(3, "0");

  console.log("کد جستجو:", searchId);


  // پیدا کردن شخص
  const person = employees.find(item => {

    const personId =
      String(item.id).trim().padStart(3, "0");

    return personId === searchId;

  });


  // اگر پیدا نشد
  if (!person) {

    document.querySelector(".card").innerHTML =
      "<h2 style='text-align:center;padding:30px'>اطلاعات پیدا نشد</h2>";

    console.log(
      "این کد پیدا نشد:",
      searchId
    );

    return;

  }


  console.log(
    "پرسنل پیدا شد:",
    person
  );


  // =========================
  // اطلاعات پرسنل
  // =========================

  document.getElementById("name").textContent =
    person.name || "";

  document.getElementById("national").textContent =
    person.national || "";

  document.getElementById("job").textContent =
    person.job || "";

  document.getElementById("area").textContent =
    person.area || "";


  // =========================
  // نمایش عکس
  // =========================

  const photo =
    document.getElementById("photo");

  photo.style.display = "block";

  photo.src =
    "photos/" + searchId + ".webp";


  photo.onerror = function () {

    console.log(
      "عکس پیدا نشد:",
      "photos/" + searchId + ".webp"
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
      searchId,

    width: 120,

    height: 120

  });

}

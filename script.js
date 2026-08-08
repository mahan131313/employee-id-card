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

    console.log("وضعیت data.json:", response.status);

    if (!response.ok) {
      throw new Error("خطا در دریافت data.json");
    }

    return response.json();

  })
  .then(data => {

    employees = data;

    // تست اطلاعات
    console.log("DATA:", data);
    console.log("تعداد پرسنل:", employees.length);
    console.log("اولین پرسنل:", employees[0]);
    console.log("ID اولین نفر:", employees[0]?.id);


    // =========================
    // بررسی اینکه data آرایه است
    // =========================

    if (!Array.isArray(employees)) {

      console.error("data.json باید شامل یک آرایه باشد");

      return;

    }


    // =========================
    // اگر لینک ?id= داشته باشد
    // =========================

    const params =
      new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (id) {

      console.log("ID دریافت شده از لینک:", id);

      showEmployee(id);

    }

  })
  .catch(error => {

    console.error("خطا در خواندن data.json:", error);

  });


// =========================
// جستجوی پرسنل
// =========================

function searchEmployee() {

  const input =
    document.getElementById("searchId");

  if (!input) {

    console.error("عنصر searchId در HTML پیدا نشد");

    return;

  }


  const id =
    input.value.trim();


  if (!id) {

    alert("لطفاً کد شناسایی را وارد کنید");

    return;

  }


  console.log("کد وارد شده:", id);

  showEmployee(id);

}


// =========================
// نمایش اطلاعات پرسنل
// =========================

function showEmployee(id) {

  // تبدیل مثلاً 1 به 001
  const searchId =
    String(id)
      .trim()
      .padStart(3, "0");


  console.log("کد نهایی برای جستجو:", searchId);


  // =========================
  // پیدا کردن شخص
  // =========================

  const person =
    employees.find(item => {

      const personId =
        String(item.id)
          .trim()
          .padStart(3, "0");

      console.log(
        "مقایسه:",
        personId,
        "با",
        searchId
      );

      return personId === searchId;

    });


  // =========================
  // اگر پیدا نشد
  // =========================

  if (!person) {

    console.log(
      "این کد در data.json پیدا نشد:",
      searchId
    );


    const card =
      document.querySelector(".card");


    if (card) {

      card.innerHTML =
        "<h2 style='text-align:center;padding:30px'>اطلاعات پیدا نشد</h2>";

    }


    return;

  }


  // =========================
  // شخص پیدا شد
  // =========================

  console.log("پرسنل پیدا شد:", person);


  // =========================
  // نمایش نام
  // =========================

  const name =
    document.getElementById("name");

  if (name) {

    name.textContent =
      person.name || "";

  }


  // =========================
  // نمایش کد ملی
  // =========================

  const national =
    document.getElementById("national");

  if (national) {

    national.textContent =
      person.national || "";

  }


  // =========================
  // نمایش شغل
  // =========================

  const job =
    document.getElementById("job");

  if (job) {

    job.textContent =
      person.job || "";

  }


  // =========================
  // نمایش محدوده کاری
  // =========================

  const area =
    document.getElementById("area");

  if (area) {

    area.textContent =
      person.area || "";

  }


  // =========================
  // نمایش عکس
  // =========================

  const photo =
    document.getElementById("photo");


  if (photo) {

    photo.style.display = "block";

    photo.src =
      "photos/" + searchId + ".webp";


    photo.onerror = function () {

      console.log(
        "عکس پیدا نشد:",
        "photos/" + searchId + ".webp"
      );

    };

  }


  // =========================
  // ساخت QR Code
  // =========================

  const qrContainer =
    document.getElementById("qrcode");


  if (qrContainer) {

    qrContainer.innerHTML = "";


    new QRCode(qrContainer, {

      text:
        "https://mahan131313.github.io/employee-id-card/?id=" +
        searchId,

      width: 120,

      height: 120

    });

  }

}

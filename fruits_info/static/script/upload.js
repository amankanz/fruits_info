// const upload_button = document.getElementById("uploadButton");
// const file_input = document.getElementById("fileInput");

// upload_button.addEventListener("click", function () {
//   file_input.click();
// });

// file_input.addEventListener("change", function (ev) {
//   const file = ev.target.files[0];

//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       let imageData = e.target.result;
//       localStorage.setItem("imageData", imageData);
//       window.location.href = detailspage_Url;
//     };
//     reader.readAsDataURL(file);
//   }
// });


// redo

document.addEventListener("DOMContentLoaded", function () {
  const upload_button = document.getElementById("uploadButton");
  const file_input = document.getElementById("fileInput");

  upload_button.addEventListener("click", function () {
    file_input.click();
  });

  file_input.addEventListener("change", function (ev) {
    const file = ev.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        let imageData = e.target.result;
        localStorage.setItem("imageData", imageData);
        window.location.href = detailspageUrl;  // Access the global variable
      };
      reader.readAsDataURL(file);
    }
  });
});

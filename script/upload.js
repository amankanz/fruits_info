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
      window.location.href = "./fruit_info.html";
    };
    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const upload_button = document.getElementById("uploadButton");
  const file_input = document.getElementById("fileInput");
  const spinner = document.getElementById("spinner");
  const body = document.getElementsByTagName("body")[0];

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

        // Show the spinner
        body.classList.add("body-second-style");
        spinner.style.display = "block";

        fetch(detailspageUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ imageData: imageData }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .then((data) => {
            // console.log("Success:", data);
            window.location.href = detailspageUrl; // Redirect to the details page
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            // Hide the spinner once the data is fetched or an error occurs
            body.classList.remove("body-second-style");
            spinner.style.display = "none";
          });
      };
      reader.readAsDataURL(file);
    }
  });
});

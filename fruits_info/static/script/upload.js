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

  // Code added
  function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookie.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrf_token = getCookie("csrftoken");

  upload_button.addEventListener("click", function () {
    file_input.click();
  });
  ////////

  file_input.addEventListener("change", function (ev) {
    const file = ev.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        let imageData = e.target.result;
        localStorage.setItem("imageData", imageData);
        // window.location.href = detailspageUrl; // Access the global variable

        // Code added
        fetch(detailspageUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
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
            console.log("Success:", data);
            window.location.href = detailspageUrl; // Redirect to the details page
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  });
});

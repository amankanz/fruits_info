
document.addEventListener("DOMContentLoaded", function () {
  const camera_button = document.getElementById("cameraButton");
//   console.log('csrf:' + csrftoken);
//   console.log('next:' + detailspageUrl)

  if (camera_button) {
      camera_button.addEventListener("click", function () {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices
                  .getUserMedia({ video: true })
                  .then(function (stream) {
                      let video = document.createElement("video");
                      video.srcObject = stream;
                      video.play();
                      document.body.appendChild(video);

                      let captureButton = document.createElement("button");
                      captureButton.innerText = "Capture";
                      document.body.appendChild(captureButton);

                      captureButton.addEventListener("click", function () {
                          let canvas = document.createElement("canvas");
                          canvas.width = video.videoWidth;
                          canvas.height = video.videoHeight;
                          let context = canvas.getContext("2d");
                          context.drawImage(video, 0, 0, canvas.width, canvas.height);

                          stream.getTracks().forEach((track) => track.stop());

                          let imageData = canvas.toDataURL("image/png");
                          localStorage.setItem("imageData", imageData);

                          fetch(detailspageUrl, {
                              method: "POST",
                              headers: {
                                  "Content-Type": "application/json",
                                  "X-CSRFToken": csrftoken,
                              },
                              body: JSON.stringify({ imageData: imageData }),
                          })
                              .then(response => {
                                  if (response.ok) {
                                      return response.json();
                                  } else {
                                      throw new Error('Network response was not ok');
                                  }
                              })
                              .then(data => {
                                //   console.log("Success:", data);
                                  window.location.href = detailspageUrl; // redirect to the details page
                              })
                              .catch((error) => {
                                  console.error("Error:", error);
                              });
                      });
                  })
                  .catch(function (error) {
                      console.log("An error occurred: " + error);
                  });
          } else {
              alert("Your browser can't access camera");
          }
      });
  } else {
      console.error("Camera button not found");
  }
});

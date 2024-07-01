// Camera Button
const camera_button = document.getElementById("cameraButton");
const fruit_box = document.getElementById("fruitBox");

camera_button.addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        // Create a video element to display the camera stream
        let video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        // Insert the video element into the page (for demo purposes)
        document.body.appendChild(video);

        // Add a button to capture the image (optional)
        let captureButton = document.createElement("button");
        captureButton.innerText = "Capture";
        document.body.appendChild(captureButton);

        captureButton.addEventListener("click", function () {
          // Create a canvas element to capture the image
          let canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          let context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Stop the video stream
          stream.getTracks().forEach((track) => track.stop());

          // Temporary store image
          let imageData = canvas.toDataURL("image/png");
          localStorage.setItem("imageData", imageData);
          window.location.href = "./fruit_info.html";
        });
      })
      .catch(function (error) {
        console.log("An error occurred: " + error);
      });
  } else {
    alert("Your browser can't access camera");
  }
});

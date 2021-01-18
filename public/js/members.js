$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  $("#file-upload").click(() => {
    event.preventDefault();
    const form = $("#fileUploadForm")[0];
    const data = new FormData(form);
    $.ajax({
      type: "POST",
      data: data,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      cache: false,
      url: "/upload",

      success: function(data) {
        $("#result").text("picture uploaded.");
        console.log("SUCCESS : ", data);
        $("#file-upload").prop("disabled", false);
      },
      error: function(e) {
        $("#result").text("ERROR: PNG files only!");
        console.log("ERROR : ", e);
        $("#file-upload").prop("disabled", false);
      }
    });
  });
});

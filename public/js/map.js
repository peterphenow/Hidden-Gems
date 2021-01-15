$(document).ready(() => {
  let map;
  let marker;
  let newMarkerLatitude;
  let newMarkerLongitude;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 44.9778, lng: -93.265 },
      zoom: 10,
    });
  }

  initMap();
  displayMarkersOnMap();

  // need to cycle through our maps database and place those markers on the map

  google.maps.event.addListener(map, "click", (event) => {
    placeMarker(map, event.latLng);
  });

  function placeMarker(map, location) {
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    const marker = new google.maps.Marker({
      position: location,
      /* animation:google.maps.Animation.BOUNCE, */
      map: map,
    });
    newMarkerLatitude = location.lat();

    newMarkerLongitude = location.lng();
    console.log({ newMarkerLatitude }, { newMarkerLongitude });
    marker.addListener("click", (event) => {
      // when you click an existing marker it will display the info in the marker info window
      console.log("hi");

      /*  const infowindow = new google.maps.InfoWindow({
      content:
        "Latitude: " + location.lat() + "<br>Longitude: " + location.lng()
    }); */
      /* infowindow.open(map, marker); */
    });
  }

  $("#subby").on("click", () => {
    // write marker information to database
    const newMarkerName = $("#marker-name").val();

    const newMarkerInfo = $("#marker-info").val();
    event.preventDefault();
    const markerData = {
      markerName: newMarkerName.trim(),
      markerLatitude: newMarkerLatitude,
      markerLongitude: newMarkerLongitude,
      markerInfo: newMarkerInfo.trim(),
    };

    addNewMarker(
      markerData.markerName,
      markerData.markerLatitude,
      markerData.markerLongitude,
      markerData.markerInfo
    );

    /* emailInput.val("");
    passwordInput.val(""); */
  });

  function displayMarkersOnMap() {
    $.get("/api/showmarkers", function(response) {
      console.log(response);
    });
  }

  function addNewMarker(name, lat, lng, info) {
    $("#myPopup").css("visibility", "hidden");
    $.post("/api/addmarker", {
      markerName: name,
      markerLatitude: lat,
      markerLongitude: lng,
      markerInfo: info,
    })
      .then(() => {
        // show data in info window
        console.log(newMarkerName);
        console.log(newMarkerLocation);
        console.log(newMarkerCreatedAt);
        console.log(newMarkerInfo);
        // close the add marker window
      })
      // If there's an error, handle it by throwing up a bootstrap alert
      .catch((err) => console.log(err));
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  // display new marker information
});

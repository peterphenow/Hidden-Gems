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
    const newMarker = new google.maps.Marker({
      position: location,
      /* animation:google.maps.Animation.BOUNCE, */
      map: map,
    });
    newMarkerLatitude = location.lat();

    newMarkerLongitude = location.lng();
    console.log({ newMarkerLatitude }, { newMarkerLongitude });

    newMarker.addListener("click", () => {
      map.setZoom(15);
      map.setCenter(newMarker.getPosition());
      console.log(newMarker.title);
      console.log(newMarker.customInfo);

      const markerInfoStuff = `
        
          <h2>Marker Info<h2>
          <h3>Marker Name: ${newMarker.title}</h3>
          <h3>Marker Location: Lat:${newMarker.customInfo[0].lat} Lng: ${newMarker.customInfo[0].lng}</h3>
          <h3>Marker Created at: </h3>
          <h3>Marker Information: ${newMarker.customInfo[1]}</h3>
        
      
        `;

      document.querySelector("#infoBox").innerHTML = markerInfoStuff;
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

    addNewMarker(markerData.markerName, markerData.markerLatitude, markerData.markerLongitude, markerData.markerInfo);

    /* emailInput.val("");
    passwordInput.val(""); */
  });

  function displayMarkersOnMap() {
    $.get("/api/showmarkers", (response) => {
      console.log(response);

      response.forEach((marker) => {
        const myLatLng = {
          lat: parseFloat(marker.markerLatitude),
          lng: parseFloat(marker.markerLongitude),
        };
        const newMarker = new google.maps.Marker({
          position: myLatLng,
          /* animation:google.maps.Animation.BOUNCE, */
          map: map,
          title: marker.markerName,
          customInfo: [myLatLng, marker.markerInfo],
        });
        newMarker.addListener("click", () => {
          map.setZoom(15);
          map.setCenter(newMarker.getPosition());
          console.log(newMarker.title);
          console.log(newMarker.customInfo);

          const markerInfoStuff = `
          
            <h2>Marker Info<h2>
            <h3>Marker Name: ${newMarker.title}</h3>
            <h3>Marker Location: Lat:${newMarker.customInfo[0].lat} Lng: ${newMarker.customInfo[0].lng}</h3>
            <h3>Marker Created at: </h3>
            <h3>Marker Information: ${newMarker.customInfo[1]}</h3>
          
        
          `;

          document.querySelector("#infoBox").innerHTML = markerInfoStuff;
        });
      });
    });
  }

  function addNewMarker(name, lat, lng, info) {
    // close the add marker window
    $("#myPopup").css("visibility", "hidden");
    $.post("/api/addmarker", {
      markerName: name,
      markerLatitude: lat,
      markerLongitude: lng,
      markerInfo: info,
    })
      .then(() => {
        // show data in info window
        console.log("done");
      })
      // If there's an error, handle it by throwing up a bootstrap alert
      .catch((err) => console.log(err));
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  // display new marker information
});

// closes the popup window
$("#close").on("click", () => {
  const popup = document.getElementById("myPopup");
  popup.classList.remove("show");
});

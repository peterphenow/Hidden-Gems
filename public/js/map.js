$(document).ready(() => {
  let map;
  let newMarkerLatitude;
  let newMarkerLongitude;
  let finalLatitude = 44.9778;
  let finalLongitude = -93.265;
  let prevInfoWindow = false;

  getLocation();

  async function initMap() {
    console.log("initializing map...");
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: finalLatitude, lng: finalLongitude },
      zoom: 10
    });
    await displayMarkersOnMap();
    console.log("x");
    google.maps.event.addListener(map, "click", event => {
      console.log("clicked");
      placeMarker(map, event.latLng);
    });
  }

  function getLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(navigator.geolocation.getCurrentPosition(showPosition));
    } else {
      finalLatitude = 44.9778;
      finalLongitude = -93.265;
    }
  }

  function showPosition(position) {
    console.log(position);
    finalLatitude = position.coords.latitude;
    finalLongitude = position.coords.longitude;
    console.log(finalLongitude);
    console.log(finalLatitude);
    initMap();
  }

  // need to cycle through our maps database and place those markers on the map

  function placeMarker(map, location) {
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    newMarkerLatitude = location.lat();

    newMarkerLongitude = location.lng();
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
      markerInfo: newMarkerInfo.trim()
    };

    addNewMarker(
      markerData.markerName,
      markerData.markerLatitude,
      markerData.markerLongitude,
      markerData.markerInfo
    );
    const myLatLng = {
      lat: parseFloat(markerData.markerLatitude),
      lng: parseFloat(markerData.markerLongitude)
    };
    const newMarker = new google.maps.Marker({
      icon: "./../images/gem-solid.png",
      position: myLatLng,
      /* animation:google.maps.Animation.BOUNCE, */
      map: map,
      title: $("#marker-name").val(),
      customInfo: [event.latLng, $("#marker-info").val()]
    });
    console.log("-----------------------new marker addeD");

    newMarker.addListener("click", () => {
      const contentString = `
      <div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${markerData.markerName}</h1>
      <div id="bodyContent">
      <p><b>${markerData.markerName}</b>, ${markerData.markerInfo}</p>
      <p>Location: ${markerData.markerLatitude}, ${markerData.markerLongitude} </p>
      </div> 
      </div>`;

      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      if (prevInfoWindow) {
        prevInfoWindow.close();
      }

      prevInfoWindow = infowindow;
      infowindow.open(map, newMarker);
      map.setCenter(newMarker.getPosition());
      console.log(newMarker.title);
      console.log(newMarker.customInfo);
      console.log(newMarker);

      const markerInfoStuff = `
      
        <h2>Gem Info<h2>
        <h3>Gem Name: ${markerData.markerName}</h3>
        <h3>Gem Location: Lat:${markerData.markerLatitude} Lng: ${markerData.markerLongitude}</h3>
        <h3>Gem Information: ${markerData.markerInfo}</h3>
              
    
      `;

      document.querySelector("#infoBox").innerHTML = markerInfoStuff;
    });
    location.reload();
    // refresh map so data appears when clicking the new marker
    /* location.reload(); */

    /* emailInput.val("");
    passwordInput.val(""); */
  });

  function displayMarkersOnMap() {
    $.get("/api/showmarkers", response => {
      console.log(response);

      response.forEach(marker => {
        const myLatLng = {
          lat: parseFloat(marker.markerLatitude),
          lng: parseFloat(marker.markerLongitude)
        };
        const newMarker = new google.maps.Marker({
          position: myLatLng,
          id: marker.id,
          icon: randomGem(),
          /* animation:google.maps.Animation.BOUNCE, */
          map: map,
          title: marker.markerName,
          customInfo: [myLatLng, marker.markerInfo]
        });
        newMarker.addListener("click", () => {
          const contentString = `

  <div id="content">
  <div id="siteNotice">
  </div>
  <h1 id="firstHeading" class="firstHeading" style="color: silver;">
  ${newMarker.title}
  </h1>
  <div id="bodyContent">
  <h4 style="color: silver;">Gem ID: <span id="marker-id">${newMarker.id}</span>
  <p style="color: silver;">
  <b>${newMarker.title}</b>, ${newMarker.customInfo[1]}</p>
  <p style="color: silver;">Location: ${newMarker.customInfo[0].lat.toFixed(
    2
  )}, ${newMarker.customInfo[0].lng.toFixed(2)} </p>
  </div> 
  </div>



  
  
  `;

          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          if (prevInfoWindow) {
            prevInfoWindow.close();
          }

          prevInfoWindow = infowindow;
          infowindow.open(map, newMarker);
          map.setCenter(newMarker.getPosition());
          console.log(newMarker.title);
          console.log(newMarker.customInfo);
          console.log(newMarker);

          /*  const markerInfoStuff = `
          
            <h2>Gem Info<h2>
            <h3>Gem ID: <span id="marker-id">${newMarker.id}</span></h3>
            <h3>Gem Name: ${newMarker.title}</h3>
            <h3>Gem Location: Lat:${newMarker.customInfo[0].lat} Lng: ${newMarker.customInfo[0].lng.toFixed()}</h3>
            <h3>Gem Information: ${newMarker.customInfo[1]}</h3>
                  
        
          `; */

          document.querySelector("#infoBox").innerHTML = contentString;
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
      markerInfo: info
    })
      .then(() => {
        // show data in info window
        console.log("done");
      })
      // If there's an error, handle it by throwing up a bootstrap alert
      .catch(err => console.log(err));
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  // display new marker information
});
function randomGem() {
  const img = [
    "blue-gem.png",
    "brown-gem.png",
    "gem-solid.png",
    "green-gem.png",
    "grey-gem.png",
    "orange-gem.png",
    "pink-gem.png",
    "purple-gem.png",
    "red-gem.png"
  ];
  const num = Math.floor(Math.random() * img.length);
  const gem = img[num];
  const gemStr = "./../images/" + gem;
  return gemStr;
}

// closes the popup window
$("#close").on("click", () => {
  const popup = document.getElementById("myPopup");
  popup.classList.remove("show");
  location.reload();
});

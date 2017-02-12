var map;
var positionArray = [];
var drawerIsOpen = false;
var showShawWifi = false;

function initialize() {

 var myOptions = { zoom: 20, mapTypeId: google.maps.MapTypeId.ROADMAP, 	mapTypeControlOptions: {
	      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
	    } }; 
 map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

 //alert(mySpots);

 var geoXml = new google.maps.KmlLayer("http://www.plus15.ca/map/CALGIS.FAC_PLUS_FIFTEEN-2012.kmz");

 geoXml.setMap(map);

  var aboutControlDiv = document.createElement('DIV');
  var aboutControl = new AboutControl(aboutControlDiv, map);

  aboutControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(aboutControlDiv);

  var centerMapControlDiv = document.createElement('DIV');
  var centerMapControl = new CenterMapControl(centerMapControlDiv, map);

  centerMapControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerMapControlDiv);

  var locationControlDiv = document.createElement('DIV');
  var locationControl = new LocationControl(locationControlDiv, map);

  locationControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationControlDiv);

  setupSlideDrawer();

  loadShawWifi(map);

}

function loadShawWifi(map) {

  if(showShawWifi)
  {
    $.getJSON(
      "/locations/", function(data) {
        plotPoints(data, map);
      }
    );  
  }
  
}

function plotPoints(data, map) {
  $.each(data, function(key, value) {
    var myLatlng = new google.maps.LatLng(value.Latitude,value.Longitude);

    var pinIcon = new google.maps.MarkerImage(
          '/images/wifi.png',
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new google.maps.Size(30, 38)
    );

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: pinIcon
    });

    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">' + value.Name + '</h1>'+
    '<div id="bodyContent">'+
    '</div>'+
    '</div>';

    
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close();
    })

  });
}

function setupSlideDrawer() {

  $('#drawerhandle').click(function() {

    if(drawerIsOpen)
    {
      $('#drawerhandle').animate({
        height: "5%"
      }, 'fast' );
      $('#drawercontent').animate({
        height: "0%"
      }, 'fast' );
    }
    else
    {
      $('#drawerhandle').animate({
        height: "25%",
      }, 'fast' );
      $('#drawercontent').animate({
        height: "20%",
      }, 'fast' );  
    }

    drawerIsOpen = !drawerIsOpen;
  });
  
}

function CenterMapControl(controlDiv, googleMap) {
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to center back on the +15.';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = 'Center';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    alert('CENTER!');
  });
} 

function AboutControl(controlDiv, googleMap) {
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to find out about this application.';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = 'About';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    alert('Calgary +15 Navigation Application.  Contact jsauter@gmail.com with any questions. No guarantees on accuracy or navigation implied.');
  });

}

function LocationControl(controlDiv, googleMap) {

  trackPosition = false;
  map = googleMap;
  var currentLocationId;
  this.UpdatePosition = UpdatePosition;

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to find your location.';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.style.paddingTop = "4px";
  SetLocationServices(false);
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    trackPosition = !trackPosition;
    SetLocationServices(trackPosition);
  });

  function SetLocationServices(state)
  {
	if(state == true)
	{
		controlText.innerHTML = '<img src=\"images/colourIconSmall.gif\" >';
		if(trackPosition && navigator.geolocation) 
		{ 
			browserSupportFlag = true; 
			currentLocationId =	navigator.geolocation.watchPosition(UpdatePosition); 
		}
	}
	else
	{
		controlText.innerHTML = '<img src=\"images/greyIconSmall.gif\" >';
		if(!trackPosition && navigator.geolocation) 
		{ 
			browserSupportFlag = true; 
			navigator.geolocation.clearWatch(currentLocationId); 
		}
	}
  }

 function UpdatePosition(position){ 
	
	if (positionArray) {
	    for (i in positionArray) {
	      positionArray[i].setMap(null);
	    }
	    positionArray.length = 0;
	  }
	
	initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude); 
	map.setCenter(initialLocation); 
	map.setZoom(16);

	var image = new google.maps.MarkerImage(
	  'images/image.png',
	  new google.maps.Size(40,36),
	  new google.maps.Point(0,0),
	  new google.maps.Point(20,36)
	);

	var shadow = new google.maps.MarkerImage(
	  'images/shadow.png',
	  new google.maps.Size(62,36),
	  new google.maps.Point(0,0),
	  new google.maps.Point(20,36)
	);
	
	var shape = {
	  coord: [24,0,27,1,28,2,30,3,31,4,33,5,33,6,34,7,35,8,35,9,36,10,36,11,37,12,37,13,37,14,38,15,38,16,38,17,38,18,38,19,38,20,37,21,37,22,37,23,36,24,36,25,35,26,35,27,34,28,33,29,33,30,31,31,30,32,29,33,27,34,24,35,16,35,13,34,11,33,10,32,9,31,7,30,6,29,6,28,5,27,5,26,4,25,4,24,3,23,3,22,3,21,3,20,3,19,2,18,2,17,3,16,3,15,3,14,3,13,3,12,4,11,4,10,5,9,6,8,6,7,7,6,7,5,9,4,10,3,11,2,13,1,16,0,24,0],
	  type: 'poly'
	};

	var marker = new google.maps.Marker({
	  draggable: false,
	  icon: image,
	  shadow: shadow,
	  shape: shape,
	  map: map,
	  position: initialLocation
	});
	
	positionArray.push(marker);
   }

}




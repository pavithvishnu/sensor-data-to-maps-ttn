function initMap() {
    var cbe = { lat: 13.0827, lng: 80.2707 };
    var options = { zoom: 17, center: cbe };
    var map = new google.maps.Map(document.getElementById('map'), options);
    var a = 0;
// --------------------Data file---------------------------
    var file =
    {
        person_1:
        {
            hr: 30,
            temp: 32.45,
            loc: { lat: 13.0827, lng: 80.2707 }
        },
        person_2:
        {
            hr: 80,
            temp: 70,
            loc: { lat: 13.0800, lng: 80.2700 }
        },
        person_3:
        {
            hr: 79,
            temp: 85,
            loc: { lat: 13.0820, lng: 80.2710 }
        },
        person_4:
        {
            hr: 79,
            temp: 35.60,
            loc: { lat: 13.0810, lng: 80.2710 }
        }
    }
// --------------------validatory functions-------------------
    function heart_valid(i) {
        if (65 <i.hr && i.hr<90) {
            return true;
        }
        else {
            return false;
        }
    }
    function temp_valid(i) {
        if (65 < i.temp && i.temp< 100) {
            return true;
        }
        else {
            return false;
        }
    }
// -----------------------internal data-------------------------------------
    var data =
    {
        person_1: {
            position: {},
            iconImage: { url: '', scaledSize: new google.maps.Size(50, 50) },
            content:'',
            text: "kalai",
        },
        person_2: {
            position: {},
            iconImage: { url: '', scaledSize: new google.maps.Size(50, 50) },
            content: '',
            text:"arjun"
        },
        person_3: {
            position: {},
            iconImage: { url: '', scaledSize: new google.maps.Size(50, 50) },
            content: '',
            text:"venkat"
        },
        person_4: {
            position: {},
            iconImage: { url: '', scaledSize: new google.maps.Size(50, 50) },
            content: '',
            text:"Mano"
        }
    };
// ----------------------------main validatory function-----------------------------------
    function valid() {
        for (i in file) {
            if (heart_valid(file[i]) && temp_valid(file[i])) {
                data[i].iconImage.url='https://raw.githubusercontent.com/Kalai-Stark/hello-world/master/d.png';
            }
            else{
                data[i].iconImage.url='https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclusterer/images/m3.png';  
            }
            data[i].position= file[i].loc;
            information = '<p class="tt"><i class="fas fa-heart"></i> '+ String(file[i].hr)+'</p><p class="ts"><i class="fas fa-temperature-high"></i> '+String(file[i].temp)+'</p>'
            data[i].content = information;
        }
    }
// ---------------------------calling the function------------------------------------------
    valid();
// ---------------------------markers-----------------------------------------------------
    var m = [];
    function mark(props) {
        var marker = new google.maps.Marker
            ({
                position: props.position,
                map: map,
                icon: props.iconImage,
                label: props.text
            })
        m.push(marker);
        var infowindow = new google.maps.InfoWindow({content:props.content});
        marker.addListener("mouseover",function(){infowindow.open(map,marker)});
        marker.addListener("mouseout",function(){infowindow.close()}); 
    }
    for (person in data) {
        // console.log(data[person]);
        mark(data[person]);
    }
    // --------------------------marker clustering-------------------------------------
    var markerCluster = new MarkerClusterer(map, m,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}



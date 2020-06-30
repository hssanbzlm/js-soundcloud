var UI = {};
UI.onKeyUp = function () {
  document.querySelector("input").addEventListener("keyup", function (e) {

    var input = document.querySelector("input").value;
    if (e.which === 13) {
      document.querySelector(".search-results").innerHTML = "";
      SoundCloudAPI.getTrack(input);
    }



  });
}

UI.onClick = function () {
  var submitButton = document.getElementsByClassName("js-submit")[0];
  submitButton.addEventListener("click", function () {
    document.querySelector(".search-results").innerHTML = "";
    SoundCloudAPI.getTrack(document.querySelector("input").value)

  })
}


var SoundCloudAPI = {};
SoundCloudAPI.init = function () {
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}

SoundCloudAPI.getTrack = function (search) {
  SC.get('/tracks', {
    q: search
  }).then(function (tracks) {
    SoundCloudAPI.renderTracks(tracks);

  });
}

SoundCloudAPI.renderTracks = function (tracks) {

  tracks.forEach(function (track) {
    console.log(track);

    var card = document.createElement("div");
    var divClassImg = document.createElement("div");
    var divClassContent = document.createElement("div");
    var divClassHeader = document.createElement("div");
    var divClassUiBottom = document.createElement("div");
    divClassUiBottom.addEventListener("click", function () {
      SoundCloudAPI.addToPlayList(track.permalink_url);


    })
    var iElement = document.createElement("i");
    var spanElement = document.createElement("span");
    var aElement = document.createElement("a");
    var img = document.createElement("img");
    img.src = track.artwork_url || "http://lorempixel.com/200/200/";
    aElement.href = track.permalink_url;
    aElement.target = "_blank";
    aElement.innerHTML = track.permalink;
    img.classList.add("image-img");
    divClassImg.classList.add("image");
    divClassImg.appendChild(img);
    spanElement.innerHTML = "Add to playlist";
    divClassContent.classList.add("content");
    divClassHeader.classList.add("header");
    divClassHeader.appendChild(aElement);
    divClassContent.appendChild(divClassHeader);
    iElement.classList.add("add", "icon");
    divClassUiBottom.classList.add("ui", "bottom", "attached", "button", "js-button")
    divClassUiBottom.appendChild(iElement);
    divClassUiBottom.appendChild(spanElement);
    card.classList.add("card");
    card.appendChild(divClassImg);
    card.appendChild(divClassContent);
    card.appendChild(divClassUiBottom);
    var searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);



  })

}

SoundCloudAPI.addToPlayList = function (url) {
  SC.oEmbed(url, {
    auto_play: true
  }).then(function (embed) {

    var div = document.createElement("div");
    div.innerHTML = embed.html;
    var sidebar = document.querySelector(".js-playlist");
    sidebar.insertBefore(div, sidebar.firstChild);
    localStorage.setItem("playlist", sidebar.innerHTML);

  });
}

var sidebar = document.querySelector(".js-playlist");
sidebar.innerHTML = localStorage.getItem("playlist");
SoundCloudAPI.init();
UI.onClick();
UI.onKeyUp();

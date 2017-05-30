$(document).ready(function(){

  var channelArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                      "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

  channelArray.forEach(function(channel){
    // call channels endpoint for channel info
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/' + channel,
      headers: {
       'Client-ID': 'd1tracbxmumod4m0rwzxbqo2erscf7'
      },
      success: function(data) {
        // clone from template
        var card = document.getElementById("template").cloneNode(true);
        // set id, link
        card.id = channel;
        card.querySelector("a").innerHTML = channel;
        card.querySelector("a").setAttribute("href", data.url);

        // append to DOM
        document.querySelector('.jumbotron').appendChild(card);

        // set current logo if possible
        if (!data.logo) {
          card.querySelector(".logo").setAttribute("src", "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png");
        }
        else {
          card.querySelector(".logo").setAttribute("src", data.logo);
        }

        // update streamingStatus
        updateStreamingStatus(channel);
     },
     error: function(data) {
       // clone from template
       var card = document.getElementById("template").cloneNode(true);
       // set id, link
       card.id = channel;
       card.querySelector("a").innerHTML = channel;
       card.querySelector("a").setAttribute("href", "#");

       // append to DOM
       document.querySelector('.jumbotron').appendChild(card);
       card.querySelector(".logo").setAttribute("src", "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png");
       card.querySelector("#streamingStatus").innerHTML = " does not exist";
     }
    });

  });

})

function updateStreamingStatus(channel) {
  // call streams endpoint for streaming info
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + channel,
    headers: {
     'Client-ID': 'd1tracbxmumod4m0rwzxbqo2erscf7'
    },
    success: function(data) {
     if (data.stream) {
       console.log(data);
       document.getElementById(channel).querySelector("#streamingStatus").innerHTML = " is LIVE streaming " + data.stream.game + " with " + data.stream.viewers +" viewers";
     }
     else {
       document.getElementById(channel).querySelector("#streamingStatus").innerHTML = " is OFFLINE";
     }
    }
  });
}

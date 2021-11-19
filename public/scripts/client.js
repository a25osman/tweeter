/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//cross site scripting protection
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creating tweet html
const createTweetElement = function (data) {
  const tweethtml =
  `<article class="tweet">
    <header>
      <p><img src=${data.user.avatars}>${data.user.name}</p>
      <p>${data.user.handle}</p>
    </header>

    <div class="tweet-content">
      <p>${escape(data.content.text)}</p>
    </div>

    <footer>
      <p>${timeago.format(data.created_at)}</p>
      <div class="icons-container">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`
  return tweethtml;
}

// create render tweets function: fortaking in an array of tweet objects and then appending each one to the #tweets-container
const renderTweets = array => {
  for (let userData of array.reverse()){
    const $tweet = createTweetElement(userData); 
    $('#tweets-container').append($tweet);
  }
}


// Render html tweets to page and submit tweets to api
$(document).ready(function() {

  //load tweets and receive array of tweets as json
  const loadtweets = () => {
    $.get("http://localhost:8080/tweets").then(data => {
      renderTweets(data);      
    });
  }

  $(".errmsg").hide()
  // Event Listener
  $('form').on('submit', event => {
    event.preventDefault(); 

    if(event.target.text.value.length === 0) {
      $(".2long").hide()
      $(".2short").show()
      $(".errmsg").slideDown()
      return false;
    } else if (event.target.text.value.length > 140) {
      $(".2short").hide()
      $(".2long").show()
      $(".errmsg").slideDown()
      return false;
    } else {

      // Serialize submission
      $(".errmsg").hide()
      const val = $(event.target.text).serialize();
      $.post( "/tweets", val).then(data => {
        $(`#tweets-container`).empty()
        loadtweets();
        $('form').trigger("reset") //clear form after submission
        $("#tweet-text").siblings("div").find(".counter").html(140);
      });
    }
  });

  loadtweets();
});

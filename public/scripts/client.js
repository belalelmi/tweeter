$(document).ready(function () {
  const loadTweets = function () {
    $.ajax("/tweets")
      .then(function (response) {
        renderTweets(response);
      });
  };
  loadTweets();
  $('#errorPrompt').hide();

  const renderTweets = (tweetData) => {
    $("#tweet-container").empty();
    for (let tweets of tweetData) {
      let $tweet = createTweetElement(tweets);
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = (tweetData) => {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $tweeter = `
  <article>
<div id="tweetDiv">
  <header class="secondHeader">
    <div class="tweetDiv">
      <img src="${tweetData.user["avatars"]}">
      <p id="uName">${tweetData.user["name"]}</p>
    </div>
    <span id="atName">${tweetData.user["handle"]}</span>
  </header>
  <main id="tweetBody">
    <span>${escape(tweetData.content["text"])}</span>
    <hr>
  </main>
  <footer class="newfooter">
    <div class="divTweet">
      <span class="span2">${timeago.format(tweetData.created_at)}</span>
      <div class="divTweet2">
        <span><i id="flag" class="fas fa-flag"></i></span>
        <span><i id="sendAgain" class="fas fa-retweet"></i></span>
        <span><i id="heart" class="fas fa-heartbeat"></i></span>
      </div>
    </div>
  </footer>
</div>
</article>`;
    return $tweeter;
  };

  $('#scroller').on('submit', function (evt) {
    evt.preventDefault();
    const tweet = $("#tweet-text").val().trim().length;

    if (!tweet) {
      $('#errorPrompt').text("Tweet cannot be empty! Don't be shy, we don't bite :) ");
      $('#errorPrompt').slideDown("slow");
      $('#errorPrompt').delay(3500).slideUp("slow");
      return;
    }
    if (tweet > 140) {
      $('#errorPrompt').text("Tweet can't be longer than 140 characters!");
      $('#errorPrompt').slideDown("slow");
      $('#errorPrompt').delay(5000).slideUp("slow");
      return;
    } else {
      const val = $(this).serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: val,
      })
        .then(() => {
          loadTweets();
          $("#tweet-text").val("");
        });
    }
  });
});
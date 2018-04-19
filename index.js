const youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';

function getYoutubeAPIData(searchTerm, callback) {
    const query = {
        'maxResults': '25',
        'part': 'snippet',
        'q': `${searchTerm} in:title`,
        'type': '',
        key: 'AIzaSyCupOr5yMar9NAYa9Q9ekak_ewMFmsvru4'
    }
    $.getJSON(youtubeSearchURL, query, callback);
}

function renderResult(result) {
    return `
    <div class="js-result-container col-6">
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
      </h2>
      <p>
      uploaded by <a class="js-user-name" href="https://www.youtube.com/user/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
      </p>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
      <img src="${result.snippet.thumbnails.default.url}">
    </a>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val('');
        getYoutubeAPIData(query, displayYoutubeSearchData);
    });
}

$(watchSubmit);
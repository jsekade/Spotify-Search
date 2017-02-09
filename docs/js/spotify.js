
$(document).ready(function(){
$('form').on('submit',function(e){
    console.log(e);
    e.preventDefault();
    var data={};
    data.name = $('input[name=name]').val();
    console.log(data.name);

       $.ajax({
            url: "https://api.spotify.com/v1/search?type=track&query="+data.name,
            success: showTracks,
            error: function(error){
                console.log("Error!");
                console.log(error.responseText);
            },
        });
});
});



function showTracks(tracks){
  var tracksearch = tracks.tracks.items[0];
  console.log(tracksearch)
  
  var title = $('.title');
  var track = tracksearch.name;
  title.html(track);
  
  var author = $('.author');
  var artist = tracksearch.artists[0].name;
  author.html(artist);

  var cover = $('.cover img');
  var image = tracksearch.album.images[0].url;
  cover.attr("src", image);


  var preview_url = tracksearch.preview_url;  

  //play audio

  $('.js-player').attr("src", preview_url);
  
  $( ".btn-play" ).removeClass( "disabled" )
  
  $('.btn-play').on('click', function(){
        if($(this).hasClass('playing')){
            $('.js-player').trigger('pause');
            $('.btn-play').removeClass('playing')
        }else{
            $('.js-player').trigger('play')
            $('.btn-play').addClass('playing')
        }
    });

  //bar time update
  $('.js-player').on('timeupdate', printTime);

};




//Player's current time
function printTime () {
  var current = $('.js-player').prop('currentTime');
      $('.seekbar progress').attr("value",Math.trunc(current));
};
console.log("Success: ");



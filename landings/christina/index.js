window.addEventListener('load', () => {
    installPlayer();

    runUserFeed();

    registerSmoothHref();
});
window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

const runUserFeed = () => {
    var userFeed = new Instafeed({
        get: 'user',
        userId: '8987997106',
        clientId: '924f677fa3854436947ab4372ffa688d',
        accessToken: '8987997106.924f677.8555ecbd52584f41b9b22ec1a16dafb9',
        resolution: 'standard_resolution',
        template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
        sortBy: 'most-recent',
        limit: 4,
        links: false
    });
    userFeed.run();
};

const registerSmoothHref = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.dir(e.target.hash);
            var target = document.querySelector(e.target.hash);
            console.log(target);
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

const installPlayer = () => {
    Amplitude.init({
        "bindings": {
            37: 'prev',
            39: 'next',
            32: 'play_pause'
        },
        "songs": [
            {
                "name": "Episode 1",
                "artist": "Christina Leong",
                "album": "Love in the modern world",
                "url": "assets/ep1.mp3",
                "cover_art_url": "assets/podcast-artwork.png"
            }
        ]
    });

    /*
  Handles a click on the song played progress bar.
*/
    document.getElementById('song-played-progress').addEventListener('click', function( e ){
        var offset = this.getBoundingClientRect();
        var x = e.pageX - offset.left;

        Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
    });
};
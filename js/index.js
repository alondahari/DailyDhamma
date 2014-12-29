var app = {
    // Application Constructor
    initialize: function() {
        this.headerElement = document.getElementById('startAgain');
        this.clock = document.getElementsByClassName('clock')[0];

        this.getResources(['bChant', 'bInst', 'eBeHappy', 'eChant', 'metta']);
        this.bindEvents();
    },
    getResources: function (res) {
        var r;
        for (r in res){
            this[res[r]] = '/android_asset/www/assets/' + res[r] + '.mp3';
        }
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady);
        this.headerElement.addEventListener('click', this.startAgain);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('device ready');
        try {
            app.playback = new Media(app.bChant, app.mediaSuccess, app.mediaError);
        } catch (e){
            console.log(e);
        }
    },
    startAgain: function() {
        app.headerElement.className += ' hidden';
        console.log(app.playback);
        try{
            app.playback.play();
        } catch(e) {
            console.log(e);
        }
        app.clock.className = 'clock';
        var tick = setInterval(app.countdown, 1000);
    },
    mediaSuccess: function () {
        alert('success!');
    },
    mediaError: function (e) {
        console.log(e);
    },
    countdown: function () {
        var currentTime = app.clock.textContent,
            mins = parseInt(currentTime.substr(0, 2), 10),
            secs = parseInt(currentTime.substr(3, 2), 10);

        if (!secs) {
            secs = 60;
            mins--;
        }
        if (!mins) {
            // endSession();
        }
        secs--;
        currentTime = mins + ':' + secs;
        // format text
        currentTime = currentTime.replace(/\b(\d)\b/g, '0$1');
        app.clock.textContent = currentTime;
    }
};
app.initialize();

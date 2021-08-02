axios.defaults.baseURL = 'https://autumnfish.cn';

var app = new Vue({
    el: "#container",
    data: {
        query: '',
        isPoint: false,
        musicList: [],
        musicUrl: '',
        isPlay: false,
        hotComments: [],
        coverUrl: '',
        showVideo: false,
        mvUrl: '',
    },
    methods: {
        searchMusic: function () {
            if (this.query === 0)
                return;
            axios.get('/search?keywords=' + this.query).then(response => {
                console.log(response);
                this.musicList = response.data.result.songs;
            })
            this.query = '';
        },

        playMusic(musicId) {
            axios.get('/song/url?id=' + musicId).then(response => {
                this.musicUrl = response.data.data[0].url
                this.isPoint = true
            })

            axios.get('/comment/hot?type=0&id=' + musicId).then(response => {
              this.hotComments = response.data.hotComments
            })
            axios.get('/song/detail?ids=' + musicId).then(response => {
              this.coverUrl = response.data.songs[0].al.picUrl
            })
    
        },
        play() {
            this.isPlay = true
            this.mvUrl = ''
        },
        pause() {
            this.isPlay = false
        },
        playMv(vid) {
            if (vid) {
              this.showVideo = true;
              axios.get('/mv/url?id=' + vid).then(response => {
                this.$refs.audio.pause()
                this.mvUrl = response.data.data.url
              })
            }
        },
        closeMv() {
            this.showVideo = false
            this.$refs.video.pause()
        },
        /*historySearch(history) {
            this.query = history
            this.searchMusic()
            this.showHistory = false;
        },*/
    
    }
})
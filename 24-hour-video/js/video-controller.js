var videoController = {
	data: {
	    config: null
	},
  uiElements: {
      videoCardTemplate: null,
      videoList: null
  },
	init: function(config) {
		this.uiElements.videoCardTemplate = $('#video-template');
		this.uiElements.videoList = $('#video-list');

		this.data.config = config;

    this.getVideoList();
    this.wireEvents();
  },
  wireEvents: function(){
    $('#video-list').on('click', 'li', ()=>{
      console.log($(this).text())
      $('source').attr('src', $(this).text());
      $('video').load();
    })
  },
	getVideoList: function() {
		var that = this;
    var url = this.data.config.getFileListApiUrl + '/videos';//?encoding=' + encodeURIComponent('720p');
		$.get(url, function(data, status){
      that.updateVideoFrontpage(data);
		});
	},
	updateVideoFrontpage: function(data) {
    var baseUrl = data.domain;
    console.log(baseUrl)
    var bucket = data.bucket;
    console.log(data)
		for (var i = 0; i < data.urls.length; i++) {
        var video = data.urls[i];
        console.log(video.Key)
				var clone = this.uiElements.videoCardTemplate.clone().attr('id', 'video-' + i);
				clone.find('source')
						 .attr('src', `https://${bucket}.s3.amazonaws.com/${video.Key}`);
				this.uiElements.videoList.prepend(clone);
		}
	}
}
// https://zzid-video-transcoded.s3.amazonaws.com/Screen+Recording+2020-10-27+at+5-1080p.mp4
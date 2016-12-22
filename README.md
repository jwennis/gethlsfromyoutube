# gethlsfromyoutube
A simple chrome extension to retrieve the HLS URL for live Youtube streams.

## About
Inspired by this comment on [stackoverflow](http://stackoverflow.com/a/35631022)

>Take your video id and make a `GET` request to the `get_video_info` endpoint

>In the response, the `hlsvp` value will be the link to the m3u8 HLS playlist

The HLS playlist can be useful for several reasons, including:
* Playback in a media player such as VLC (File -> Open Network Stream)
* Playback directly in a web browser, either natively or with help of a [third party extension](https://chrome.google.com/webstore/detail/native-hls-playback/emnphkkblegpebimobpbekeedfgemhof)
* Integration with [Android TV Live Channels](https://play.google.com/store/apps/details?id=com.google.android.tv) via [Cumulus TV](https://play.google.com/store/apps/details?id=com.felkertech.n.cumulustv)

## Screenshots
![screenshot](https://raw.githubusercontent.com/jwennis/gethlsfromyoutube/master/images/screen.png "Screenshot")

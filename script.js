const video = document.querySelector("#video"); // Видео элемент
const videoDuration = document.querySelector("#videoDuration"); // Абзац с информацией о продолжительности видео

if (Hls.isSupported()) {
  let hls = new Hls({
    debug: true,
  });
  hls.loadSource(
    "https://live-streams.cdnvideo.ru/cdnvideo/caminandes/playlist.m3u8"
  );
  hls.attachMedia(video);
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    video.muted = true;
    video.play();
  });
  console.log(hls);
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src =
    "https://live-streams.cdnvideo.ru/cdnvideo/caminandes/playlist.m3u8";
  video.addEventListener("canplay", function () {
    video.play();
  });
}

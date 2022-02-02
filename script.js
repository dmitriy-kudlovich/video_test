const video = document.querySelector("#video"); // Видео элемент
const videoDuration = document.querySelector("#videoDuration"); // Абзац с информацией о продолжительности видео
let timeCounter = 0; // Счётчик времени

if (Hls.isSupported()) {
  let hls = new Hls({
    debug: true,
  });
  hls.loadSource(
    "https://live-streams.cdnvideo.ru/cdnvideo/caminandes/playlist.m3u8"
  );
  hls.attachMedia(video); // Связка <video></video> и hls

  // Воспроизведение видео при связке <video></video> и hls
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    video.muted = true;
    video.play();

    // Вывод продолжительности фрагментов видео
    hls.on(Hls.Events.LEVEL_LOADED, function (event, data) {
      let level_duration = data.details.totalduration; // Длительность загруженного фрагмента
      timeCounter += Math.floor(level_duration);
      videoDuration.innerHTML = `Общее время загруженных фрагментов видео: ${timeCounter} секунд`;
    });
  });
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src =
    "https://live-streams.cdnvideo.ru/cdnvideo/caminandes/playlist.m3u8";
  video.addEventListener("canplay", function () {
    video.play();
  });
}

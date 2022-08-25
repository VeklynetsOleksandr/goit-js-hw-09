import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (evt) {
  localStorage.setItem(TIME_KEY, evt.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

function resumePlayback() {
  if (JSON.parse(localStorage.getItem(TIME_KEY)) === null) {
    return;
  }
  const paused = localStorage.getItem(TIME_KEY);
  if (paused) {
    player.setCurrentTime(paused).catch(function (error) {
      switch (error.name) {
        case 'Error':
          break;
        default:
          break;
      }
    });
  }
}
resumePlayback();

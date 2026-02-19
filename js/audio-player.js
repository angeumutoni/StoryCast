(function () {
  const speedSteps = [1, 1.25, 1.5, 2];

  document.querySelectorAll('[data-audio-player]').forEach((player) => {
    const audio = player.querySelector('[data-audio]');
    const toggleBtn = player.querySelector('[data-action="toggle"]');
    const backBtn = player.querySelector('[data-action="back"]');
    const forwardBtn = player.querySelector('[data-action="forward"]');
    const speedBtn = player.querySelector('[data-action="speed"]');

    if (!audio || !toggleBtn || !backBtn || !forwardBtn || !speedBtn) {
      return;
    }

    let speedIndex = 0;

    const refreshToggle = () => {
      toggleBtn.textContent = audio.paused ? 'Play' : 'Pause';
    };

    toggleBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      refreshToggle();
    });

    backBtn.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 15);
    });

    forwardBtn.addEventListener('click', () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : audio.currentTime + 15;
      audio.currentTime = Math.min(duration, audio.currentTime + 15);
    });

    speedBtn.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % speedSteps.length;
      audio.playbackRate = speedSteps[speedIndex];
      speedBtn.textContent = `${speedSteps[speedIndex]}x`;
    });

    audio.addEventListener('play', refreshToggle);
    audio.addEventListener('pause', refreshToggle);
    audio.addEventListener('ended', refreshToggle);

    refreshToggle();
  });
})();

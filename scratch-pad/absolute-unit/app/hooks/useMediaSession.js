export const useMediaSession = ({
  metadata,
  playFn,
  pauseFn,
  seekBackwardFn,
  seekForwardFn,
  previousTrackFn,
  nextTrackFn
}) => {
  navigator.mediaSession.metadata = metadata

  if (playFn) {
    navigator.mediaSession.setActionHandler('play', playFn)
  }
  if (pauseFn) {
    navigator.mediaSession.setActionHandler('pause', pauseFn)
  }
  if (seekBackwardFn) {
    navigator.mediaSession.setActionHandler('seekbackward', seekBackwardFn)
  }
  if (seekForwardFn) {
    navigator.mediaSession.setActionHandler('seekforward', seekForwardFn)
  }
  if (previousTrackFn) {
    navigator.mediaSession.setActionHandler('previoustrack', previousTrackFn)
  }
  if (nextTrackFn) {
    navigator.mediaSession.setActionHandler('nexttrack', nextTrackFn)
  }
}

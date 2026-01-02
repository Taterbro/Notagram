import { AudioPlayer } from "expo-audio";

const usePressPlay = async (
  audioPlayer: AudioPlayer,
  setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    Math.floor(audioPlayer.currentTime) === Math.floor(audioPlayer.duration)
  ) {
    audioPlayer
      .seekTo(0)
      .then(() => {
        audioPlayer.play();
        setAudioPlaying(true);
      })
      .catch(() => console.log("no"));
  }
  if (audioPlayer.playing) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  setAudioPlaying(audioPlayer.playing);
};

export default usePressPlay;

import { AudioPlayer } from "expo-audio";
import * as DocumentPicker from "expo-document-picker";

const usePickAudio = async (
  audioPlayer: AudioPlayer,
  setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  setAudio: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentPickerAsset | null>
  >
) => {
  try {
    const doc = await DocumentPicker.getDocumentAsync({
      type: ["audio/*"],
      multiple: false,
    });
    if (doc.canceled || doc.assets === null) return;
    const audioFile = doc.assets[0];
    if (audioPlayer.playing) {
      setAudioPlaying(false);
      audioPlayer.pause();
      setAudio(audioFile);
    }
    setAudio(audioFile);
  } catch (err) {
    console.log("error while loading file", err);
  }
};

export default usePickAudio;

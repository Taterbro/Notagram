import * as VideoThumbnails from "expo-video-thumbnails";

export const generateVideoThumbnail = async (videoUri: string) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time: 15000,
    });
    return uri;
  } catch (e) {
    console.warn(e);
  }
};

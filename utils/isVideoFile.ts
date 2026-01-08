export const isVideoFile = (file: string) => {
  if (
    file.includes(".mp4") ||
    file.includes(".webm") ||
    file.includes(".mov") ||
    file.includes(".avi")
  ) {
    return true;
  } else {
    return false;
  }
};

import { posts } from "@/constants/postsTest";
import { createContext, useContext, useState } from "react";

interface contextType {
  data: posts | null;
  setter: (data: posts | null) => void;
  isAudioMuted: boolean;
  setAudioMuted: React.Dispatch<React.SetStateAction<boolean>>;
}
interface props {
  children: React.ReactNode;
}
const activePostContext = createContext<contextType>({
  data: null,
  setter: () => {},
  isAudioMuted: false,
  setAudioMuted: () => {},
});

export const ActivePostContextProvider = ({ children }: props) => {
  const [activePost, setActivePost] = useState<posts | null>(null);
  const [isAudioMuted, setAudioMuted] = useState(false);

  return (
    <activePostContext.Provider
      value={{
        data: activePost,
        setter: setActivePost,
        isAudioMuted: isAudioMuted,
        setAudioMuted: setAudioMuted,
      }}
    >
      {children}
    </activePostContext.Provider>
  );
};

export const useActivePost = () => useContext(activePostContext);

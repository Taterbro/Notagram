import { posts } from "@/constants/postsTest";
import { createContext, useContext, useState } from "react";

interface contextType {
  data: posts | null;
  setter: (data: posts | null) => void;
}
interface props {
  children: React.ReactNode;
}
const activePostContext = createContext<contextType>({
  data: null,
  setter: () => {},
});

export const ActivePostContextProvider = ({ children }: props) => {
  const [activePost, setActivePost] = useState<posts | null>(null);

  return (
    <activePostContext.Provider
      value={{ data: activePost, setter: setActivePost }}
    >
      {children}
    </activePostContext.Provider>
  );
};

export const useActivePost = () => useContext(activePostContext);

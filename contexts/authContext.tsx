import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface userData {
  name: string;
  pfp: string;
  email: string;
}

interface context {
  userData: userData | null;
  setter: (data: Partial<userData>) => void;
}

interface props {
  children: React.ReactNode;
}

const authContext = createContext<context>({
  userData: null,
  setter: () => {},
});

export const AuthProvider = ({ children }: props) => {
  const [userData, setUserData] = useState<userData | null>(null);

  const userDataSetter = async (value: Partial<userData>) => {
    const stringed = JSON.stringify(value);
    try {
      await SecureStore.setItemAsync("userData", stringed);
      setUserData((prev) => {
        if (!prev) return null;
        return { ...prev, ...value };
      });
    } catch {
      console.log("Error setting item in local Storage");
    }
  };

  const getUserDataFromLocalStorage = async () => {
    try {
      const result = await SecureStore.getItemAsync("userData");
      const parsed = result && (JSON.parse(result) as userData);
      parsed && setUserData(parsed);
    } catch {
      console.log("Item doesn't exist");
    }
  };

  useEffect(() => {
    getUserDataFromLocalStorage();
  }, []);
  useEffect(
    () => console.log("user data state got updated to: ", userData),
    [userData]
  );
  return (
    <authContext.Provider
      value={{ userData: userData, setter: userDataSetter }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

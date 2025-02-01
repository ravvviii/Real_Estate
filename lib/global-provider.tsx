import React, { createContext, ReactNode, useCallback, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const GlobalContext = createContext<GlobalContextType>({
  isLogged: false,
  user: null,
  loading: true,
  error: null,
  refetch: () => {},
});

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    error,
    refetch: refetchUser,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  // if (process.env.NODE_ENV === 'development') {
  //   console.log(JSON.stringify(user, null, 2));
  // }

  const refetch = useCallback(() => {
    refetchUser({});
  }, [refetchUser]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
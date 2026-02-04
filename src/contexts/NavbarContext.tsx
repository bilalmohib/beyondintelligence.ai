"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type NavbarContextType = {
  hideNavbarSectionInView: boolean;
  setHideNavbarSectionInView: (value: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [hideNavbarSectionInView, setHideNavbarSectionInView] = useState(false);
  const setter = useCallback((value: boolean) => {
    setHideNavbarSectionInView(value);
  }, []);
  return (
    <NavbarContext.Provider
      value={{ hideNavbarSectionInView, setHideNavbarSectionInView: setter }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  const ctx = useContext(NavbarContext);
  return ctx;
}

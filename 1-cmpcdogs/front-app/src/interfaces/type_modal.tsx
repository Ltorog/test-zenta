import { ReactNode } from "react";

export interface ITypeModal {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
  }
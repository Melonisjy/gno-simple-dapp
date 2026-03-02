// type
import type { AdenaProvider } from "./wallet";

declare global {
  interface Window {
    adena?: AdenaProvider;
  }
}

export {};

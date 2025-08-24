// src/global.d.ts

export {};

declare global {
  interface Window {
    html2pdf: (
      options?: {
        margin?: number;
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: { scale: number };
        jsPDF?: { unit: string; format: string; orientation: string };
      }
    ) => {
      set: (opt: unknown) => { from: (el: HTMLElement) => { save: () => void } };
      from: (el: HTMLElement) => { save: () => void };
      save: () => void;
    };
  }
}

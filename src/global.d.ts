export {};

declare global {
  interface Window {
    html2pdf: () => {
      set: (opt: {
        margin: number;
        filename: string;
        image: { type: string; quality: number };
        html2canvas: { scale: number };
        jsPDF: { unit: string; format: string; orientation: string };
      }) => { from: (el: HTMLElement) => { save: () => void } };
    };
  }
}

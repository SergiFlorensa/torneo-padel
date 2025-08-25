// src/global.d.ts
export {};

declare global {
  interface Window {
    // UMD bundle de jsPDF inyecta window.jspdf.jsPDF
    jspdf?: {
      jsPDF: new (options?: { orientation?: "portrait" | "landscape"; unit?: string; format?: string | number[] }) => JsPDFInstance;
    };
  }

  interface JsPDFInstance {
    text(text: string, x: number, y: number): void;
    setFontSize(size: number): void;
    save(filename?: string): void;
    // autoTable plugin se añade a la instancia
    autoTable(options: Record<string, unknown>): void;
  }
}

import QRCode from "qrcode";

// Returns a print-ready PNG data URL. High error correction so a small printed
// code with a decorative border still scans reliably.
export async function qrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 512,
    color: { dark: "#4a044e", light: "#ffffff" },
  });
}

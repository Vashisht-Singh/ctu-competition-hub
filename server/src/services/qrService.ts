import QRCode from 'qrcode';

export const generateQRCodeDataUrl = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#0b192c',
        light: '#ffffff',
      },
      width: 280,
    });
  } catch (err) {
    console.error('QR code generation error:', err);
    return '';
  }
};

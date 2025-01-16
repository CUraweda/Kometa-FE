import exampleKTP from "../../assets/content/exampleKTP.png";
import exampleSelfie from "../../assets/content/exampleSelfie.png";

export const instructions = {
  photoKTP: {
    photo: exampleKTP,
    title: "Foto bagian depan Kartu KTP Anda:",
    regulation: [
      "Foto KTP harus mencakup seluruh bagian kartu.",
      "Foto KTP harus jelas dan dapat terbaca.",
      "Foto KTP harus asli, tidak dimodifikasi dalam bentuk apa pun.",
    ],
  },
  selfieKTP: {
    photo: exampleSelfie,
    title: "Foto Selfie dengan KTP Anda:",
    regulation: [
      "Pastikan wajah Anda dan KTP terlihat jelas dalam foto.",
      "Foto KTP harus mencakup seluruh bagian kartu dan terbaca dengan jelas.",
      "Gunakan cahaya yang cukup untuk memastikan hasil foto yang jelas.",
      "Foto harus asli, tidak dimodifikasi dalam bentuk apa pun.",
    ],
  },
};

export type InstructionKey = keyof typeof instructions;

export const instuctionId: { [K in InstructionKey]: string } = {
  photoKTP: "photoKTP" as InstructionKey,
  selfieKTP: "selfieKTP" as InstructionKey,
};

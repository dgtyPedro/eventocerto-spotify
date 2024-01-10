export const matchGenre = (genre: string) => {
  const genreDictionary = {
    rock: [
      "rock",
      "blues",
      "grunge",
      "hard",
      "punk",
      "roll",
      "rockabilly",
      "emo",
      "punk",
      "ska",
      "goth",
      "metal",
      "death",
      "progressive",
    ],
    alternative: [
      "study",
      "soundtracks",
      "sad",
      "indie",
      "bedroom",
      "alternative",
      "alternativo",
      "underground",
      "room",
      "garage",
    ],
    pop: ["pop", "folk"],
    edm: [
      "wave",
      "dubstep",
      "edm",
      "electro",
      "electronic",
      "house",
      "techno",
      "trance",
      "breakbeat",
      "synth",
      "dance",
      "house",
      "dancehall",
    ],
    jazz: ["bossanova", "jazz", "soul", "bossa", "nova"],
    reggae: ["reggae", "reggaeton"],
    instrumental: ["classical", "opera", "instrumental", "piano"],
    brazilian: [
      "brasileiro",
      "brazilian",
      "brazil",
      "forro",
      "mpb",
      "pagode",
      "sertanejo",
      "samba",
      "brasil",
      "funk",
      "nacional",
    ],
    rap: [
      "rap",
      "hip",
      "hop",
      "trap",
      "drill",
      "coast",
      "gangster",
      "conscious",
      "east",
      "west",
    ],
    rnb: ["soul", "chill", "rnb", "randb", "r&b"],
  };

  for (var i = 0; i < Object.keys(genreDictionary).length; i++) {
    if (
      genreDictionary[
        Object.keys(genreDictionary)[i] as keyof typeof genreDictionary
      ].includes(genre)
    ) {
      return Object.keys(genreDictionary)[i];
    }
  }

  return null;
};

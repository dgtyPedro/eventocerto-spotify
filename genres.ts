export const matchGenres = (genres: string[]) => {
  //to do
  const genreDictionary = {
    rock: [
      "alt-rock",
      "alternative",
      "blues-rock",
      "classic-rock",
      "folk-rock",
      "grunge",
      "hard-rock",
      "indie-rock",
      "punk-rock",
      "rock-n-roll",
      "rockabilly",
      "emo",
      "punk",
      "psych-rock",
      "ska",
    ],
    metal: [
      "goth",
      "grindcore",
      "black-metal",
      "death-metal",
      "metal",
      "metal-misc",
      "metalcore",
      "grunge",
      "hard-rock",
      "heavy-metal",
      "progressive-metal",
      "doom-metal",
    ],
    alternative: ["study", "soundtracks", "sad", "indie", "indie-pop"],
    pop: ["pop", "pop-film", "power-pop", "cantopop", "folk"],
    edm: [
      "dubstep",
      "edm",
      "electro",
      "electronic",
      "house",
      "minimal-techno",
      "progressive-house",
      "techno",
      "trance",
      "breakbeat",
      "chicago-house",
      "dancehall",
      "deep-house",
      "drum-and-bass",
      "detroit-techno",
    ],
    jazz: ["bossanova", "jazz", "soul"],
    reggae: ["reggae", "reggaeton"],
    classical: ["classical", "opera"],
    brazilian: ["brazil", "forro", "mpb", "pagode", "sertanejo", "samba"],
    rap: ["hip-hop", "rap", "trip-hop"],
    dance: ["synth-pop", "dance"],
    rnb: ["r-n-b", "soul", "chill"],
    diverse: [
      "afrobeat",
      "ambient",
      "anime",
      "bluegrass",
      "british",
      "children",
      "club",
      "comedy",
      "country",
      "disco",
      "disney",
      "dub",
      "french",
      "funk",
      "garage",
      "german",
      "gospel",
      "groove",
      "guitar",
      "happy",
      "hardcore",
      "hardstyle",
      "holidays",
      "honky-tonk",
      "house",
      "idm",
      "indian",
      "industrial",
      "iranian",
      "j-dance",
      "j-idol",
      "j-pop",
      "j-rock",
      "k-pop",
      "kids",
      "latin",
      "latino",
      "malay",
      "mandopop",
      "minimal-techno",
      "movies",
      "new-age",
      "new-release",
      "opera",
      "party",
      "philippines-opm",
      "piano",
      "post-dubstep",
      "progressive-house",
      "rainy-day",
      "road-trip",
      "romance",
      "salsa",
      "show-tunes",
      "singer-songwriter",
      "sleep",
      "songwriter",
      "spanish",
      "summer",
      "swedish",
      "tango",
      "turkish",
      "work-out",
      "world-music",
    ],
  };

  const matchedGenres = genres.map((genre: string) => {
    for (var i = 0; i < Object.keys(genreDictionary).length; i++) {
      if (
        genreDictionary[
          Object.keys(genreDictionary)[i] as keyof typeof genreDictionary
        ].includes(genre)
      ) {
        return Object.keys(genreDictionary)[i];
      }
    }
    return "diverse";
  });
  console.log(genres, matchedGenres);
};
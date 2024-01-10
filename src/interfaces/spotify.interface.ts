export interface GenrePercentage {
  [key: string]: string;
}

export interface UserInfo {
  artists: string[];
  genres: GenrePercentage[];
}

interface Episode {
  id: string;
  series: string;
  title: string;
  description: string;
  seasonNumber: number;
  episodeNumber: number;
  releaseDate: string;
  imdbId: string;
  poster?:string;
  imdbRating?:string
}

 interface EpisodeInput {
  id: string;
  series: string;
  title: string;
  description: string;
  seasonNumber: number;
  episodeNumber: number;
  releaseDate: string; // Format: YYYY-MM-DD
  imdbId: string;
}
export type {Episode,EpisodeInput}
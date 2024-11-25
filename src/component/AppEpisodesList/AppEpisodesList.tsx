import { useEffect } from "react";
import { Episode } from "../../types/types";
import "./AppEpisodesList.css";
import { Link } from "react-router-dom";
type AppEpisodesListProps = {
  episodesList: Episode[];
};
const AppEpisodesList = ({ episodesList }: AppEpisodesListProps) => {
  useEffect(() => {
    console.log(`AppEpisodesList mounted`);
  }, []);

  const episodes = episodesList.map((episode, index) => (
    <Link to={`details/${episode.id}`}>
      <div
        key={index}
        className="flex flex-col justify-center  max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-700  border-gray-700 m-6 min-h-[280px]"
      >
        <div className="p-5 min-w-[383px]">
          <div>
            <a className="block mb-2 text-xl font-bold tracking-tight text-gray-400 ">
              {episode.title}
            </a>
            <a className="block mb-2 text-l font-bold tracking-tight text-gray-400 ">
              {episode.series} season {episode.seasonNumber} episode{" "}
              {episode.episodeNumber}
            </a>

            <a className="block mb-2 text-xs font-bold tracking-tight text-gray-400 ">
              released on {episode.releaseDate}
            </a>
          </div>

          <p className="mb-3 font-normal  text-gray-400 min-h-[75px]">
            {episode.description}
          </p>
        </div>
      </div>
    </Link>
  ));
  return (
    <div className="flex items-center justify-center  flex-wrap">
      {episodes}
    </div>
  );
};

export default AppEpisodesList;

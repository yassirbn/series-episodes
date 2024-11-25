import { Episode } from "../../types/types";
import "./AppEpisodesList.css";
import { Link } from "react-router-dom";
type AppEpisodesListProps = {
  episodesList: Episode[];
};
const AppEpisodesList = ({ episodesList }: AppEpisodesListProps) => {
  const episodes = episodesList.map((episode, index) => (
    <Link to={`details/${episode.id}`} key={index}>
      <div className="flex flex-col justify-center  max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-700  border-gray-700 m-6 min-h-[280px]">
        <div className="p-5 md:min-w-[383px]">
          <div>
            <span className="block mb-2 text-xl font-bold tracking-tight text-gray-400 ">
              {episode.title}
            </span>
            <span className="block mb-2 text-l font-bold tracking-tight text-gray-400 ">
              {episode.series} season {episode.seasonNumber} episode{" "}
              {episode.episodeNumber}
            </span>

            <span className="block mb-2 text-xs font-bold tracking-tight text-gray-400 ">
              released on {episode.releaseDate}
            </span>
          </div>

          <p className="mb-3 font-normal  text-gray-400 min-h-[75px]">
            {episode.description}
          </p>
        </div>
      </div>
    </Link>
  ));
  const noResultFound = (
    <div className="flex flex-col justify-center  max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-700  border-gray-700 m-6 min-h-[280px]">
      <div className="flex items-center justify-center p-5 md:min-w-[383px]">
        No result found
      </div>
    </div>
  );
  return (
    <div className="flex items-center justify-center  flex-wrap">
      {episodes.length > 0 ? episodes : noResultFound}
    </div>
  );
};

export default AppEpisodesList;

import { Episode } from "../../types/types";
import "./AppEpisodesList.css";
import { Link } from "react-router-dom";
type AppEpisodesListProps = {
  episodesList: Episode[];
};
const AppEpisodesList = ({ episodesList }: AppEpisodesListProps) => {
  const episodes = episodesList.map(
    (
      {
        id,
        title,
        description,
        series,
        seasonNumber,
        episodeNumber,
        releaseDate,
      },
      index
    ) => (
      <Link to={`details/${id}`} key={index}>
        <div className="flex flex-col justify-center  max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-700  border-gray-700 m-6 min-h-[280px]">
          <div className="p-5 md:min-w-[383px]">
            <div>
              <span className="block mb-2 text-xl font-bold tracking-tight text-gray-400 ">
                {title}
              </span>
              <span className="block mb-2 text-l font-bold tracking-tight text-gray-400 ">
                {`${series} season ${seasonNumber} episode ${episodeNumber}`}
              </span>

              <span className="block mb-2 text-xs font-bold tracking-tight text-gray-400 ">
                {`released on ${releaseDate}`}
              </span>
            </div>

            <p className="mb-3 font-normal  text-gray-400 min-h-[75px]">
              {description}
            </p>
          </div>
        </div>
      </Link>
    )
  );
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

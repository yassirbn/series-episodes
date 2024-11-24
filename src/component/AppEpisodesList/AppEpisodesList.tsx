import { useEffect } from "react";
import { Episode } from "../../types/types";
import "./AppEpisodesList.css";
type AppEpisodesListProps = {
  episodesList: Episode[];
};
const AppEpisodesList = ({ episodesList }: AppEpisodesListProps) => {
  useEffect(() => {
    console.log(`AppEpisodesList mounted`);
  }, []);

  const episodes = episodesList.map((episode, index) => (
    <div
      key={index}
      className="flex flex-col justify-between  max-w-sm bg-white border border-gray-200 rounded-lg shadow bg-gray-700  border-gray-700 m-6 min-h-[460px]"
    >
      <a href="#">
        <img
          className="rounded-t-lg poster max-h-[175px]"
          src={episode.poster ?? `https://picsum.photos/seed/picsum/200/300`}
          alt=""
        />
      </a>
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
      <div className="flex justify-around mb-2">
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Delete episode
        </a>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Edit episode
        </a>
      </div>
    </div>
  ));
  return (
    <div className="flex items-center justify-center  flex-wrap">
      {episodes}
    </div>
  );
};

export default AppEpisodesList;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { graphqlClient } from "../../graphql/graphqlClient";
import { GET_EPISODE_BY_ID } from "../../graphql/queries";
import { fetchSeriesData } from "../../services/api";
import { Episode } from "../../types/types";
import AppSpinner from "../AppSpinner";
import { DELETE_EPISODE } from "../../graphql/mutations";

const AppEpisodeDetails = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode>(undefined as any);
  const [episodeDeleted, setEpisodeDeleted] = useState<boolean>(false);

  const fetchEpisodeData = async (id: string) => {
    try {
      const { getEpisodeById } = await graphqlClient.request<{
        getEpisodeById: Episode;
      }>(GET_EPISODE_BY_ID, { episodeId: id });
      const imdbResults = await fetchSeriesData(getEpisodeById.imdbId);
      setEpisode({
        ...getEpisodeById,
        poster: imdbResults.Poster,
        imdbRating: imdbResults.imdbRating,
      });
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const deleteEpisode = async () => {
    if (window.confirm("Are you sure you want to delete this episode?")) {
      try {
        await graphqlClient.request(DELETE_EPISODE, { episodeId: id });
        setEpisodeDeleted(true);
        const timeoutId = setTimeout(() => {
          window.location.href = "/";
        }, 500);
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Failed to delete episode:", error);
      }
    }
  };

  useEffect(() => {
    fetchEpisodeData(id!);
  }, [id]);

  return (
    <div className="AppEpisodeDetails-component">
      <>
        {episodeDeleted && (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            Episode is deleted successfully you will be redirected to home page
            in few seconds
          </div>
        )}
      </>
      <>{!episode && <AppSpinner></AppSpinner>}</>
      <>
        {episode && (
          <div className=" flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-4 flex relative py-16">
              <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20 m-1">
                <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
                <h1 className="break-words font-bebas-neue uppercase text-3xl sm:text-3xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  {episode.title}
                </h1>
                <h2 className="break-words font-bebas-neue uppercase text-2xl sm:text-2xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  {episode.series} season {episode.seasonNumber} episode{" "}
                  {episode.episodeNumber}
                </h2>
                {episode.releaseDate && (
                  <h3 className="break-words text-2xl sm:text-2xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                    released on {episode.releaseDate}
                  </h3>
                )}
                <p className="text-l sm:text-base text-gray-700 dark:text-white mt-9">
                  {episode.description}
                </p>

                <span className="dark:text-white text-gray-800 text-l mt-9 text-right">
                  imdbScore : {episode.imdbRating ?? "N/A"}
                </span>

                <div className="flex mt-12">
                  <button
                    className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md  hover:bg-pink-400"
                    onClick={deleteEpisode}
                  >
                    Delete Episode
                  </button>
                </div>
              </div>
              <div className="flex sm:w-1/3 lg:w-2/5 relative items-center justify-center m-1">
                <img
                  src={
                    episode.poster ??
                    `https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg`
                  }
                  className="max-w-sm md:max-w-sm m-auto"
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default AppEpisodeDetails;

import { ChangeEvent, useEffect, useState } from "react";
import "./AppMainContent.css";
import AppEpisodesList from "../AppEpisodesList";
import { Episode } from "../../types/types";
import { graphqlClient } from "../../graphql/graphqlClient";
import { LIST_EPISODES } from "../../graphql/queries";
import AppSpinner from "../AppSpinner";
import AppCreateEpisodeModal from "../AppCreateEpisodeModal";
import { useSubscription } from "@apollo/client";
import {
  ON_CREATE_EPISODE,
  ON_DELETE_EPISODE,
} from "../../graphql/subscriptions";

const AppMainContent = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchEpisodes = async (searchQuery: string) => {
    try {
      const { listEpisodes } = await graphqlClient.request<{
        listEpisodes: Episode[];
      }>(LIST_EPISODES, { search: searchQuery });
      setEpisodes(listEpisodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Handle new episode creation
  const { data: newEpisodeData } = useSubscription(ON_CREATE_EPISODE);
  useEffect(() => {
    if (!newEpisodeData) {
      return;
    }
    setEpisodes((prev) => [...prev, newEpisodeData.onCreateEpisode]);
  }, [newEpisodeData]);

  // Handle episode deletion
  const { data: deleteEpisodeData } = useSubscription(ON_DELETE_EPISODE);
  useEffect(() => {
    if (!deleteEpisodeData) {
      return;
    }
    setEpisodes((prev) =>
      prev.filter((episode) => episode.id !== deleteEpisodeData.onDeleteEpisode)
    );
  }, [deleteEpisodeData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearching(true);
      fetchEpisodes(searchValue);
    }, 300); // Debounce to avoid excessive API calls
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <div className="AppMainContent-component w-screen">
      <div className="container mx-auto px-4 ">
        <div
          className={`md:flex pt-6 md:pt-0 items-center justify-center search-part with-animation  ${
            !searchValue.length ? "" : "on-top"
          }`}
        >
          <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-xl search sm:w-2/3 lg:w-3/5">
            <div className="flex items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-teal-500 rounded-md with-animation search ">
              <svg
                className="mr-2 h-5 w-5 stroke-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                className="block w-full appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                placeholder="Find anything..."
                aria-label="Search components"
                id="headlessui-combobox-input-:r5n:"
                role="combobox"
                type="text"
                aria-expanded="false"
                aria-autocomplete="list"
                onChange={handleInputChange}
                value={searchValue}
              />
            </div>
          </div>
          {((searchValue.length > 0 && !searching && episodes.length === 0) ||
            !searchValue.length) && (
            <div className="text-center mt-6 md:m-0 sm:w-1/3 lg:w-2/5 ">
              <AppCreateEpisodeModal btnText="Add new Episode"></AppCreateEpisodeModal>
            </div>
          )}
        </div>

        <>
          {searchValue.length > 0 && !searching && (
            <div>
              <AppEpisodesList episodesList={episodes}></AppEpisodesList>
            </div>
          )}
        </>
        <>{searching && <AppSpinner></AppSpinner>}</>
      </div>
    </div>
  );
};

export default AppMainContent;

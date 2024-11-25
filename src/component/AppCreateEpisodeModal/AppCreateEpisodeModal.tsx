import { useId, useState } from "react";
import { graphqlClient } from "../../graphql/graphqlClient";
import { CREATE_EPISODE } from "../../graphql/mutations";
import { EpisodeInput } from "../../types/types";

type AppCreateEpisodeModalProps = {
  btnText: string;
};

function AppCreateEpisodeModal({ btnText }: AppCreateEpisodeModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [series, setSeries] = useState("");
  const episodeTobeCreated = {
    id: useId(),
    series: "",
    title: "",
    description: "",
    seasonNumber: 1,
    episodeNumber: 1,
    releaseDate: "",
    imdbId: "",
  };
  const createEpisode = async () => {
    try {
      const newEpisode = await graphqlClient.request(CREATE_EPISODE, {
        episode: {
          ...episodeTobeCreated,
          title,
          description,
          series,
        },
      });

      setShowModal(false);

      window.location.href = `/details/${episodeTobeCreated.id}`;
    } catch (error) {
      console.error("Failed to delete episode:", error);
    }
  };
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {btnText}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create new Episode</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-pink-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                      <label className="block mb-2 text-sm font-medium">
                        Episode title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className=" border border-pink-500  text-sm rounded-lg focus:ring-blue-500 focus:border-pink-500  block w-full p-2.5"
                        placeholder=" End of the Prologue"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block mb-2 text-sm font-medium">
                        Series title
                      </label>
                      <input
                        type="text"
                        id="series"
                        className=" border border-pink-500  text-sm rounded-lg focus:ring-blue-500 focus:border-pink-500  block w-full p-2.5"
                        placeholder=" End of the Prologue"
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block mb-2 text-sm font-medium">
                        description
                      </label>
                      <textarea
                        id="description"
                        className=" border border-pink-500  text-sm rounded-lg focus:ring-blue-500 focus:border-pink-500  block w-full p-2.5"
                        placeholder=" End of the Prologue"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-pink-500  text-white active:bg-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => createEpisode()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AppCreateEpisodeModal;

const NotFoundPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex items-center justify-center flex-col mx-auto max-w-screen-sm text-center h-screen">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
          Something's missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-white">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{" "}
        </p>
        <a
          href="/"
          className="bg-pink-500  text-white active:bg-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;

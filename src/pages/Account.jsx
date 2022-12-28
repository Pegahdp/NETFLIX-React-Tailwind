import React from "react";
import SavedShows from "../components/SavedShows";

function Account() {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="h-[400px] w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5e48e7b6-350d-48d9-96d6-de8ca173c89f/0b1d11e5-54ba-42df-a395-3b4851bb1174/MY-en-20221219-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 w-full h-[550px] fixed left-0 top-0"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
}

export default Account;

import React from "react";

const NoNotes = () => {
  return (
    <div className="text-center pt-4">
      <img src="/empty-folder.png" height={100} alt="Empty Folder" />
      <p className="lead pt-2">No Notes Found!</p>
    </div>
  );
};

export default NoNotes;

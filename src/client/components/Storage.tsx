import React, { FunctionComponent, useEffect } from "react";

const Storage: FunctionComponent = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    localStorage.setItem(
      "sp-access-token",
      urlParams.get("access_token") as string
    );
    localStorage.setItem(
      "sp-refresh-token",
      urlParams.get("refresh_token") as string
    );

    window.close();
  }, []);

  return <p>Storing data...</p>;
};

export default Storage;

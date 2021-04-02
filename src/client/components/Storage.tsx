import React, { FunctionComponent, useEffect } from "react";

const Storage: FunctionComponent = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const service = (urlParams.get("service") as string).toLowerCase();

    localStorage.setItem(
      `${service}-access-token`,
      urlParams.get("access_token") as string
    );
    localStorage.setItem(
      `${service}-refresh-token`,
      urlParams.get("refresh_token") as string
    );

    window.close();
  }, []);

  return <p>Storing data...</p>;
};

export default Storage;

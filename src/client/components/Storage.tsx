import React, { FunctionComponent, useEffect } from "react";

const Storage: FunctionComponent = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const service = (urlParams.get("service") as string).toLowerCase();
    const accessToken = urlParams.get("access_token") as string;
    const refreshToken = urlParams.get("refresh_token") as string;

    localStorage.setItem(`${service}-access-token`, accessToken);
    localStorage.setItem(`${service}-refresh-token`, refreshToken);

    window.close();
  }, []);

  return <p>Storing data...</p>;
};

export default Storage;

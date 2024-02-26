import { useEffect, useState } from "react";
import { devBasePath } from "./url";

export function useFetchAdvisorProfile() {
  const [advisor, setAdvisor] = useState({});

  useEffect(() => {
    fetch(`${devBasePath}/advisor/1`)
      .then((response) => response.json())
      .then((advisor) => setAdvisor(advisor))
      .catch((error) => console.error(error));
  }, []);

  return advisor;
}

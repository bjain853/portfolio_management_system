import { useState, useEffect } from "react";
import { devBasePath } from "./url";

export function useFetchTotalPortfolioValue() {
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  useEffect(() => {
    fetch(`${devBasePath}/security/total`)
      .then((response) => response.json())
      .then((value) => setTotalPortfolioValue(value))
      .catch((error) => console.error(error));
  }, []);

  return totalPortfolioValue;
}

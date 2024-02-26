import { useEffect, useState } from "react";
import { devBasePath } from "./url";

export interface ISecurityRecord {
  security_type: string;
  total_value: number;
}
export function useFetchTotalSecurityValueByCategory(): ISecurityRecord[] {
  const [totalSecurityValueByCategory, setTotalSecurityValueByCategory] =
    useState<ISecurityRecord[]>([]);

  useEffect(() => {
    fetch(`${devBasePath}/security/total-category`)
      .then((response) => response.json())
      .then((data) => {
        const dataArray: ISecurityRecord[] = Object.entries(data).map(
          ([key, value]) => ({
            security_type: key,
            total_value: parseFloat(`${value}`),
          })
        );
        setTotalSecurityValueByCategory(dataArray);
      })
      .catch((error) => console.error(error));
  }, []);
  return totalSecurityValueByCategory;
}

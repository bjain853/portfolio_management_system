export const convertKeyToHeading = (category: string) =>
  category
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

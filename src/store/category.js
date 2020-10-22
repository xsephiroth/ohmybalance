import { atom } from "recoil";

export const categoriesState = atom({
  key: "categories",
  default: ["美妆", "日用品"],
});

export const categorySelectState = atom({
  key: "categorySelect",
  default: "",
});

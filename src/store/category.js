import { atom, selectorFamily } from "recoil";

// 类目
export const categoriesState = atom({
  key: "categories",
  default: ["美妆", "日用品"],
});

// 选中的类目
export const categorySelectState = atom({
  key: "categorySelect",
  default: "",
});

// 选中的待删除的类目
export const categoryDeleteSelectState = atom({
  key: "categoryDeleteSelect",
  default: "",
});

// 选中类目或删除待删除的类目
export const isCategoryChoiceSelector = selectorFamily({
  key: "choiceCategory",
  // 返回当前category是否被选中
  get: (category) => ({ get }) => category === get(categorySelectState),
  // 更新选中的category
  // 待删除时确认删除
  set: () => ({ get, set }, category) => {
    // 再次选中的类目与待删除的匹配，进行删除
    if (category !== get(categoryDeleteSelectState)) {
      // 取消待删除类目的选中
      set(categoryDeleteSelectState, "");
    } else {
      // TODO remote delete
      console.log("delete", category);
      // 重置状态
      set(categorySelectState, "");
      set(categoryDeleteSelectState, "");
      return;
    }

    // 普通的选中或反选
    const currentCategory = get(categorySelectState);
    if (currentCategory === category) {
      set(categorySelectState, "");
    } else {
      set(categorySelectState, category);
    }
  },
});

// 选中即将删除类目
export const isWillDeleteCategorySelector = selectorFamily({
  key: "willDeleteCategory",
  // 返回当前cagetory是否待删除
  get: (category) => ({ get }) => category === get(categoryDeleteSelectState),
  // 更新待删除的category
  set: () => ({ set }, category) => {
    // 取消选中类目
    set(categorySelectState, "");
    set(categoryDeleteSelectState, category);
  },
});

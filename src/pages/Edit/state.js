import { atom, selector, selectorFamily } from "recoil";

export const billState = atom({
  key: "bill",
  default: {
    category: "",
    type: "expense",
    amount: 0,
    date: new Date(),
    remark: "",
  },
});

const buildSelector = (key, field) =>
  selector({
    key,
    get: ({ get }) => {
      const bill = get(billState);
      return bill[field];
    },
    set: ({ get, set }, v) => {
      const bill = get(billState);
      set(billState, { ...bill, [field]: v });
    },
  });

export const billCategoryState = buildSelector("billCategory", "category");
export const billTypeState = buildSelector("billType", "type");
export const billAmountState = buildSelector("billAmount", "amount");
export const billDateState = buildSelector("billDate", "date");
export const billRemarkState = buildSelector("billRemark", "remark");

// 账单类目
// 包含expense与income
export const categoriesState = atom({
  key: "categories",
  default: { expense: [], income: [] },
});

export const typeCategoriesState = selectorFamily({
  key: "typeCategories",
  get: (billType) => ({ get }) => get(categoriesState)[billType],
});

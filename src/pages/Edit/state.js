import { atom, selector } from "recoil";

// 账单id
export const billIdState = atom({
  key: "billId",
  default: null,
});

// 当前是否为新建账单
export const isBillCreateSelector = selector({
  key: "isBillCreate",
  get: ({ get }) => !get(billIdState),
});

// 账单类型 [expense, income]
export const billTypeState = atom({
  key: "billType",
  default: "expense",
});

// 账单类目
// 包含expense与income
export const categoriesState = atom({
  key: "categories",
  default: { expense: [], income: [] },
});

// 当前账单类型的类目
export const billTypeCategoriesSelector = selector({
  key: "billTypeCategories",
  get: ({ get }) => {
    const billType = get(billTypeState);
    const categories = get(categoriesState);
    return categories[billType];
  },
});

// 选择的账单类目
export const categoryState = atom({
  key: "category",
  default: "",
});

// 金额
export const amountState = atom({
  key: "amount",
  default: 0,
});

// 备注
export const remarkState = atom({
  key: "remark",
  default: "",
});

// 日期
export const dateState = atom({
  key: "date",
  default: new Date(),
});

// TODO
export const billSelector = selector({
  key: "bill",
  get: ({ get }) => {
    return {
      type: get(billTypeState),
      category: get(categoryState),
      amount: get(amountState),
      remark: get(remarkState),
      date: get(dateState),
    };
  },
  set: ({ set }, bill) => {
    set(billIdState, bill._id);
    set(billTypeState, bill.type);
    set(categoryState, bill.category);
    set(amountState, bill.amount);
    set(dateState, bill.date);
    set(remarkState, bill.remark);
  },
});

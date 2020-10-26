import tcb from "./tcb";

const db = tcb.database();
const collectionCategories = "ohmybalance-categories";
const collectionBills = "ohmybalance-bills";

// 获取用户目录数据
// 不存在时进行j创建
const getOrCreateUserCategoryRecord = async () => {
  const c = db.collection(collectionCategories);

  const { total } = await c.count();
  if (total === 0) {
    const res = await c.add({ expense: [], income: [] });
    return res;
  }

  const {
    data: [record],
  } = await c.get();
  return record;
};

export const fetchCategories = async () => {
  const { expense, income } = await getOrCreateUserCategoryRecord();
  return { expense, income };
};

export const updateCategories = async (categories) => {
  const { _id } = await getOrCreateUserCategoryRecord();
  const c = db.collection(collectionCategories);
  await c.doc(_id).update(categories);
};

export const fetchMonthBills = async ({ year, month }) => {
  const c = db.collection(collectionBills);
  const { data } = await c.where({ year, month }).get();
  return data;
};

export const fetchBill = async (billId) => {
  const c = db.collection(collectionBills);
  const {
    data: [bill],
  } = await c.doc(billId).get();
  return bill;
};

const extractDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return [year, month];
};

export const createBill = async ({ type, category, amount, date, remark }) => {
  // 冗余字段，便于列表页面的查询获取
  const [year, month] = extractDate(date);

  const c = db.collection(collectionBills);
  await c.add({
    type,
    category,
    amount,
    remark,
    date,
    year,
    month,
  });
};

export const updateBill = async (bill) => {
  // 冗余字段，便于列表页面的查询获取
  const [year, month] = extractDate(bill.date);
  const c = db.collection(collectionBills);
  await c.doc(bill._id).set({ ...bill, year, month });
};

export const fetchBills = async (key, skip = 0) => {
  console.log({ key, skip });
  const c = db.collection(collectionBills);
  const { data: bills } = await c
    .orderBy("date", "desc")
    .limit(2)
    .skip(skip)
    .get();
  return bills;
};

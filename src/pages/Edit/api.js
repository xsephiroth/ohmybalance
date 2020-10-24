import tcb from "../../tcb";

const db = tcb.database();
const collectionCategories = "ohmybalance-categories";

// 获取用户目录数据
// 不存在时进行j创建
const getOrCreateUserCategoryRecord = async () => {
  const c = db.collection(collectionCategories);

  const { total } = await c.count();
  if (total === 0) {
    const res = await c.add({ categories: [] });
    return res;
  }

  const {
    data: [record],
  } = await c.get();
  return record;
};

export const fetchCategories = async () => {
  const res = await getOrCreateUserCategoryRecord();
  return res?.categories || [];
};

export const updateCategories = async (categories) => {
  const { _id } = await getOrCreateUserCategoryRecord();
  const c = db.collection(collectionCategories);
  await c.doc(_id).update({ categories });
};

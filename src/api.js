import tcb from "./tcb";

const db = tcb.database();

export const getCategories = async () => {
  return db.collection("ohmybalance-categories").get();
};

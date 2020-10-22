import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Layout, NavigationBar, CategoryBtn, AmountInput } from "../components";
import { categoriesState, categorySelectState } from "../store/category";

const Categories = styled.div`
  height: 50vh;
`;

const Edit = () => {
  const categories = useRecoilValue(categoriesState);
  const [categorySelect, setCategorySelect] = useRecoilState(
    categorySelectState
  );
  const [categoryDeleteSelect, setCategoryDeleteSelect] = useState("");
  console.log({ categoryDeleteSelect });

  const clearCategoryDeleteSelect = () => {
    // 仅在删除时起作用
    if (!categoryDeleteSelect) return;
    setCategorySelect("");
    setCategoryDeleteSelect("");
  };

  const handleCategoryLongPress = (category) => {
    setCategorySelect("");
    setCategoryDeleteSelect(category);
  };

  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <Categories onClick={clearCategoryDeleteSelect}>
        {categories.map((c) => (
          <CategoryBtn
            key={c}
            active={categorySelect === c}
            onClick={(e) => {
              e.stopPropagation();
              setCategorySelect((prev) => (prev === c ? "" : c));
            }}
            willDelete={categoryDeleteSelect === c}
            setLongPress={() => handleCategoryLongPress(c)}
          >
            {c}
          </CategoryBtn>
        ))}
      </Categories>
      <AmountInput />
    </Layout>
  );
};

export default Edit;

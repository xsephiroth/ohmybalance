import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Layout, NavigationBar, CategoryBtn, AmountInput } from "../components";
import {
  categoriesState,
  categoryDeleteSelectState,
  isCategoryChoiceSelector,
  isWillDeleteCategorySelector,
} from "../store/category";

const StyledCategories = styled.div`
  height: 50vh;
`;

const Btn = ({ category }) => {
  const [active, setCategorySelect] = useRecoilState(
    isCategoryChoiceSelector(category)
  );
  const [willDelete, setCategoryDeleteSelect] = useRecoilState(
    isWillDeleteCategorySelector(category)
  );

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      setCategorySelect(category);
    },
    [category, setCategorySelect]
  );

  const handleLongPress = useCallback(() => setCategoryDeleteSelect(category), [
    category,
    setCategoryDeleteSelect,
  ]);

  return (
    <CategoryBtn
      active={active}
      onClick={handleClick}
      willDelete={willDelete}
      setLongPress={handleLongPress}
    >
      {category}
    </CategoryBtn>
  );
};

const Categories = () => {
  const categories = useRecoilValue(categoriesState);

  // 点击空白处取消删除的选中
  // 不影响正常选中的类目
  const setCategoryDeleteSelect = useSetRecoilState(categoryDeleteSelectState);
  const clearWillDeleteSelect = () => setCategoryDeleteSelect("");

  return (
    <StyledCategories onClick={clearWillDeleteSelect}>
      {categories.map((category) => (
        <Btn key={category} category={category} />
      ))}
    </StyledCategories>
  );
};

const Edit = () => {
  return (
    <Layout>
      <NavigationBar
        start={<NavigationBar.Back />}
        center={<NavigationBar.Center>Hello</NavigationBar.Center>}
      />
      <Categories />
      <AmountInput />
    </Layout>
  );
};

export default Edit;

import React, { useState, useCallback, useEffect } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import { Layout, NavigationBar, CategoryBtn, AmountInput } from "../components";
import {
  categoriesState,
  categoryDeleteSelectState,
  isCategoryChoiceSelector,
  isWillDeleteCategorySelector,
} from "../store/category";

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

const addCategoryShowInputState = atom({
  key: "addCategoryShowInput",
  default: false,
});

const AddCagetory = () => {
  const [showInput, setShowInput] = useRecoilState(addCategoryShowInputState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [newCategory, setNewCategory] = useState("");

  // 隐藏添加输入框时清空旧数据
  useEffect(() => {
    !showInput && setNewCategory("");
  }, [showInput]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categories.includes(newCategory)) {
      setShowInput(false);
      return;
    }

    // TODO fetch request
    setTimeout(() => {
      setCategories((categories) => [...categories, newCategory]);
      setShowInput(false);
    }, 500);
  };

  return (
    <>
      {showInput ? (
        <AddCategoryForm onSubmit={handleSubmit}>
          <AddCategoryInput
            autoFocus
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </AddCategoryForm>
      ) : (
        <AddCategoryButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowInput(true);
          }}
          style={{ width: "50px" }}
        >
          +
        </AddCategoryButton>
      )}
    </>
  );
};

const Categories = () => {
  const categories = useRecoilValue(categoriesState);

  // 点击空白处取消添加category
  const setAddCategoryShowInput = useSetRecoilState(addCategoryShowInputState);

  // 点击空白处取消删除的选中
  // 不影响正常选中的类目
  const setCategoryDeleteSelect = useSetRecoilState(categoryDeleteSelectState);

  const handleClick = () => {
    setAddCategoryShowInput(false);
    setCategoryDeleteSelect("");
  };

  return (
    <StyledCategories onClick={handleClick}>
      {categories.map((category) => (
        <Btn key={category} category={category} />
      ))}
      <AddCagetory />
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

const StyledCategories = styled.div`
  height: 50vh;
`;

const AddCategoryButton = styled(CategoryBtn)`
  width: 50px;
  padding: 0.5em;
`;

const AddCategoryForm = styled.form`
  display: inline-block;
  width: 60px;
`;

const AddCategoryInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: white;
  padding: 0.5em;
`;

export default Edit;

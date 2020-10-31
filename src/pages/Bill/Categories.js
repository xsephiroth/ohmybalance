import React, { useState, useEffect, useCallback } from "react";
import produce from "immer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { fetchCategories, updateCategories } from "../../api";
import { useLongClick } from "../../hooks";
import {
  billCategoryState,
  billState,
  billTypeState,
  categoriesState,
} from "./state";

const Container = styled.div`
  flex: 1;
`;

const Button = styled.button`
  outline: none;
  -webkit-tap-highlight-color: transparent;
  padding: 4px 8px;
  border-radius: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  color: ${({ theme }) => theme.color.primary};
  user-select: none;

  border: 1px solid transparent;
  ${({ active, theme }) =>
    active &&
    css`
      border: 1px solid ${theme.color.secondary};
    `}

  position: relative;
  ${(props) =>
    props.showDel &&
    css`
      &:after {
        content: "X";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 6px 8px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.expense};
      }
    `}
`;

const AddCategoryButton = styled(Button)`
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

const CategoryBtn = React.memo(
  ({ category, active, showDel, onClick, onLongClick, ...restProps }) => {
    const handleClick = () => onClick?.(category);
    const handleLongClick = () => onLongClick?.(category);
    const ref = useLongClick(500, handleClick, handleLongClick);

    return (
      <Button
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        active={active}
        showDel={showDel}
        {...restProps}
      >
        {category}
      </Button>
    );
  }
);

const useInvalidateCategories = () => {
  const qc = useQueryCache();
  return useCallback(() => {
    qc.invalidateQueries("categories");
  }, [qc]);
};

const AddCagetory = React.memo(({ showInput, setShowInput }) => {
  const [newCategory, setNewCategory] = useState("");

  // 隐藏添加输入框时清空旧数据
  useEffect(() => {
    !showInput && setNewCategory("");
  }, [showInput]);

  const billType = useRecoilValue(billTypeState);
  const categories = useRecoilValue(categoriesState);

  const invalidateCategories = useInvalidateCategories();
  const [mutateCategories] = useMutation(updateCategories, {
    onSettled: () => {
      setShowInput(false);
      invalidateCategories();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 避免重复添加同一类目
    if ((categories?.[billType] || []).includes(newCategory)) {
      setShowInput(false);
      return;
    }

    // 更新
    mutateCategories(
      produce(categories, (categoriesSnapshot) => {
        categoriesSnapshot[billType].push(newCategory);
      })
    );
  };

  return (
    <>
      {showInput ? (
        <AddCategoryForm onSubmit={handleSubmit}>
          <AddCategoryInput
            autoFocus
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value.trim())}
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
});

const Categories = React.memo(() => {
  const [categoryDeleteSelect, setCategoryDeleteSelect] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const setBill = useSetRecoilState(billState);
  const billType = useRecoilValue(billTypeState);
  const [currentCategory, setCurrentCategory] = useRecoilState(
    billCategoryState
  );
  const [categories, setCategories] = useRecoilState(categoriesState);
  const typeCategories = categories[billType];

  // 同步线上的categories数据
  useQuery("categories", fetchCategories, {
    refetchOnWindowFocus: false,
    onSuccess: (categories) => setCategories(categories),
  });

  const invalidateCategories = useInvalidateCategories();
  const [mutateCategories] = useMutation(updateCategories, {
    onSettled: () => {
      setShowAddInput(false);
      invalidateCategories();
    },
  });

  const handleReset = () => {
    setBill((b) => ({ ...b, category: "" }));
    setCategoryDeleteSelect("");
    setShowAddInput(false);
  };

  const handleCategoryClick = (category) => {
    if (categoryDeleteSelect !== category) {
      // 选择类目或反选
      setCurrentCategory(currentCategory === category ? "" : category);
      setCategoryDeleteSelect("");
      setShowAddInput(false);
    } else {
      // 准备删除时再次点击确认
      // 同步更新
      mutateCategories(
        produce(categories, (categoriesSnapshot) => {
          categoriesSnapshot[billType] = categoriesSnapshot[billType].filter(
            (c) => c !== category
          );
        })
      );
    }
  };

  const handleCategoryLongClick = (category) => {
    setCategoryDeleteSelect(category);
    setCurrentCategory("");
    setShowAddInput(false);
  };

  return (
    <Container onClick={handleReset}>
      {typeCategories?.map((category) => (
        <CategoryBtn
          key={category}
          category={category}
          active={currentCategory === category}
          showDel={categoryDeleteSelect === category}
          onClick={handleCategoryClick}
          onLongClick={handleCategoryLongClick}
        />
      ))}
      <AddCagetory showInput={showAddInput} setShowInput={setShowAddInput} />
    </Container>
  );
});

export default Categories;

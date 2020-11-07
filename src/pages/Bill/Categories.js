import React, { useState, useEffect, useCallback } from "react";
import produce from "immer";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { useErrorPopup } from "../../components/ErrorPopup";
import { fetchCategories, updateCategories } from "../../api";
import { useLongPress } from "../../hooks";
import {
  billCategoryState,
  billTypeState,
  categoriesState,
  willDeleteCategoryState,
} from "./state";

const Container = styled.div`
  flex: 1;
`;

const Button = styled.button`
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  padding: 4px 8px;
  margin: 5px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  color: ${({ theme }) => theme.color.primary};
  user-select: none;

  border-radius: 10px;
  border: none;

  min-width: 6em;
  line-height: 1.5em;

  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 4%;
    bottom: -2px;
    margin: 0 auto;

    background-color: ${(props) => (props.active ? "white" : "transparent")};

    width: ${(props) => (props.active ? "92%" : 0)};
    height: 2px;
    transition: width 0.3s;
  }

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
  ({ category, active, showDel, ...restProps }) => {
    const [popupError] = useErrorPopup();
    const categories = useRecoilValue(categoriesState);
    const billType = useRecoilValue(billTypeState);
    const [currentCategory, setCurrentCategory] = useRecoilState(
      billCategoryState
    );
    const [willDeleteCategory, setWillDeleteCategory] = useRecoilState(
      willDeleteCategoryState
    );
    const isDeleteSelected = willDeleteCategory === category;

    const invalidateCategories = useInvalidateCategories();
    const [mutateCategories] = useMutation(updateCategories, {
      onSettled: invalidateCategories,
      onError: (err) => popupError(err),
    });

    const ref = useLongPress(500, {
      onClick: () => {
        if (willDeleteCategory !== category) {
          // 选择类目或反选
          setCurrentCategory(currentCategory === category ? "" : category);
          setWillDeleteCategory("");
        } else {
          // 准备删除时再次点击确认
          // 同步更新
          mutateCategories(
            produce(categories, (categoriesSnapshot) => {
              categoriesSnapshot[billType] = categoriesSnapshot[
                billType
              ].filter((c) => c !== category);
            })
          );
        }
      },
      onLongPress: () => {
        setCurrentCategory("");
        setWillDeleteCategory(category);
      },
    });

    // 准备删除时点击其它地方取消删除选中
    const onDeleteBlur = () => isDeleteSelected && setWillDeleteCategory("");

    return (
      <Button
        ref={ref}
        active={currentCategory === category}
        showDel={willDeleteCategory === category}
        onBlur={onDeleteBlur}
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

const AddCagetory = () => {
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [popupError] = useErrorPopup();

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
    onError: (err) => popupError(err),
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
            onBlur={() => setShowInput(false)}
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

const Categories = React.memo(() => {
  const billType = useRecoilValue(billTypeState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const typeCategories = categories[billType];
  const [popupError] = useErrorPopup();

  // 同步线上的categories数据
  useQuery("categories", fetchCategories, {
    refetchOnWindowFocus: false,
    onSuccess: (categories) => setCategories(categories),
    onError: (err) => popupError(err),
  });

  return (
    <Container>
      {typeCategories?.map((category) => (
        <CategoryBtn key={category} category={category} />
      ))}
      <AddCagetory />
    </Container>
  );
});

export default Categories;

import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { useQuery, useMutation } from "react-query";
import { fetchCategories, updateCategories } from "../../api";
import {
  billTypeCategoriesSelector,
  billTypeState,
  categoriesState,
  categoryState,
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

export const useLongClick = (duration = 500, onClick, onLongClick) => {
  const ref = useRef();
  const longRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const btn = ref.current;

    let id;
    const end = () => {
      clearTimeout(id);

      if (!longRef.current) {
        // eslint-disable-next-line no-unused-expressions
        onClick?.();
      }
    };

    const start = (e) => {
      // 避免touchstart与mousedown冲突
      e.preventDefault();

      // reset
      clearTimeout(id);
      longRef.current = false;

      id = setTimeout(() => {
        longRef.current = true;
        // eslint-disable-next-line no-unused-expressions
        onLongClick?.();
        navigator.vibrate(50);
      }, duration);
    };

    btn.addEventListener("touchstart", start);
    btn.addEventListener("touchend", end);
    btn.addEventListener("touchcancel", end);
    btn.addEventListener("mousedown", start);
    btn.addEventListener("mouseup", end);

    return () => {
      clearTimeout(id);
      btn.removeEventListener("touchstart", start);
      btn.removeEventListener("touchend", end);
      btn.removeEventListener("touchcancel", end);
      btn.removeEventListener("mousedown", start);
      btn.removeEventListener("mouseup", end);
    };
  }, [duration, onClick, onLongClick]);

  return ref;
};

// 修改BillType的categories并更新完整categories的数据
export const useBillTypeCategoriesMutation = (config = {}) => {
  const billType = useRecoilValue(billTypeState);
  const anotherBillType = billType === "expense" ? "income" : "expense";
  const [categories, setCategories] = useRecoilState(categoriesState);

  return useMutation(async (newBillTypeCategories) => {
    const newCategories = {
      [billType]: newBillTypeCategories,
      [anotherBillType]: [...categories[anotherBillType]],
    };
    try {
      await updateCategories(newCategories);
      setCategories(newCategories);
    } catch (e) {
      throw e;
    }
  }, config);
};

const AddCagetory = React.memo(({ showInput, setShowInput }) => {
  const [newCategory, setNewCategory] = useState("");

  // 隐藏添加输入框时清空旧数据
  useEffect(() => {
    !showInput && setNewCategory("");
  }, [showInput]);

  const categories = useRecoilValue(billTypeCategoriesSelector);
  const [updateCategories] = useBillTypeCategoriesMutation();
  const handleSubmit = (e) => {
    e.preventDefault();

    // 避免重复添加同一类目
    if (categories.includes(newCategory)) {
      setShowInput(false);
      return;
    }

    // 同步更新
    updateCategories([...categories, newCategory], {
      onSettled: () => setShowInput(false),
    });
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

  // 同步线上的categories数据
  const setAllCategories = useSetRecoilState(categoriesState);
  useQuery("categories", fetchCategories, {
    refetchOnWindowFocus: false,
    onSuccess: (categories) => setAllCategories(categories),
  });

  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(billTypeCategoriesSelector);

  const handleReset = () => {
    setCurrentCategory("");
    setCategoryDeleteSelect("");
    setShowAddInput(false);
  };

  const [updateBillTypeCategories] = useBillTypeCategoriesMutation();
  const handleCategoryClick = (category) => {
    if (categoryDeleteSelect !== category) {
      // 选择类目或反选
      setCurrentCategory((c) => (c === category ? "" : category));
      setCategoryDeleteSelect("");
      setShowAddInput(false);
    } else {
      // 准备删除时再次点击确认
      // 同步更新
      updateBillTypeCategories(
        categories.filter((c) => c !== category),
        {
          onSettled: () => setShowAddInput(false),
        }
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
      {categories?.map((category) => (
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

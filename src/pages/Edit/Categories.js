import React, { useState, useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  categoriesState,
  categoryDeleteSelectState,
  isCategoryChoiceSelector,
  isWillDeleteCategorySelector,
} from "../../store/category";

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

const useLongClick = (duration = 500, onClick, onLongClick) => {
  const ref = useRef();
  const longRef = useRef(false);

  useEffect(() => {
    console.log("effect");
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

const CategoryBtn = ({ category, ...restProps }) => {
  // 选中
  const [active, setCategorySelect] = useRecoilState(
    isCategoryChoiceSelector(category)
  );
  const handleClick = useCallback(() => {
    setCategorySelect(category);
  }, [category, setCategorySelect]);

  // 长按
  const [showDelete, setCategoryDeleteSelect] = useRecoilState(
    isWillDeleteCategorySelector(category)
  );
  const handleLongClick = useCallback(() => {
    setCategoryDeleteSelect(category);
  }, [category, setCategoryDeleteSelect]);

  const ref = useLongClick(500, handleClick, handleLongClick);

  return (
    <Button
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      active={active}
      showDel={showDelete}
      {...restProps}
    >
      {category}
    </Button>
  );
};

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

const Container = styled.div`
  height: 50vh;
`;

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
    <Container onClick={handleClick}>
      {categories.map((category) => (
        <CategoryBtn key={category} category={category} />
      ))}
      <AddCagetory />
    </Container>
  );
};

export default Categories;

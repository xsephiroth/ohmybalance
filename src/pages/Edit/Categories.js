import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLongClick, useCategories, useMutateCategories } from "./hooks";

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

const CategoryBtn = ({
  category,
  active,
  showDel,
  onClick,
  onLongClick,
  ...restProps
}) => {
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
};

const AddCagetory = ({ showInput, setShowInput }) => {
  // 隐藏添加输入框时清空旧数据
  useEffect(() => {
    !showInput && setNewCategory("");
  }, [showInput]);

  const [newCategory, setNewCategory] = useState("");

  const { data: categories } = useCategories();
  const [mutateCategories] = useMutateCategories({
    onSettled: () => setShowInput(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categories.includes(newCategory)) {
      setShowInput(false);
      return;
    }

    mutateCategories([...categories, newCategory]);
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
  const { data: categories } = useCategories();
  const [categorySelect, setCategorySelect] = useState("");
  const [categoryDeleteSelect, setCategoryDeleteSelect] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const handleReset = () => {
    setCategorySelect("");
    setCategoryDeleteSelect("");
    setShowAddInput(false);
  };

  const [mutateCategories] = useMutateCategories();

  const handleCategoryClick = (category) => {
    if (categoryDeleteSelect !== category) {
      setCategorySelect((c) => (c === category ? "" : category));
      setCategoryDeleteSelect("");
      setShowAddInput(false);
    } else {
      mutateCategories(categories.filter((c) => c !== category));
    }
  };

  const handleCategoryLongClick = (category) => {
    setCategoryDeleteSelect(category);
    setCategorySelect("");
    setShowAddInput(false);
  };

  return (
    <Container onClick={handleReset}>
      {categories?.map((category) => (
        <CategoryBtn
          key={category}
          category={category}
          active={categorySelect === category}
          showDel={categoryDeleteSelect === category}
          onClick={handleCategoryClick}
          onLongClick={handleCategoryLongClick}
        />
      ))}
      <AddCagetory showInput={showAddInput} setShowInput={setShowAddInput} />
    </Container>
  );
};

export default Categories;

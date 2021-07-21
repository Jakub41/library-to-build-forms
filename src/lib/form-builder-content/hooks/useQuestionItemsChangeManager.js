function useQuestionItemsChangeManager(block, onChange, templateForNewItem) {
  const handleOnRemove = (index) => {
    const result = [...block.items];
    result.splice(index, 1);
    onMultiSingleDropdownSelectChange(result);
  };

  const handleOnAddNew = () => {
    const result = [...block.items];
    result.push(templateForNewItem);
    onMultiSingleDropdownSelectChange(result);
  };

  const handleOnItemChange = (item, index) => {
    const result = [...block.items];
    result[index] = item;
    onMultiSingleDropdownSelectChange(result);
  };

  const onMultiSingleDropdownSelectChange = (items) => {
    const updated = { ...block, items };
    onChange(updated);
  };

  return { handleOnRemove, handleOnAddNew, handleOnItemChange, onMultiSingleDropdownSelectChange };
}

export default useQuestionItemsChangeManager;

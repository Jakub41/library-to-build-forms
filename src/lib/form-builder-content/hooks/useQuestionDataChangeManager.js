import { blockTypes } from '../../constants'
import { slugify } from '../utils/slugify'

function useQuestionDataChangeManager(block, onChange) {
    const handleEditorUpdate = value => {
        const updated = { ...block, body: value }
        onChange(updated)
    }

    const onChangeHandle = ({ target }) => {
        const updated = { ...block, [target.name]: target.value }
        onChange(updated)
    }

    const onChangeTitleHandle = ({ target }) => {
        const updated = {
            ...block,
            [target.name]: target.value,
            key: slugify(target.value),
        }
        onChange(updated)
    }

    const handleClickClean = name => {
        const updated = { ...block, [name]: '' }
        onChange(updated)
    }

    const handleOptionClickClean = name => {
        const updated = { ...block, options: { ...block.options, [name]: '' } }
        onChange(updated)
    }

    const onCheckOptional = () => {
        const updated = {
            ...block,
            options: { ...block.options, optional: !block.options?.optional },
        }
        onChange(updated)
    }

    const handleTextOptionChange = ({ target }) => {
        const updated = {
            ...block,
            options: { ...block.options, [target.name]: target.value },
        }
        onChange(updated)
    }

    const handleCheckboxOptionChange = ({ target }) => {
        const updated = {
            ...block,
            options: { ...block.options, [target.name]: target.checked },
        }
        onChange(updated)
    }

    const handleRecipientChange = ({ target }) => {
        const updated = { ...block, recipient: { role: target.value } }
        onChange(updated)
    }

    const getDefaultPropsForNewBlock = (blockType, oldBlock) => {
        switch (blockType) {
            case blockTypes.yesno:
                return {
                    options: {
                        trueValue: 'Yes',
                        falseValue: 'No',
                        trueValueIsMandatory: false,
                        falseValueIsMandatory: false,
                    },
                }
            case blockTypes.number:
                return { options: { minValue: 1, maxValue: 10 } }
            case blockTypes.scale:
                return {
                    options: {
                        minValue: 1,
                        maxValue: 10,
                        minValueText: '',
                        maxValueText: '',
                    },
                }
            case blockTypes.freetext:
                return {
                    options: {
                        isMultiLine: false,
                        placeholder: 'Your answer...',
                    },
                }
            default:
            case blockTypes.multiselect:
            case blockTypes.singleselect:
            case blockTypes.dropdown:
                if (
                    [
                        blockTypes.multiselect,
                        blockTypes.singleselect,
                        blockTypes.dropdown,
                    ].includes(oldBlock.type)
                ) {
                    const { options, items } = oldBlock
                    return { options, items }
                } else {
                    return {
                        options: { allowFreeText: false },
                        items: [
                            {
                                key: '',
                                value: '',
                                isMandatory: false,
                            },
                            {
                                key: '',
                                value: '',
                                isMandatory: false,
                            },
                        ],
                    }
                }
        }
    }

    const useRange = (size, startAt = 0) => {
        return [...Array(size).keys()].map(i => i + startAt)
    }

    return {
        handleEditorUpdate,
        onChangeHandle,
        onChangeTitleHandle,
        handleClickClean,
        handleOptionClickClean,
        onCheckOptional,
        getDefaultPropsForNewBlock,
        handleTextOptionChange,
        handleCheckboxOptionChange,
        handleRecipientChange,
        useRange,
    }
}

export default useQuestionDataChangeManager

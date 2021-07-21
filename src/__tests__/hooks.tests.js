import useTextStyleManager from '../lib/form-builder-styling/hooks/useTextStyleManager'
import useColorStyleManager from '../lib/form-builder-styling/hooks/useColorStyleManager'
import {
    useQuestionDataChangeManager,
    useQuestionItemsChangeManager,
} from '../lib/form-builder-content/hooks'

describe('Form style builder tests', () => {
    const mockCallback = jest.fn()

    describe('Modify font styles', () => {
        test('onStyleChange: Change body fontWeight to 300', () => {
            const theme = {
                typography: {
                    body1: {
                        fontWeight: 400,
                    },
                },
            }
            const result = useTextStyleManager(theme, mockCallback)

            result.onStyleChange('body1', 300, 'fontWeight')
            expect(mockCallback).toHaveBeenCalledWith({
                typography: {
                    body1: { fontWeight: 300 },
                },
            })
        })

        test('onStyleChange: Change fontStyle to italic', () => {
            const theme = {
                typography: {},
            }
            const result = useTextStyleManager(theme, mockCallback)
            result.onStyleChange('body1', { fontStyle: 'italic' }, 'fontStyle')

            expect(mockCallback).toHaveBeenCalledWith({
                typography: {
                    body1: {
                        fontStyle: 'italic',
                    },
                },
            })
        })

        test('onStyleChange: Change textDecoration underlined', () => {
            const theme = {
                typography: {},
            }
            const result = useTextStyleManager(theme, mockCallback)
            result.onStyleChange(
                'body1',
                { textDecoration: 'underlined' },
                'fontStyle'
            )

            expect(mockCallback).toHaveBeenCalledWith({
                typography: {
                    body1: {
                        textDecoration: 'underlined',
                    },
                },
            })
        })
    })

    describe('Modify theme colors', () => {
        test('onColorChange: Change primary color and adjust hover style for the new color', () => {
            const theme = {
                palette: {
                    primary: {
                        main: 'blue',
                    },
                },
            }
            const result = useColorStyleManager(theme, mockCallback)
            result.onColorChange('primary', '#328917')

            expect(mockCallback).toHaveBeenCalledWith({
                palette: {
                    primary: {
                        main: '#328917',
                    },
                },
                overrides: {
                    MuiButton: {
                        containedPrimary: {
                            '&:hover': {
                                backgroundColor: '#3289174D', // Opacity on the new color: 30%
                            },
                        },
                    },
                },
            })
        })
    })
})

describe('Form content builder tests', () => {
    const mockCallback = jest.fn()
    //prettier disable

    const mockOptions = {
        trueValue: 'Yes',
        falseValue: 'No',
        trueValueIsMandatory: false,
        falseValueIsMandatory: true,
        optional: false,
    }
    const mockItems = [
        { value: 'Lorem ipsum dolor', isMandatory: false },
        { value: 'Mandatory', isMandatory: true },
    ]
    const mockBlock = {
        title: '',
        body: '',
        options: mockOptions,
        items: mockItems,
    }

    const templateForNewItem = { key: '', value: '', isMandatory: false }

    describe('useQuestionDataChangeManager: Handles section blocks data', () => {
        test('handleEditorUpdate: Handles update on body', () => {
            const { handleEditorUpdate } = useQuestionDataChangeManager(
                mockBlock,
                mockCallback
            )
            const testValue = 'This is the body of the block'
            handleEditorUpdate(testValue)
            expect(mockCallback).toBeCalledWith({
                ...mockBlock,
                body: testValue,
            })
        })

        test('onCheckOptional: Handles updates on optional questions for block (Checkbox)', () => {
            const { onCheckOptional } = useQuestionDataChangeManager(
                mockBlock,
                mockCallback
            )
            onCheckOptional()
            expect(mockCallback).toBeCalledWith({
                ...mockBlock,
                options: {
                    ...mockBlock.options,
                    optional: !mockBlock.optional,
                },
            })
        })

        test('useRange: Create array of consecutive numbers', () => {
            const { useRange } = useQuestionDataChangeManager()
            const result = useRange(10)

            expect(result).toBeArray()
            expect(result).toHaveLength(10)
        })
    })

    describe('useQuestionItemsChangeManager: Handle block items data', () => {
        test('handleOnRemove: Remove item from block (delete second item from the array)', () => {
            const { handleOnRemove } = useQuestionItemsChangeManager(
                mockBlock,
                mockCallback
            )

            const expectedResult = {
                ...mockBlock,
                items: [{ value: 'Lorem ipsum dolor', isMandatory: false }],
            }
            handleOnRemove(1)
            expect(mockCallback).toBeCalledWith(expectedResult)
        })

        test('handleOnItemChange: Edit item from block (update first item)', () => {
            const { handleOnItemChange } = useQuestionItemsChangeManager(
                mockBlock,
                mockCallback
            )
            const expectedResult = {
                ...mockBlock,
                items: [
                    { value: 'Mandatory', isMandatory: true },
                    { value: 'Mandatory', isMandatory: true },
                ],
            }
            handleOnItemChange({ value: 'Mandatory', isMandatory: true }, 0)
            expect(mockCallback).toBeCalledWith(expectedResult)
        })

        test('handleOnAddNew: Add new item inside block (push to items array)', () => {
            const { handleOnAddNew } = useQuestionItemsChangeManager(
                mockBlock,
                mockCallback,
                templateForNewItem
            )
            const expectedResult = {
                ...mockBlock,
                items: mockItems.concat(templateForNewItem),
            }
            handleOnAddNew()
            expect(mockCallback).toBeCalledWith(expectedResult)
        })
    })
})

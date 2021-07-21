import { blockTypes } from '../constants'

const isInvalidNumber = block => {
    const answer = block.answer

    if (answer < block.options.minValue) {
        return true
    }

    if (answer > block.options.maxValue) {
        return true
    }

    return false
}

const isInvalidYesNo = block => {
    if (
        block.answer !== block.options.falseValue &&
        block.options.falseValueIsMandatory === true
    ) {
        return true
    }

    if (
        block.answer !== block.options.trueValue &&
        block.options.trueValueIsMandatory === true
    ) {
        return true
    }

    return false
}

const isInvalidMultiSelect = block => {
    if(block.items.some(x => x.isMandatory)) { 
        if(block.items.some(x => x.isMandatory && block.answer.includes(x.key))) {
            return false;
        } else {
            return true;
        }
    }
    return !block.answer.length;
}

const isInvalidDropdown = block => {
    if(block.items.some(x => x.isMandatory)) {
        const isAcceptedAnswer = block.items.some(x => x.key === block.answer && x.isMandatory);
        return !isAcceptedAnswer;
    }
    return !block.answer
}

const isInvalidSingleSelect = block => {
    if (!block.options?.optional && !block.answer) {
        return true
    }

    if(block.items.some(x => x.isMandatory)) {
        const isAcceptedAnswer = block.items.some(x => x.key === block.answer && x.isMandatory);
        const isFreeTextAnswer = block.answer.includes('{free-text}') && block.options?.isFreeTextMandatory;

        if(isAcceptedAnswer || isFreeTextAnswer) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

export const isInvalidBlockAnswer = (block, currentUser) => {
    const questionTypes = [
        blockTypes.freetext,
        blockTypes.multiselect,
        blockTypes.yesno,
        blockTypes.singleselect,
        blockTypes.number,
        blockTypes.dropdown,
        blockTypes.scale,
        blockTypes.signature,
    ]

    const isOfTypeQuestion = questionTypes.includes(block.type)

    if (isOfTypeQuestion === false || block.options?.optional) {
        return false
    }

    if (block.type === blockTypes.signature) {
        if (block.recipient?.id === currentUser?.id) {
            const valid =
                (block.options?.disclaimer && block.disclaimerChecked) ||
                !block.options?.disclaimer
            return !valid || !block.answer
        }
        return false
    }

    if (!block.answer) {
        return true
    }

    if (block.type === blockTypes.number && isInvalidNumber(block)) {
        return true
    }

    if (block.type === blockTypes.yesno && isInvalidYesNo(block)) {
        return true
    }

    if (block.type === blockTypes.multiselect && isInvalidMultiSelect(block)) {
        return true
    }

    if (block.type === blockTypes.dropdown && isInvalidDropdown(block)) {
        return true
    }

    if (
        block.type === blockTypes.singleselect &&
        isInvalidSingleSelect(block)
    ) {
        return true
    }
}

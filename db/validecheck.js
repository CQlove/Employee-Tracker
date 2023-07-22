const validateCheck = function (input) {
    if (input.trim() === '') {
        return 'This input cannot be empty, please re-enter again';
    }
    return true;
};

const validateCheckNumber = function (input) {
    const numberCheck = /^\d+(\.\d{1,2})?$/;
    if (!numberCheck.test(input)) {
        return 'Must be input a number and up to two decimal places, please enter again';
    }
    return true;
};

module.exports = {
    validateCheck,
    validateCheckNumber,
};
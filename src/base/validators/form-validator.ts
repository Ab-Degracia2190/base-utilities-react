const validateForm = (
    formData: { [key: string]: any } | { [key: string]: any }[],
    requiredFields: { [key: string]: boolean },
    emailFields: string[] = []
): { [key: string]: string } | { [index: number]: { [key: string]: string } } => {

    const isEmpty = (value: any, isRequired: boolean) => {
        if (typeof value === 'boolean') {
            return isRequired && !value;
        }
        return value === undefined || value === null || value === '' ||
            (Array.isArray(value) && value.length === 0);
    };

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateSingleObject = (data: { [key: string]: any }) => {
        const errors: { [key: string]: string } = {};

        for (const [key, value] of Object.entries(data)) {
            if (requiredFields[key] && isEmpty(value, requiredFields[key])) {
                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                errors[key] = `${formattedKey} is required`;
            } else if (emailFields.includes(key) && value && !isEmailValid(value)) {
                const emailFormattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                errors[key] = `${emailFormattedKey} format is not valid`;
            }
        }

        return errors;
    };

    if (Array.isArray(formData)) {
        const errors: { [index: number]: { [key: string]: string } } = {};
        formData.forEach((field, index) => {
            const fieldErrors = validateSingleObject(field);
            if (Object.keys(fieldErrors).length > 0) {
                errors[index] = fieldErrors;
            }
        });
        return errors;
    } else {
        return validateSingleObject(formData);
    }
}

export { validateForm };
import isEmail from 'validator/lib/isEmail'

export const email = (value: string, values: any) => {
    return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

const isDirty = (value: string | number) => {
    return value || value === 0;
}

export const required = (requiredFields: string[], values: any) =>{
    return requiredFields.reduce(
        (fields, field) => ({
            ...fields,
            ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
        }),
        {},
    );
}
function isInList(email, emails) {
    return emails.includes(email);
}

function isEmail(email) {
    // eslint-disable-next-line
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
}

export function isValid(email, emails, setError) {
    let error = null;

    if (isInList(email, emails)) {
        error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
        const emailValue=email.name;
        error = emailValue +` is not a valid email address.`;
    }

    if (error) {
        setError(error);
        return false;
    }

    return true;
}

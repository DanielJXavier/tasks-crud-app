const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validateEmail = (email: string) => EMAIL_REGEX.test(email);

export const validatePassword = (password: string) => password.length >= 6;

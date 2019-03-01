export const registerUser = (firstName, lastName, email) => ({
    type: 'REGISTER_USER',
    firstName,
    lastName,
    email
});

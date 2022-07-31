export const getUser = async (db, email) => {
    const user = await db.User.findOne({ email });
    return user;
};

export const handleGraphQLError = (e) => ({
    code: e.extensions.response.status,
    success: false,
    message: e.extensions.response.body,
});

export const handleAuthError = () => ({
    code: 401,
    success: false,
    message: 'Unauthenticated',
});

export const checkUserRole = (user, requiredRole) => {
    const roles = user?.idTokenClaims?.roles || [];
    return roles.includes(requiredRole);
};
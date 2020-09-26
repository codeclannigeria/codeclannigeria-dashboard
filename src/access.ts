// src/access.ts
export default function access(initialState: { currentUser?: API.UserDto | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.role === 'ADMIN',
  };
}

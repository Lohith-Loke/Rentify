export default function isValidPassword(password) {
  if (password.length > 7) {
    return true;
  }
  return false;
}

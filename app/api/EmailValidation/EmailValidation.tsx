export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^[d]{3}-[d]{3}-[d]{4}$/;
  if (regex.test(phoneNumber)) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};

// backend/utils/validators.js

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  
  /**
   * Validate phone number (10-15 digits)
   * @param {string} phone
   * @returns {boolean}
   */
  export const isValidPhone = (phone) => {
    const regex = /^\d{10,15}$/;
    return regex.test(phone);
  };
  
  /**
   * Validate password (min 6 characters)
   * @param {string} password
   * @returns {boolean}
   */
  export const isValidPassword = (password) => {
    return password && password.length >= 6;
  };
  
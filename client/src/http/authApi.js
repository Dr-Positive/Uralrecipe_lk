import { $host } from "./index";

export const forgotPassword = async (login, tel) => {
  try {
    const { data } = await $host.post("api/auth/forgot-password", {
      login,
      tel,
    });
    return data;
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error.response?.data || error.message);
    throw error;
  }
};  

// Запрос для установки нового пароля с токеном
export const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await $host.post("api/auth/reset-password", {
      token,
      newPassword,
    });
    return data;
  } catch (error) {
    console.error("Ошибка при установке нового пароля:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    await $host.post("api/auth/verify-token", {token});
    return true;
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error.response?.data || error.message);
    return false;
  }
};
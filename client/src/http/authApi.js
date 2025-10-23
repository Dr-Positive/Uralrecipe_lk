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
export const resetPassword = async (token, password) => {
  try {
    const { data } = await $host.post("api/auth/reset-password", {token,password});
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


export const requestEmailChange = async (login,password, newEmail) => {
  const { data } = await $host.post('/api/user/request-email-change', { login, password, newEmail });
  return data;
};

export const confirmEmailChange = async (token) => {
  const { data } = await $host.post('/api/user/confirm-email-change', { token });
  return data;
};
export const requestResetToken = async (login, password) => {
  try {
    const { data } = await $host.post("/api/auth/request-reset-password", {
      login,
      password,
    });
    return data;
  } catch (error) {
    console.error("Ошибка при запросе сброса пароля:", error.response?.data || error.message);
    throw error;
  }
};
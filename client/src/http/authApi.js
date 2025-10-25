import { $host,authHost } from "./index.js";

/* ===========================
   🔐 СБРОС ПАРОЛЯ
=========================== */

// 🔹 Неавторизованный пользователь (забыл пароль)
export const forgotPassword = async (login, tel) => {
  try {
    const { data } = await $host.post("/api/auth/forgot-password", { login, tel });
    return data;
  } catch (error) {
    console.error("Ошибка при запросе сброса пароля:", error.response?.data || error.message);
    throw error.response?.data || { message: "Ошибка при сбросе пароля" };
  }
};

// 🔹 Авторизованный пользователь (хочет изменить пароль)
export const requestResetToken = async (login, password) => {
  try {
    const { data } = await $host.post("/api/auth/request-reset-password", { login, password });
    return data;
  } catch (error) {
    console.error("Ошибка при генерации токена сброса:", error.response?.data || error.message);
    throw error.response?.data || { message: "Ошибка при генерации токена" };
  }
};

// 🔹 Проверка токена (валиден ли токен сброса)
export const verifyToken = async (token) => {
  try {
    const { data } = await $host.post("/api/auth/verify-token", { token });
    return data;
  } catch (error) {
    console.error("Ошибка при проверке токена:", error.response?.data || error.message);
    throw error.response?.data || { message: "Неверный или просроченный токен" };
  }
};

// 🔹 Установка нового пароля
export const resetPassword = async (token, password) => {
  try {
    const { data } = await $host.post("/api/auth/reset-password", { token, password });
    return data;
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error.response?.data || error.message);
    throw error.response?.data || { message: "Ошибка при сбросе пароля" };
  }
};

/* ===========================
   📧 СМЕНА EMAIL
=========================== */

// 🔹 Запрос на смену email (пользователь вводит текущий пароль и новый email)
export const requestEmailChange = async (login, password, newEmail) => {
  try {
    const { data } = await $host.post("/api/auth/request-email-change", { login, password, newEmail });
    return data;
  } catch (error) {
    console.error("Ошибка при запросе смены email:", error.response?.data || error.message);
    throw error.response?.data || { message: "Ошибка при смене email" };
  }
};

// 🔹 Подтверждение смены email по токену из письма
export const confirmEmailChange = async (token) => {
  try {
    const { data } = await $host.post("/api/auth/confirm-email-change", { token });
    return data;
  } catch (error) {
    console.error("Ошибка при подтверждении email:", error.response?.data || error.message);
    throw error.response?.data || { message: "Ошибка при подтверждении email" };
  }
};



export const fetchUser = async (userId) => {
  const { data } = await $host.get(`/api/user/${userId}`);
  return data;
};


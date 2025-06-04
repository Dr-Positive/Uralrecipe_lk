import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const logining = async (login, password) => {
    const { data } = await $host.post('api/user/logining', { login, password });

    // Декодируем токен
    const decodedToken = jwtDecode(data.token);

    console.log('Декодированный токен:', decodedToken);

    // Проверяем наличие роли и compl
    if (!decodedToken.role) {
        throw new Error('Роль отсутствует в токене');
    }

    if (!decodedToken.compl) {
        throw new Error('Compl отсутствует в токене');
    }

    // Сохраняем токен и возвращаем декодированные данные
    localStorage.setItem('token', data.token);
    return { ...decodedToken, role: decodedToken.role, compl: decodedToken.compl };
};

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const hashPasswords = async () => {
    const { data } = await $host.post('api/user/hash-passwords');
    return data;
};
// export const resetPassword = async () => {
//     const { data } = await $host.post('api/auth/reset-password');
//     return data;
// };

// export const sendResetPasswordLink = async (email) => {
//     const { data } = await $host.post('api/user/reset-password');
//     return data;
// };


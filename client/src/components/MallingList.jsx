import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import MailingCard from './MallingCard';

const MallingList = observer(() => {
    const { mailing, alert, user } = useContext(Context);

    // Проверяем, авторизован ли пользователь
    if (!user.isAuth) {
        return <div>...loading</div>;
    }

    // Проверяем наличие роли пользователя и алертов
    if (!user.user.role || !mailing.mailings || mailing.mailings.length === 0) {
        return <div>...loading</div>;
    }

    console.log("Current user:", user.user);
    console.log("All Mailing:", mailing.mailings);

    // Фильтрация алертов в зависимости от роли пользователя
    const filteredMaling = user.user.role === 'ADMIN'
        ? mailing.mailings // Возвращаем все алерты для администраторов
        : mailing.mailings.filter(a => {
            const userCompl = user.user.compl;

            // Проверяем, что userCompl не null или undefined и является целым числом
            if (userCompl === null || userCompl === undefined || !Number.isInteger(userCompl)) return false;

            // Проверяем, что a.compl также является целым числом
            if (!Number.isInteger(a.compl)) return false;

            // Сравниваем значения
            return a.compl === userCompl;
        });

    return (
        <div>
            {filteredMaling.length > 0 ? (
                filteredMaling.map(mailing => (
                    <MailingCard key={mailing.id} mailing={mailing} />
                ))
            ) : (
                <div>No mailings available.</div>
            )}
        </div>
    );
});

export default MallingList;

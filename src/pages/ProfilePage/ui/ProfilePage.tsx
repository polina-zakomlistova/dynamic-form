import React, { FC } from 'react';
import { Profile } from 'entities/Profile';
import cls from './ProfilePage.module.scss';

export const ProfilePage: FC = () => (
    <section>
        <h2 className={cls.title}>Профиль пользователя</h2>
        <Profile />
    </section>
);

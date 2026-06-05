import { test as base } from '@playwright/test'


type UserDetailsFixtureType = {
    username: string,
    password: string,
    credentials: {
        username: string,
        password: string
    },
    userInfo: {
        username: string,
        isAdmin: boolean,
        isExpired: boolean,
        age: number
    }

}

export const test = base.extend<UserDetailsFixtureType>({

    username: async ({ }, use) => {
        await use('user1');
    },

    password: async ({ }, use) => {
        await use('password1');
    },

    credentials: async ({ username, password }, use) => {
        await use({
            username,
            password
        });
    },

    userInfo: async ({ username }, use) => {
        await use({
            username,
            isAdmin: false,
            isExpired: false,
            age: 26
        });
    }
});
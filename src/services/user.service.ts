import { db } from '../config/db.server';
import { User, UserRead } from '../types/user.types';
import { hashData, compareData } from '../utils/helper';



export const userExit = async (email: string): Promise<boolean> => {
    const user = await db.user.findUnique({
        where: { email }
    });
    if (user) {
        return true;
    }
    return false;
};

export const userReigister = async (user: User): Promise<UserRead> => {
    const { email, password } = user;
    return await db.user.create({
        data: {
            email,
            password: await hashData(password)

        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    });

};

export const checkVerification = async (email: string): Promise<boolean> => {
    const user = await db.user.findUnique({
        where: { email }
    });
    if (!user?.isVarified) {
        return false;
    }
    return true;
};

export const userLogin = async (email: string, password: string) => {
    const user = await db.user.findUnique({
        where: { email }
    });
    return user;
};

export const userProfile = async (email: string): Promise<UserRead | null> => {
    const profile = await db.user.findUnique({
        where: {
            email
        },
        select: {
            email: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    });
    if (!profile) {
        throw new Error("Profile Not Found")
    }
    return profile;

};

export const getUserByEmail = async (email: string): Promise<UserRead | null> => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            email: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            isVarified: true
        }
    });
    if (!user) {
        throw new Error("User Not Found")
    }
    return user;
};

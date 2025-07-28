export interface Brand {
    name: string;
    code: string;
    id: number;
}

export interface JWT {
    brands: Brand[];
    role: string;
    allowedServices: string[];
    id: string;
    firstName: string;
    lastName: string;
    sub: string;
    isInternalUser: string;
    userName: string;
    userSurrogateID: string;
}

export const mockJWT: JWT = {
    brands: [
        { name: 'test_name1', code: 'test_code1', id: 1 },
        { name: 'test_name2', code: 'test_code2', id: 2 },
        { name: 'test_name3', code: 'test_code3', id: 3 },
    ],
    role: 'CUSTOMER-RW',
    allowedServices: ['test'],
    id: 'testUserId',
    firstName: 'testFirstName',
    lastName: 'testLastName',
    sub: 'test@email.com',
    isInternalUser: 'testIsInternalUser',
    userName: 'testUserName',
    userSurrogateID: 'testSurrogateID',
};

export const mockAdminJWT: JWT = {
    brands: [
        { name: 'test_name1', code: 'test_code1', id: 1 },
        { name: 'test_name2', code: 'test_code2', id: 2 },
        { name: 'test_name3', code: 'test_code3', id: 3 },
    ],
    role: 'EROTAS ADMIN',
    allowedServices: ['test'],
    id: 'testUserId',
    firstName: 'testFirstName',
    lastName: 'testLastName',
    sub: 'test@erotas.test',
    isInternalUser: 'testIsInternalUser',
    userName: 'testUserName',
    userSurrogateID: 'testSurrogateID',
};

export const mockValidToken = jest.fn().mockReturnValue('VALID');

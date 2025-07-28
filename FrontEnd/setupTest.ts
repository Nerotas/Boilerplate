// Add this to your existing setupTests.ts file
const cryptoMock = {
    getRandomValues: (arr: any) => arr.map(() => Math.floor(Math.random() * 256)),
    subtle: {
        digest: jest.fn(),
        encrypt: jest.fn(),
        decrypt: jest.fn(),
        sign: jest.fn(),
        verify: jest.fn(),
        generateKey: jest.fn(),
        deriveKey: jest.fn(),
        deriveBits: jest.fn(),
        importKey: jest.fn(),
        exportKey: jest.fn(),
        wrapKey: jest.fn(),
        unwrapKey: jest.fn(),
    },
};

Object.defineProperty(global, 'crypto', {
    value: cryptoMock,
    writable: true,
});

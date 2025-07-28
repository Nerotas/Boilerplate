import { queryAllByAttribute, queryByAttribute } from '@testing-library/react';

export const getAllById = queryAllByAttribute.bind(null, 'id');

export const getById = queryByAttribute.bind(null, 'id');

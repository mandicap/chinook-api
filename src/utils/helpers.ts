import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import snakeCase from 'lodash-es/snakeCase';
import transform from 'lodash-es/transform';
import type { CamelCase, SnakeCase } from 'type-fest';

export const getPageUrls = (
    path: string,
    currPage: number,
    totalPages: number,
): { prevPageUrl: string | null; nextPageUrl: string | null } => {
    const prevPageNum = currPage - 1;
    const prevPageUrl = prevPageNum === 0 ? null : `${path}?page=${prevPageNum}`;

    const nextPageNum = currPage + 1;
    const nextPageUrl = totalPages === 1 ? null : `${path}?page=${nextPageNum}`;

    return { prevPageUrl, nextPageUrl };
};

export const toSnakeCase = <T extends CamelCase<object>>(obj: T): SnakeCase<T> =>
    transform(
        obj,
        (result, value, key) => {
            const newKey = typeof key === 'string' ? snakeCase(key) : key;

            const transformedValue = isObject(value) ? toSnakeCase(value as object) : value;

            (result as Record<PropertyKey, unknown>)[newKey as PropertyKey] = transformedValue;
        },
        isArray(obj) ? [] : {},
    ) as SnakeCase<T>;

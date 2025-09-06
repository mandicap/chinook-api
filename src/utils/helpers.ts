import type { PgTable } from 'drizzle-orm/pg-core';
import { isArray, isObject, snakeCase, transform } from 'lodash';
import type { CamelCase, SnakeCase } from 'type-fest';
import db from '@/db';

export const getDynamicLimits = async (
    source: PgTable,
    limit: number,
): Promise<{ totalItems: number; totalPages: number }> => {
    const totalItems = await db.$count(source);
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages };
};

export const getPageUrls = (
    path: string,
    currPage: number,
): { prevPageUrl: string | null; nextPageUrl: string } => {
    const prevPageNum = currPage - 1;
    const prevPageUrl =
        prevPageNum === 0 ? null : `${path}?page=${prevPageNum}`;

    const nextPageNum = currPage + 1;
    const nextPageUrl = `${path}?page=${nextPageNum}`;

    return { prevPageUrl, nextPageUrl };
};

export const toSnakeCase = <T extends CamelCase<object>>(
    obj: T,
): SnakeCase<T> =>
    transform(
        obj,
        (result, value, key) => {
            const newKey = typeof key === 'string' ? snakeCase(key) : key;

            const transformedValue = isObject(value)
                ? toSnakeCase(value as object)
                : value;

            (result as Record<PropertyKey, unknown>)[newKey as PropertyKey] =
                transformedValue;
        },
        isArray(obj) ? [] : {},
    ) as SnakeCase<T>;

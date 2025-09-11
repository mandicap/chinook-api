import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import snakeCase from 'lodash-es/snakeCase';
import transform from 'lodash-es/transform';
import type { CamelCasedPropertiesDeep, SnakeCase } from 'type-fest';
import { type ZodObject, type ZodRawShape, z } from 'zod';

export const getPageUrls = (
    path: string,
    currPage: number,
    totalPages: number,
): { prevPageUrl: string | null; nextPageUrl: string | null } => {
    const prevPageNum = currPage - 1;
    const prevPageUrl = prevPageNum === 0 ? null : `${path}?page=${prevPageNum}`;

    const nextPageNum = currPage + 1;
    const nextPageUrl = totalPages === 1 || currPage === totalPages ? null : `${path}?page=${nextPageNum}`;

    return { prevPageUrl, nextPageUrl };
};

export const snakeCaseKeys = <T extends CamelCasedPropertiesDeep<object>>(obj: T): SnakeCase<T> => {
    return transform(
        obj,
        (result, value, key) => {
            const newKey = typeof key === 'string' ? snakeCase(key) : key;

            const transformedValue = isObject(value) ? snakeCaseKeys(value as object) : value;

            (result as Record<PropertyKey, unknown>)[newKey as PropertyKey] = transformedValue;
        },
        isArray(obj) ? [] : {},
    ) as SnakeCase<T>;
};

export const snakeCaseSchema = <T extends ZodObject<ZodRawShape>>(
    schema: T,
): ZodObject<Record<string, z.ZodTypeAny>> => {
    const shape = schema.shape;

    const snakeCasedShape = Object.keys(shape).reduce(
        (acc, key) => {
            const snakeKey = snakeCase(key);
            acc[snakeKey] = shape[key] as z.ZodTypeAny;
            return acc;
        },
        {} as Record<string, z.ZodTypeAny>,
    );

    return z.object(snakeCasedShape);
};

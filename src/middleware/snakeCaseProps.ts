import { createMiddleware } from 'hono/factory';
import type { Bindings } from 'hono/types';
import { toSnakeCase } from '@/utils/helpers';

const snakeCasePropsMiddleware = createMiddleware<{ Bindings: Bindings }>(async (c, next) => {
    await next();

    if (c.res.headers.get('Content-Type')?.includes('application/json')) {
        try {
            const originalResponse = await c.res.json();
            const remappedResponse = toSnakeCase(originalResponse);
            c.res = new Response(JSON.stringify(remappedResponse), c.res);
        } catch (e) {
            console.error('Failed to remap JSON to snake case:', e);
        }
    }
});

export default snakeCasePropsMiddleware;

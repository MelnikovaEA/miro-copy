import { createOpenApiHttp } from 'openapi-msw';
import type { paths } from '@/shared/api/schema/generated.ts';
import { CONFIG } from '@/shared/model/config.ts';

export const http = createOpenApiHttp<paths>({
    baseUrl: CONFIG.API_BASE_URL,
});

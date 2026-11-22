import type { APIRoute } from 'astro';
import { robotsTxt } from '../lib/seo';

export const GET: APIRoute = () => {
  const site = import.meta.env.SITE;
  return new Response(robotsTxt(site ? new URL(site) : undefined), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

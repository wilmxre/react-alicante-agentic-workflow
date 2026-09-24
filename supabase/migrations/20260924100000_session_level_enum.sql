-- Adds a `level` column to sessions so each session can show its
-- difficulty. Backed by an enum, same approach as `session_track_enum`.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'advanced' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'intermediate' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

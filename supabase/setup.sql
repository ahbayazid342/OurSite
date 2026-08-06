-- Run this once in Supabase → SQL Editor

create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Personal love site: public read + write with anon key
-- (anyone with your site URL could write — fine for private couple site)
drop policy if exists "Allow read site_content" on public.site_content;
create policy "Allow read site_content"
  on public.site_content for select
  using (true);

drop policy if exists "Allow write site_content" on public.site_content;
create policy "Allow write site_content"
  on public.site_content for insert
  with check (true);

drop policy if exists "Allow update site_content" on public.site_content;
create policy "Allow update site_content"
  on public.site_content for update
  using (true);

insert into public.site_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Storage bucket for gallery + trip images
insert into storage.buckets (id, name, public)
values ('lovebird-media', 'lovebird-media', true)
on conflict (id) do nothing;

drop policy if exists "Public read lovebird media" on storage.objects;
create policy "Public read lovebird media"
  on storage.objects for select
  using (bucket_id = 'lovebird-media');

drop policy if exists "Public upload lovebird media" on storage.objects;
create policy "Public upload lovebird media"
  on storage.objects for insert
  with check (bucket_id = 'lovebird-media');

drop policy if exists "Public update lovebird media" on storage.objects;
create policy "Public update lovebird media"
  on storage.objects for update
  using (bucket_id = 'lovebird-media');

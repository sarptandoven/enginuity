-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing table if it exists
drop table if exists public.waitlist;

-- Create the waitlist table
create table public.waitlist (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

-- Create an index for faster email lookups
create index waitlist_email_idx on public.waitlist (email);

-- Enable Row Level Security (RLS)
alter table public.waitlist enable row level security;

-- Create policy to allow anonymous users to insert
create policy "Allow anonymous inserts to waitlist"
  on public.waitlist 
  for insert
  to anon
  with check (true);

-- Create policy to allow users to view their own entries
create policy "Users can view their own entries"
  on public.waitlist
  for select
  to anon
  using (email = current_user);

-- Grant necessary permissions
grant usage on schema public to anon;
grant insert on public.waitlist to anon; 
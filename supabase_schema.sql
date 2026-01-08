-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  name text,
  company_name text,
  created_at timestamptz default now(),
  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, name, company_name)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'company_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. PROPERTIES
create table public.properties (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text check (type in ('chale', 'hotel', 'pousada', 'outro')),
  city text,
  state text,
  avg_daily_rate numeric default 0,
  fixed_cost_monthly numeric default 0,
  created_at timestamptz default now()
);

alter table public.properties enable row level security;

create policy "Users can CRUD own properties" on public.properties
  for all using (auth.uid() = user_id);

-- 3. BOOKINGS
create table public.bookings (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  guest_name text,
  guest_contact text,
  check_in date not null,
  check_out date not null,
  gross_value numeric not null default 0,
  channel text check (channel in ('direct', 'booking', 'airbnb', 'other')),
  channel_fee_value numeric default 0,
  ad_cost numeric default 0,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'pending')),
  notes text,
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Users can CRUD own bookings" on public.bookings
  for all using (auth.uid() = user_id);

-- 4. ROLES & PERMISSIONS (Added for Admin Panel)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text default 'client' check (role in ('client', 'admin'));

-- Update Policies for Profiles (Admins can view all)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Update Policies for Properties (Admins can view all)
DROP POLICY IF EXISTS "Users can CRUD own properties" ON public.properties;
CREATE POLICY "Users can CRUD own properties" ON public.properties FOR ALL USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Update Policies for Bookings (Admins can view all)
DROP POLICY IF EXISTS "Users can CRUD own bookings" ON public.bookings;
CREATE POLICY "Users can CRUD own bookings" ON public.bookings FOR ALL USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

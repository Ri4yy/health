-- Create custom types (enums)
CREATE TYPE order_status AS ENUM ('new', 'processing', 'delivered', 'cancelled');
CREATE TYPE discount_type AS ENUM ('percent', 'fixed');

-- 1. Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 2. Addresses (broken down into fields)
CREATE TABLE public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  city text NOT NULL,
  street text NOT NULL,
  house text NOT NULL,
  apartment text,
  entrance text,
  floor text,
  intercom text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 3. Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  parent_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 4. Goals
CREATE TABLE public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 5. Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  images text[] DEFAULT '{}',
  calories integer DEFAULT 0,
  protein integer DEFAULT 0,
  fats integer DEFAULT 0,
  carbs integer DEFAULT 0,
  ingredients text,
  allergens text[] DEFAULT '{}',
  diet_types text[] DEFAULT '{}',
  badges text[] DEFAULT '{}',
  in_stock boolean DEFAULT true,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 6. Product Variants
CREATE TABLE public.product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  price integer NOT NULL,
  old_price integer,
  meals_per_day integer,
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 7. Goal Products Join Table
CREATE TABLE public.goal_products (
  goal_id uuid REFERENCES public.goals(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (goal_id, product_id)
);

-- 8. Favorites
CREATE TABLE public.favorites (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  PRIMARY KEY (user_id, product_id)
);

-- 9. Reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 10. Cart Items
CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  variant_id uuid REFERENCES public.product_variants(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1 NOT NULL CHECK (quantity > 0),
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, variant_id)
);

-- 11. Promocodes
CREATE TABLE public.promocodes (
  code text PRIMARY KEY,
  type discount_type NOT NULL,
  value integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 12. Orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_number text UNIQUE NOT NULL,
  status order_status DEFAULT 'new' NOT NULL,
  delivery_address text NOT NULL,
  delivery_time text,
  total_price integer NOT NULL,
  discount_amount integer DEFAULT 0,
  promocode text REFERENCES public.promocodes(code) ON DELETE SET NULL,
  contact_name text NOT NULL,
  contact_phone text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 13. Order Items
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  variant_id uuid REFERENCES public.product_variants(id) ON DELETE SET NULL,
  price_at_purchase integer NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0)
);

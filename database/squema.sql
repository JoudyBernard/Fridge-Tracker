CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    password text COLLATE pg_catalog."default" NOT NULL,
    first_name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    city text COLLATE pg_catalog."default" NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    updated_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

CREATE TABLE IF NOT EXISTS public.products
(
    prod_id integer NOT NULL DEFAULT nextval('products_prod_id_seq'::regclass),
    prod_name text COLLATE pg_catalog."default" NOT NULL,
    prod_price integer NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    updated_at time with time zone NOT NULL DEFAULT now()
)
CREATE TABLE IF NOT EXISTS public.orders
(
    order_no integer NOT NULL DEFAULT nextval('orders_order_no_seq'::regclass),
    user_id integer NOT NULL DEFAULT nextval('orders_user_id_seq'::regclass),
    date date NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    updated_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT orders_pkey PRIMARY KEY (order_no)
)
CREATE TABLE IF NOT EXISTS public."orderItems"
(
    cart_id integer NOT NULL DEFAULT nextval('"orderItems_cart_id_seq"'::regclass),
    order_id integer NOT NULL DEFAULT nextval('"orderItems_order_id_seq"'::regclass),
    prod_id integer NOT NULL DEFAULT nextval('"orderItems_prod_id_seq"'::regclass),
    quantity integer NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    updated_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "orderItems_pkey" PRIMARY KEY (cart_id)
    ALTER TABLE IF EXISTS public."orderItems"
    ADD COLUMN order_no integer NOT NULL DEFAULT nextval('"orderItems_order_id_seq"'::regclass);
)
CREATE TABLE IF NOT EXISTS public.fridges
(
    f_id integer NOT NULL DEFAULT nextval('fridges_f_id_seq'::regclass),
    user_id integer NOT NULL DEFAULT nextval('fridges_user_id_seq'::regclass),
    prod_id integer NOT NULL DEFAULT nextval('fridges_prod_id_seq'::regclass),
    quantity integer NOT NULL,
    restock_limit integer NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    updated_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT fridges_pkey PRIMARY KEY (f_id)
)
CREATE TABLE IF NOT EXISTS public.alerts
(
    alert_id integer NOT NULL DEFAULT nextval('alerts_alert_id_seq'::regclass),
    f_id integer NOT NULL DEFAULT nextval('alerts_f_id_seq'::regclass),
    user_id integer NOT NULL DEFAULT nextval('alerts_user_id_seq'::regclass),
    description text COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    updated_at time with time zone DEFAULT now(),
    CONSTRAINT alerts_pkey PRIMARY KEY (alert_id)
)

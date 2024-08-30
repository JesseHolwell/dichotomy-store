CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public."purchases" (
    id SERIAL PRIMARY KEY,
    stripe_transaction_id VARCHAR(255) NOT NULL UNIQUE,
    shipping_address TEXT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_status shipping_status_enum DEFAULT 'pending',
    shipping_date TIMESTAMP
);

CREATE TYPE shipping_status_enum AS ENUM ('pending', 'shipped', 'delivered');
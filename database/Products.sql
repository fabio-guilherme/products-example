--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2021-12-16 17:43:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16871)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    prod_id integer NOT NULL,
    prod_name character varying(70) NOT NULL,
    prod_price real,
    prod_type_id integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16878)
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    type_id integer NOT NULL,
    type_name character varying(45) NOT NULL
);


ALTER TABLE public.types OWNER TO postgres;

--
-- TOC entry 3311 (class 0 OID 16871)
-- Dependencies: 209
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (prod_id, prod_name, prod_price, prod_type_id) FROM stdin;
1	Beef	1.4	12
2	Potato	2	1
3	Salmon	5.99	5
\.


--
-- TOC entry 3312 (class 0 OID 16878)
-- Dependencies: 210
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.types (type_id, type_name) FROM stdin;
1	Vegetables
12	Meat
5	Fish
8	Cleaning
3	Others
\.


--
-- TOC entry 3168 (class 2606 OID 16877)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (prod_id);


--
-- TOC entry 3170 (class 2606 OID 16884)
-- Name: types tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT tables_pkey PRIMARY KEY (type_id);


--
-- TOC entry 3171 (class 2606 OID 16885)
-- Name: products prod_type_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT prod_type_fk FOREIGN KEY (prod_type_id) REFERENCES public.types(type_id) NOT VALID;


-- Completed on 2021-12-16 17:43:11

--
-- PostgreSQL database dump complete
--

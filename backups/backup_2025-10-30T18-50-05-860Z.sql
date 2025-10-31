--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "providerId" text NOT NULL,
    "serviceId" text,
    date timestamp(3) without time zone NOT NULL,
    status text NOT NULL,
    "paymentId" text,
    "providerServiceId" text
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    "senderId" text NOT NULL,
    "receiverId" text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Message" OWNER TO postgres;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    "userId" text,
    "providerId" text,
    message text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "bookingId" text,
    "providerId" text,
    amount double precision NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: Provider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Provider" (
    id text NOT NULL,
    "userId" text NOT NULL,
    bio text,
    expertise text,
    "isVerified" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    image text,
    location text,
    price double precision,
    gender text,
    languages text[],
    methods text[],
    qualifications text[],
    "reviewLevel" text,
    "servicesYear" text,
    target text[]
);


ALTER TABLE public."Provider" OWNER TO postgres;

--
-- Name: ProviderService; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProviderService" (
    id text NOT NULL,
    "providerId" text NOT NULL,
    "categoryId" text NOT NULL,
    price integer NOT NULL,
    description text NOT NULL,
    method text,
    target text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    "serviceId" text
);


ALTER TABLE public."ProviderService" OWNER TO postgres;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "providerId" text NOT NULL,
    "serviceId" text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    "isApproved" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Service" (
    id text NOT NULL,
    "providerId" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    "categoryId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    color text,
    image text
);


ALTER TABLE public."Service" OWNER TO postgres;

--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SiteSettings" (
    id text NOT NULL,
    "seoTitle" text,
    "seoDescription" text,
    "seoKeywords" text,
    "logoUrl" text,
    "faviconUrl" text,
    "contactEmail" text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "footerText" text,
    "siteTitle" text
);


ALTER TABLE public."SiteSettings" OWNER TO postgres;

--
-- Name: StaticPage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StaticPage" (
    id text NOT NULL,
    key text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."StaticPage" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (id, "userId", "providerId", "serviceId", date, status, "paymentId", "providerServiceId") FROM stdin;
4833103b-d281-43cd-b167-55e1275590d3	5f675084-8cf6-414c-8640-e2d99084dec0	5255a3d9-17ce-43b3-828d-9574ccc51f59	\N	2025-07-07 17:46:00	approved	\N	2e390272-6f23-4d8c-a72d-aee6ce8d44bf
b3cb52e8-59ac-43d0-836d-ca9b06401bc7	c4557ff9-fe33-415b-ae1c-96d94ca1746d	5255a3d9-17ce-43b3-828d-9574ccc51f59	\N	2025-07-17 18:07:00	approved	\N	2e390272-6f23-4d8c-a72d-aee6ce8d44bf
6c7ca69d-081c-4483-b6a6-0b65b5e790a7	5f675084-8cf6-414c-8640-e2d99084dec0	5255a3d9-17ce-43b3-828d-9574ccc51f59	\N	2025-07-16 18:05:00	approved	\N	2e390272-6f23-4d8c-a72d-aee6ce8d44bf
741b3125-3946-4d86-ad13-3715b0ca9b9d	c4557ff9-fe33-415b-ae1c-96d94ca1746d	01da9f98-cba5-49db-ae71-af427ed02d59	\N	2025-07-08 00:00:00	pending	\N	e0c2d776-087e-4d20-beb0-91bf007dbfce
74d13c73-9bf6-46a3-bc8c-2676a38887d6	fe8cf369-e16c-46ba-bb32-306b33ab0090	01da9f98-cba5-49db-ae71-af427ed02d59	\N	2025-07-08 00:00:00	pending	\N	0bbccb37-2b35-4839-91fd-60df650ac52a
6b83cc05-fda9-4f6e-aaae-420ad43a2f57	fe8cf369-e16c-46ba-bb32-306b33ab0090	01da9f98-cba5-49db-ae71-af427ed02d59	\N	2025-07-08 07:59:00	pending	\N	0bbccb37-2b35-4839-91fd-60df650ac52a
f08d4110-4a3c-4ae8-9046-5b276d9e1b24	fe8cf369-e16c-46ba-bb32-306b33ab0090	01da9f98-cba5-49db-ae71-af427ed02d59	\N	2025-07-06 18:44:00	approved	\N	e0c2d776-087e-4d20-beb0-91bf007dbfce
5350deec-906f-42df-8646-87c58cbbc250	5f675084-8cf6-414c-8640-e2d99084dec0	01da9f98-cba5-49db-ae71-af427ed02d59	\N	2025-10-30 16:52:00	pending	\N	e0c2d776-087e-4d20-beb0-91bf007dbfce
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, description) FROM stdin;
ccf2148b-b51c-493c-a48d-3583272e1830	Aile Danışmanlığı	Aile ve evlilik konularında destek.
a4d230af-3a66-48cc-b05e-e6b22a61b9db	Psikolojik Destek	Psikolojik ve sosyal danışmanlık.
62e29ff2-35cb-408e-b0a3-a31344fa942e	Eğitim	Eğitim ve gelişim hizmetleri.
572bfe17-fe57-4ada-8bb1-e884571d35e4	Sosyal Hizmetler	Sosyal destek ve danışmanlık.
1639ae87-a9dc-4dbe-8d33-90e943620d38	Hukuk Danışmanlığı	Hukuki konularda danışmanlık.
c1b8edc7-5949-40b5-9251-d15d85cb0d72	deneme	Deneme açıklama
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, "senderId", "receiverId", content, "createdAt") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, "userId", "providerId", message, "isRead", "createdAt") FROM stdin;
0cb0dd7f-0aca-405e-ba23-c00aecfb4735	\N	01da9f98-cba5-49db-ae71-af427ed02d59	Yeni rezervasyon talebiniz var.	f	2025-10-29 16:52:25.934
a799ba65-80a8-498b-9910-15f347efe66b	5f675084-8cf6-414c-8640-e2d99084dec0	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	f	2025-10-29 16:52:25.935
c8c124c6-9d06-4ade-8bcd-1ee5a6e98fb2	5f675084-8cf6-414c-8640-e2d99084dec0	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-06 18:05:41.259
c596c13b-7645-400a-afb3-b49d0b6ba6dd	fe8cf369-e16c-46ba-bb32-306b33ab0090	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-06 18:44:14.375
45925d08-6554-4c63-99f3-e41874f2f615	45925d08-6554-4c63-99f3-e41874f2f615	5255a3d9-17ce-43b3-828d-9574ccc51f59	Yeni rezervasyon talebiniz var.	t	2025-07-06 18:07:25.167
fb33ca7a-8d14-4367-b787-21dfcd28ce42	\N	5255a3d9-17ce-43b3-828d-9574ccc51f59	Yeni rezervasyon talebiniz var.	t	2025-07-06 17:44:50.197
e680a612-87af-4177-922a-27a09d882af9	c4557ff9-fe33-415b-ae1c-96d94ca1746d	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-06 18:07:25.168
5d9edad5-9ecd-4133-811f-a3f4af8701a9	\N	01da9f98-cba5-49db-ae71-af427ed02d59	Yeni rezervasyon talebiniz var.	t	2025-07-06 18:44:14.375
c2dd6342-7361-43da-96c9-c09ec54baa64	\N	5255a3d9-17ce-43b3-828d-9574ccc51f59	Yeni rezervasyon talebiniz var.	t	2025-07-06 17:46:13.584
d53bf7dd-c74f-49e3-95fe-5f8df70fa4bf	\N	01da9f98-cba5-49db-ae71-af427ed02d59	Yeni rezervasyon talebiniz var.	f	2025-07-07 07:58:49.591
ef655653-9291-4993-af94-72651e65b550	\N	01da9f98-cba5-49db-ae71-af427ed02d59	Yeni rezervasyon talebiniz var.	f	2025-07-07 07:59:06.593
184bab93-d3ab-4e96-a1d2-68c63eee34f3	c4557ff9-fe33-415b-ae1c-96d94ca1746d	\N	Rezervasyonunuz onaylandı.	t	2025-07-06 18:43:17.936
a45a828a-81d6-48d9-ad3c-b6ba98612ab6	c4557ff9-fe33-415b-ae1c-96d94ca1746d	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-07 07:57:58.522
29e75eee-3717-45aa-aec1-221c74a77798	\N	01da9f98-cba5-49db-ae71-af427ed02d59	Yeni rezervasyon talebiniz var.	t	2025-07-07 07:57:58.521
20ff8069-5ec1-43e8-a93a-066d104626eb	fe8cf369-e16c-46ba-bb32-306b33ab0090	\N	Rezervasyonunuz onaylandı.	t	2025-07-07 10:30:17.339
8e01dc1b-f129-4983-aeb8-6e1888d554d6	fe8cf369-e16c-46ba-bb32-306b33ab0090	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-07 07:59:06.594
f163ab01-43af-436f-8f43-40273acbd695	fe8cf369-e16c-46ba-bb32-306b33ab0090	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-07 07:58:49.592
5ab005d4-c614-44ea-b1d1-a5de112b779d	\N	5255a3d9-17ce-43b3-828d-9574ccc51f59	Yeni rezervasyon talebiniz var.	t	2025-07-06 18:05:41.258
bd9dbe1b-337c-40e9-ba89-974308d4bf79	5f675084-8cf6-414c-8640-e2d99084dec0	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-06 17:46:13.585
c08ec104-5453-4cc6-a910-72272b2020a0	5f675084-8cf6-414c-8640-e2d99084dec0	\N	Rezervasyon talebiniz iletildi, onay bekliyor.	t	2025-07-06 17:44:50.198
0d2987f8-9b94-4277-b6cf-3f493db8b7e7	5f675084-8cf6-414c-8640-e2d99084dec0	\N	Rezervasyonunuz onaylandı.	t	2025-07-06 18:42:56.259
409e61a6-19f6-42b4-bee4-b23f919ad9ac	5f675084-8cf6-414c-8640-e2d99084dec0	\N	Rezervasyonunuz onaylandı.	t	2025-07-06 18:43:19.226
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, "bookingId", "providerId", amount, status, "createdAt") FROM stdin;
\.


--
-- Data for Name: Provider; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Provider" (id, "userId", bio, expertise, "isVerified", "createdAt", "updatedAt", image, location, price, gender, languages, methods, qualifications, "reviewLevel", "servicesYear", target) FROM stdin;
00b9f2fb-4d9d-4f5e-a781-cd34d7d1afb0	d3af6884-88df-4ed2-9fe6-7110a9dd2864	10 yıllık aile danışmanı.	Aile Danışmanlığı	t	2025-07-06 10:03:41.404	2025-07-06 10:03:41.404	https://randomuser.me/api/portraits/men/32.jpg	İstanbul, Türkiye	500	\N	\N	\N	\N	\N	\N	\N
01da9f98-cba5-49db-ae71-af427ed02d59	c4557ff9-fe33-415b-ae1c-96d94ca1746d	Biyografi deneme	Uzmanlık deneme	t	2025-07-06 12:23:05.683	2025-07-06 12:23:58.239	/uploads/e9a041634cd83c02b18330be4fbb945e		0	\N	\N	\N	\N	\N	\N	\N
5255a3d9-17ce-43b3-828d-9574ccc51f59	fe8cf369-e16c-46ba-bb32-306b33ab0090	selçuk	selçuk	t	2025-07-06 17:03:19.722	2025-07-06 17:03:27.226	/uploads/cd2b34d76ca9a92a7e3e0eda0a4463cd		0	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: ProviderService; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProviderService" (id, "providerId", "categoryId", price, description, method, target, "createdAt", "updatedAt", title, "serviceId") FROM stdin;
e0c2d776-087e-4d20-beb0-91bf007dbfce	01da9f98-cba5-49db-ae71-af427ed02d59	ccf2148b-b51c-493c-a48d-3583272e1830	500	deneme	çevrim içi	Yetişkin	2025-07-06 13:03:03.07	2025-07-06 13:03:03.07	Hizmet	\N
0bbccb37-2b35-4839-91fd-60df650ac52a	01da9f98-cba5-49db-ae71-af427ed02d59	a4d230af-3a66-48cc-b05e-e6b22a61b9db	123	sadasd	Şahsen	Çocuk	2025-07-06 16:46:27.351	2025-07-06 16:46:27.351	sadsada	\N
7d5f89ff-a224-42dc-ac15-ee2c25b27a42	01da9f98-cba5-49db-ae71-af427ed02d59	ccf2148b-b51c-493c-a48d-3583272e1830	12	asdasd	asd	asd	2025-07-06 16:59:26.218	2025-07-07 07:49:14.629	denemeeee	cc3d81f0-e4a1-4ecd-83fd-7672e10da323
2e390272-6f23-4d8c-a72d-aee6ce8d44bf	5255a3d9-17ce-43b3-828d-9574ccc51f59	ccf2148b-b51c-493c-a48d-3583272e1830	1	selçuk	selçuk	selçuk	2025-07-06 17:03:45.844	2025-07-07 07:49:14.631	selcuk	e59ecc84-2ef5-4467-a4f6-165b68a4221c
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "userId", "providerId", "serviceId", rating, comment, "isApproved", "createdAt") FROM stdin;
e47602d7-57cd-40aa-81dd-4f28b97ae60d	c4557ff9-fe33-415b-ae1c-96d94ca1746d	00b9f2fb-4d9d-4f5e-a781-cd34d7d1afb0	8b5bed3f-69e5-4741-acb2-c6c50123604b	4	Faydalı bir görüşmeydi.	t	2025-07-06 12:00:48.214
39628089-8768-426f-adfc-c0135162ee58	c4557ff9-fe33-415b-ae1c-96d94ca1746d	00b9f2fb-4d9d-4f5e-a781-cd34d7d1afb0	aee51c46-280f-4d38-baa1-75f4694842f1	5	Çok memnun kaldım, tavsiye ederim.	t	2025-07-06 12:00:48.213
49896af4-3ad6-46d0-88f9-f617f9d1c8dc	c4557ff9-fe33-415b-ae1c-96d94ca1746d	5255a3d9-17ce-43b3-828d-9574ccc51f59	e59ecc84-2ef5-4467-a4f6-165b68a4221c	4	deneme	t	2025-07-07 07:50:08.212
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Service" (id, "providerId", title, description, price, "categoryId", "createdAt", "updatedAt", color, image) FROM stdin;
aee51c46-280f-4d38-baa1-75f4694842f1	00b9f2fb-4d9d-4f5e-a781-cd34d7d1afb0	Aile Terapisi	Aile içi iletişim ve çözüm odaklı terapi.	500	ccf2148b-b51c-493c-a48d-3583272e1830	2025-07-06 10:03:41.405	2025-07-06 10:03:41.405	#fde2e4	https://cdn-icons-png.flaticon.com/512/2922/2922510.png
8b5bed3f-69e5-4741-acb2-c6c50123604b	00b9f2fb-4d9d-4f5e-a781-cd34d7d1afb0	Bireysel Danışmanlık	Kişisel gelişim ve psikolojik destek.	400	a4d230af-3a66-48cc-b05e-e6b22a61b9db	2025-07-06 10:03:41.405	2025-07-06 10:03:41.405	#e0f7fa	https://cdn-icons-png.flaticon.com/512/2922/2922561.png
cc3d81f0-e4a1-4ecd-83fd-7672e10da323	01da9f98-cba5-49db-ae71-af427ed02d59	denemeeee	asdasd	12	ccf2148b-b51c-493c-a48d-3583272e1830	2025-07-06 16:59:26.184	2025-07-06 16:59:26.184	\N	\N
e59ecc84-2ef5-4467-a4f6-165b68a4221c	5255a3d9-17ce-43b3-828d-9574ccc51f59	selcuk	selçuk	1	ccf2148b-b51c-493c-a48d-3583272e1830	2025-07-06 17:03:45.84	2025-07-06 17:03:45.84	\N	\N
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SiteSettings" (id, "seoTitle", "seoDescription", "seoKeywords", "logoUrl", "faviconUrl", "contactEmail", "updatedAt", "footerText", "siteTitle") FROM stdin;
1	Hizmet Platformu	Müslüman Hizmetleri için Dünyanın İlk Çevrimiçi Merkezine Hoş Geldiniz	hizmet, danışmanlık, aile, psikoloji, sosyal	https://cdn-icons-png.flaticon.com/512/2922/2922510.png	https://cdn-icons-png.flaticon.com/512/2922/2922510.png	info@hizmetplatformu.com	2025-07-06 12:01:15.129	© 2025 Hizmet Platformu	Hizmet Platformu
\.


--
-- Data for Name: StaticPage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StaticPage" (id, key, title, content, "updatedAt") FROM stdin;
2	services_info	Hizmetler	Hizmetler Deneme	2025-07-06 11:21:05.074
3	contact	İletişim	İletişim denme	2025-07-06 11:21:26.91
1	about	Topluluğun Gücü	Bir tıklamanın rahatlığı  tam olarak nerede ve ne zaman ihtiyacınız olursa olsun, güvenilir, sağlam, inanç temelli geniş bir hizmet sağlayıcı yelpazesini belirlemenize ve onlarla bağlantı kurmanıza yardımcı oluyoruz. Bizi, küreselleşmiş mahalle ağınız olarak düşünün. Bir imam, Kuran öğretmeni, İslami vasiyetname yazma konusunda tavsiye veya Müslüman bir danışman veya akıl hocası bulma konusunda ararken genellikle ilk içgüdümüz arkadaşlarımıza ve ailemize önerilerde bulunmaktır - ancak çoğu zaman seçeneklerimiz tanıdığımız kişilerle sınırlıdır ve değerlendirmek ve organize etmek zor olabilir.	2025-07-06 21:07:13.921
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
72afc10c-94ed-40ae-b861-2790fdf94588	ssss	msn@msn.com	$2b$10$V5d0HjVF1TJbZLQxDfft/OQ0Zha7nauSwp3SbxRMY.V4m5X872Zn.	user	2025-10-28 15:10:53.975	2025-10-28 15:10:53.975
5f675084-8cf6-414c-8640-e2d99084dec0	Admin Kullanıcı	admin@demo.com	$2b$10$V5d0HjVF1TJbZLQxDfft/OQ0Zha7nauSwp3SbxRMY.V4m5X872Zn.	admin	2025-07-06 10:03:41.403	2025-07-06 10:03:41.403
c4557ff9-fe33-415b-ae1c-96d94ca1746d	Ayşe Kullanıcı	user@demo.com	$2b$10$V5d0HjVF1TJbZLQxDfft/OQ0Zha7nauSwp3SbxRMY.V4m5X872Zn.	mod	2025-07-06 10:03:41.404	2025-07-07 10:41:45.863
d3af6884-88df-4ed2-9fe6-7110a9dd2864	Mehmet Sağlayıcı	mod@demo.com	$2b$10$V5d0HjVF1TJbZLQxDfft/OQ0Zha7nauSwp3SbxRMY.V4m5X872Zn.	mod	2025-07-06 10:03:41.403	2025-07-06 10:03:41.403
fe8cf369-e16c-46ba-bb32-306b33ab0090	selcuk butekin	kozmo0@msn.com	$2b$10$V5d0HjVF1TJbZLQxDfft/OQ0Zha7nauSwp3SbxRMY.V4m5X872Zn.	user	2025-07-06 10:34:45.775	2025-07-06 13:11:12.057
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f2c300fe-c7dc-467f-9968-b592453b8cba	d0625ec91dcd7839a8d7eb2f3ef5d86c72cc4d08fa119c22fe41363cefe0dfa7	2025-07-05 22:59:32.511903+03	20250705195932_init	\N	\N	2025-07-05 22:59:32.495905+03	1
5864362d-8ada-4677-b8da-317ed09614fb	587fc712fbb7d18fd5b6935739398f6be72985ba609fd5095dbcbc33fc9e375f	2025-07-06 12:17:31.016936+03	20250706091731_add_provider_fields	\N	\N	2025-07-06 12:17:31.014902+03	1
486990a2-08f4-4392-aa0d-f579801d8946	c2f472c6ae95c386f3667a02786b09e10bed6404b71e78e06c8feb1ac6ca60a5	2025-07-07 11:26:31.474496+03	20250707082631_provider_profile_fields	\N	\N	2025-07-07 11:26:31.471881+03	1
9a36c5aa-dc79-4ea5-9cae-5bf4c7010670	198a9dedfb9b3cded16418693f8faa8f9b693b18b4c0e328d370a6f5de93dd11	2025-07-06 12:19:26.54632+03	20250706091926_add_service_image_color	\N	\N	2025-07-06 12:19:26.544599+03	1
04d87fa0-86bc-4ce0-93e1-49223e24922f	8624c67fb376638ff46979026ed2cf7ac577a3b33a8fb5126003268ab0f27cfc	2025-07-06 14:10:18.257606+03	20250706111018_add_static_page	\N	\N	2025-07-06 14:10:18.252448+03	1
ddf97999-8631-4898-ba1c-9b77cd3dc82c	e9defd96a18fd55dc887002c195624a8242238211189ee1d32a00316682cf507	2025-07-06 14:44:39.345495+03	20250706114439_add_site_settings	\N	\N	2025-07-06 14:44:39.341378+03	1
2e0f4409-a20b-4bcf-a408-8648e1a8e99a	80ba3a2482237c1eac7fcc1d027093b27a8ba4edac24fa4e3ee423dacef2f184	2025-07-06 14:50:35.030523+03	20250706115035_add_review_relations	\N	\N	2025-07-06 14:50:35.023261+03	1
c058ca41-4735-4ea6-a175-0044d6615750	f9949b8280b8f2303937399a7a72faf426c141af753d421ba95957dae5b9bb03	2025-07-06 16:01:59.265557+03	20250706130159_add_provider_service_relation	\N	\N	2025-07-06 16:01:59.258381+03	1
159340a9-4ada-43d9-8a98-c9b6b441f8c7	7f8082a49b4bedd807139d4bf18afc573c73aafbf603819e791a2dc7a384779d	2025-07-06 19:25:36.767076+03	20250706162536_provider_service_booking	\N	\N	2025-07-06 19:25:36.760009+03	1
36d8ced4-e738-40bf-82ee-612fcc0ed174	e815e68aa837fa36c84a3b30b182e4bc447f68e269c13dddab4a2548e7317f15	2025-07-06 19:42:19.808743+03	20250706164140_add_title_to_provider_service	\N	\N	2025-07-06 19:42:19.806946+03	1
daeb67ae-f0e1-433c-b057-3f0b4e7276d7	0826dd1d2808a94831ad3845e1d38cc513dd335abfd887bb4c851496ae4d9323	2025-07-06 19:42:59.74673+03	20250706164259_	\N	\N	2025-07-06 19:42:59.745609+03	1
c4376875-1743-4902-9e66-9f92dacab1f9	e2f136c6f5103707e42d1c132917db93eec8cd2ac4c02422564d42842361a863	2025-07-06 20:43:18.173187+03	20250706174318_add_notification_model	\N	\N	2025-07-06 20:43:18.167268+03	1
d85c6962-23ad-4922-9d37-363862c02254	803c76a2ec0c225946a24fa8af0b3cef4f8beb845271feab96a1374510873931	2025-07-06 23:05:55.448045+03	20250706200555_add_site_title_and_footer_text	\N	\N	2025-07-06 23:05:55.446008+03	1
8350c8bb-92e8-47b6-8af7-f8e7477cb8af	1e0130ea2c40bee0351c000100847b612b194706d2bb76728304448a44b0186a	2025-07-07 10:45:33.242504+03	20250707074533_add_service_id_to_provider_service_unique	\N	\N	2025-07-07 10:45:33.236086+03	1
\.


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: ProviderService ProviderService_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderService"
    ADD CONSTRAINT "ProviderService_pkey" PRIMARY KEY (id);


--
-- Name: Provider Provider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Provider"
    ADD CONSTRAINT "Provider_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: StaticPage StaticPage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StaticPage"
    ADD CONSTRAINT "StaticPage_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Payment_bookingId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Payment_bookingId_key" ON public."Payment" USING btree ("bookingId");


--
-- Name: ProviderService_serviceId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProviderService_serviceId_key" ON public."ProviderService" USING btree ("serviceId");


--
-- Name: Provider_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Provider_userId_key" ON public."Provider" USING btree ("userId");


--
-- Name: StaticPage_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StaticPage_key_key" ON public."StaticPage" USING btree (key);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Booking Booking_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public."Provider"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_providerServiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_providerServiceId_fkey" FOREIGN KEY ("providerServiceId") REFERENCES public."ProviderService"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Booking Booking_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Payment Payment_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public."Provider"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProviderService ProviderService_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderService"
    ADD CONSTRAINT "ProviderService_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProviderService ProviderService_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderService"
    ADD CONSTRAINT "ProviderService_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public."Provider"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProviderService ProviderService_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderService"
    ADD CONSTRAINT "ProviderService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Provider Provider_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Provider"
    ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public."Provider"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Service Service_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Service Service_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public."Provider"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


# Divine Aura - Product Requirements Document (E-commerce MVP)

## Original Problem Statement
Refine the Divine Aura website into a confident, operational, premium e-commerce experience. Keep structure, refine layout, product curation, styling, clarity, and positioning.

## Target Audience
Modern, conscious beauty consumers interested in clean, luxury, aura-aligned beauty products.

## User Personas
1. **Conscious Consumer**: Values clean ingredients, transparency, small-batch quality
2. **Personalization Seeker**: Wants products aligned to their unique skin/hair energy
3. **Expert Guidance Seeker**: Interested in dermat consultations for personalized advice

## Core Requirements (Static)
- Premium e-commerce website (operational, no waitlist)
- Navigation: Home, Shop, Aura Virtual Studio, Aura Analysis, Consult, About, Contact + Cart
- 20 products across 7 categories (including 3 virtual try-on products)
- Aura Analysis quiz with personalized recommendations
- ₹199 dermatologist consultation booking
- **Virtual Try-On feature** for makeup products
- Mobile responsive design
- Luxury beige theme with aura gradient accents

## What's Been Implemented

### Pages
- ✅ Home (Hero, Featured Products, Brand Story, Trust Strip, **Virtual Try-On CTA**, Aura Discovery CTA, Consult CTA)
- ✅ Shop (20 products, 7 category filters)
- ✅ Product Detail (individual product pages, **"Try This Shade in Aura Studio" button for try-on products**)
- ✅ Aura Analysis (6 multi-select questions, results with recommendations)
- ✅ Consult (₹199 dermat consultation form)
- ✅ Cart (add/remove items, quantity controls, total)
- ✅ About (brand story, values)
- ✅ Contact (contact form)
- ✅ **Aura Virtual Studio** (`/virtual-studio`) - Virtual Try-On feature (Dec 2025)

### Products (20 total)
Categories: Hair Care (2), Kumkumadi & Gold (2), Ayurvedic Gels (2), Serum (3), Face Cream (3), Body Care (2), Makeup (6)

**Virtual Try-On Enabled Products (3):**
1. Peach Veil Ritual – Satin Lipstick (₹699) - ID 18
2. Soft Petal Ritual – Cream Blush (₹599) - ID 19
3. Pearl Glow Ritual – Strobe Cream (₹799) - ID 20

Featured Products (10):
1. Purple Luxe Ritual – 24K Gold Face Oil (₹1299)
2. Green Glow Ritual – Kumkumadi Face Pack (₹699)
3. Yellow Balance Ritual – Anti-Acne Face Serum (₹899)
4. Orange Radiance Ritual – Brightening Face Serum (₹999)
5. Blue Hydration Ritual – Day Cream with Sunscreen (₹749)
6. Purple Renewal Ritual – Night Cream (₹899)
7. Red Shield Ritual – Keratin Repair Shampoo (₹549)
8. Peach Veil Ritual – Satin Lipstick (₹699)
9. Soft Petal Ritual – Cream Blush (₹599)
10. Pearl Glow Ritual – Strobe Cream (₹799)

### Features
- ✅ Cart with localStorage persistence
- ✅ Aura Analysis quiz (6 questions, multi-select)
- ✅ Primary + Secondary aura calculation
- ✅ Personalized product recommendations
- ✅ Category filtering on Shop page
- ✅ Product detail pages with ingredients
- ✅ Trust indicators (Small-batch, Clean formulations, Dermat-inspired, Personalized)
- ✅ **Virtual Try-On / Aura Virtual Studio** (Dec 2025):
  - Image upload for selfies
  - Category tabs: Lipstick, Blush, Strobe Cream
  - Shade selection with demo products
  - Draggable & resizable color overlay
  - Intensity slider (Light/Medium/Bold)
  - Add to Cart from Virtual Studio
  - Query parameter support for deep linking from product pages
  - Homepage CTA: "Not sure about shades? Try them instantly"
  - `tryOnEnabled` flag in product data for future expansion

### Design
- ✅ Luxury beige theme (#FDFBF7)
- ✅ Aura gradient text (red→orange→yellow→green→blue→purple)
- ✅ Playfair Display + Manrope fonts
- ✅ Glass-morphism effects
- ✅ Golden sparkles and luxury card effects
- ✅ Mobile responsive
- ✅ Pastel gradient backgrounds for Virtual Studio

## MOCKED Features (No Backend)
- Cart uses localStorage only
- Forms console.log data
- Payment buttons are placeholders
- Consultation booking is placeholder
- Virtual Try-On uses client-side overlay simulation (no AI/AR)

## Prioritized Backlog

### P0 (Critical for Launch)
- Payment integration (Razorpay/Stripe)
- Order management backend
- Inventory tracking

### P1 (High Priority)
- User accounts & authentication
- Order history
- Email notifications (order confirmation, shipping)
- WhatsApp integration for consultation
- **Expand Virtual Try-On**: Add more shades dynamically from products with `tryOnEnabled: true`

### P2 (Medium Priority)
- Product reviews & ratings
- Wishlist functionality
- Related products algorithm
- Blog/Journal section
- AI-powered face detection for automatic overlay positioning

### P3 (Future)
- Subscription boxes
- Loyalty program
- Referral system
- Multi-language support
- AR-based virtual try-on with face tracking

## Next Tasks
1. Integrate payment gateway (Razorpay for ₹ transactions)
2. Build backend API for orders and user management
3. Add user authentication
4. Connect consultation form to booking system
5. Set up email notifications
6. Add more virtual try-on shades (expand from 3 demo products)

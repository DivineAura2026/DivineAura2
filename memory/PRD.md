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
- Navigation: Home, Shop, Try On, Aura Quiz, Consult, About + Cart
- 20 products across 7 categories (including 3 virtual try-on products)
- Aura Analysis quiz with personalized recommendations
- ₹199 dermatologist consultation booking
- **Paint-Brush Virtual Try-On** for makeup products
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
- ✅ **Aura Virtual Studio** (`/virtual-studio`) - Paint-Brush Virtual Try-On (Dec 2025)

### Products (20 total)
Categories: Hair Care (2), Kumkumadi & Gold (2), Ayurvedic Gels (2), Serum (3), Face Cream (3), Body Care (2), Makeup (6)

**Virtual Try-On Enabled Products (Phase 1 - One per category):**
1. Red Earth Aura Ritual – Satin Lipstick (₹699) - ID 18 - #8C3B32 (Reddish Brown)
2. Soft Petal Deep Ritual – Cream Blush (₹599) - ID 19 - #C97B84 (Deeper Rosy Pink)
3. Golden Aura Glow Ritual – Strobe Cream (₹799) - ID 20 - #E8CDB5 (Pinkish Golden)

### Features
- ✅ Cart with localStorage persistence
- ✅ Aura Analysis quiz (6 questions, multi-select)
- ✅ Primary + Secondary aura calculation
- ✅ Personalized product recommendations
- ✅ Category filtering on Shop page
- ✅ Product detail pages with ingredients
- ✅ Trust indicators (Small-batch, Clean formulations, Dermat-inspired, Personalized)
- ✅ **Paint-Brush Virtual Try-On / Aura Virtual Studio** (Dec 2025):
  - Canvas-based painting on uploaded selfie
  - **Brush Tool** - Paint selected shade color
  - **Eraser Tool** - Remove mistakes
  - **Brush Size Slider** - Category-specific ranges
  - **Intensity/Opacity** - Light (35%) / Medium (55%) / Bold (80%)
  - **Undo** - Minimum 3 steps history
  - **Clear All** - Reset overlay
  - **Before/After Toggle** - Compare with/without effect
  - Category-specific brush behaviors:
    - Lipstick: Satin finish, clean edges (5-40px)
    - Blush: Soft diffused, feathered edges (20-80px)
    - Strobe: Glow brush with subtle shimmer (15-70px)
  - Add to Cart from Virtual Studio
  - Query parameter support for deep linking
  - Homepage CTA: "Not sure about shades? Try them instantly"
  - `tryOnEnabled` flag in product data for future expansion

### Design
- ✅ Luxury beige theme (#FDFBF7)
- ✅ Aura gradient text (red→orange→yellow→green→blue→purple)
- ✅ Playfair Display + Manrope fonts
- ✅ Glass-morphism effects
- ✅ Mobile responsive
- ✅ Clean navigation: Home | Shop | ✨ Try On | Aura Quiz | Consult | About
- ✅ Pastel gradient backgrounds for Virtual Studio

## MOCKED Features (No Backend)
- Cart uses localStorage only
- Forms console.log data
- Payment buttons are placeholders
- Consultation booking is placeholder
- Virtual Try-On uses client-side canvas painting (no AI/AR face tracking)

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
- **Expand Virtual Try-On**: Add more shades dynamically

### P2 (Medium Priority)
- Product reviews & ratings
- Wishlist functionality
- Related products algorithm
- Blog/Journal section
- Save/Share painted looks

### P3 (Future)
- Subscription boxes
- Loyalty program
- Referral system
- Multi-language support
- AI face detection for auto-positioning

## Next Tasks
1. Integrate payment gateway (Razorpay for ₹ transactions)
2. Build backend API for orders and user management
3. Add user authentication
4. Connect consultation form to booking system
5. Set up email notifications
6. Add more virtual try-on shades (Phase 2)

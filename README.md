# Bryt Designs Tech Challenge

### Notes

With more time I would have alloted more detail and dedication to the structure and design of the product grid, as well as how these are display. Would have also implemented a better simulated add to cart, while also creating a cart modal/page to better show how users would see their products, the final amount to pay.

I feel that the main tradeoff of my project, is sacrificing the time that I could have invested on a better design to make sure that the functionality of the app worked as expected. With more information about the company, their goals, their staff, their products, a beautiful styled aligned with the company culture and image could have been made, but as mentioned due to the limited time this had to be sacrificed.

One of the main features I consider that would be good, and would have add with more time is a wishlist, letting the user store their desired products for easier access to this and see any possible price changes.

There are a lot more possibilites to the project, like also allowing users to see the price difference drops of the products they added. Even adding a pre-order option for products that are not released yet or are out of stock, so they get notified, or get a order subimitted if the products comes back in stock for the same value.

Some missing information in the DB like variants, or a description of the products allowing the users to learn more to make a more educated decision. 

By the way I structured my calls are, the products are loaded immediately so despite designing a skeleton, it might only be necessary for slow connection users due to the data not being available instantly.


## Challenge Goals

### Required (Must Have)

- [x] Fetch and render a minimal product listing from the provided Shopify **collection handle** (Storefront API).
- [x] Each product card includes at least: image, title, price, and a **Quick View** trigger.
- [x] Clicking **Quick View** opens a **modal** (not a drawer).
- [x] Modal can be closed via:
  - [x] Close button
  - [x] Backdrop click
  - [x] `Escape` key
- [x] Background scroll is locked while the modal is open.
- [x] Basic focus management:
  - [x] Focus moves into the modal on open
  - [x] Focus returns to the triggering element on close
- [x] Product details shown inside the modal are fetched from Shopify’s **Storefront API** (GraphQL).
- [x] Modal includes a designed **loading skeleton state** while product details are loading.
- [x] Modal layout:
  - [x] Desktop: two-column layout (media left, content right)
  - [x] Mobile: stacked layout (media top, content bottom)
- [ ] Variant selection UI:
  - [ ] Render product options (e.g., Size/Color) as designed controls (pills/segmented preferred)
  - [ ] Maintain `selectedOptions` state (option-name → value)
  - [ ] Resolve the selected variant from `selectedOptions`
  - [ ] Disable unavailable/invalid option values based on current partial selection
  - [ ] Update displayed **price** when the resolved variant changes
  - [ ] Update displayed **image** when the resolved variant changes (variant image preferred; fallback allowed)
- [ ] Primary CTA: **Add to bag (simulation only)**:
  - [ ] CTA disabled until a valid, available variant is selected
  - [ ] On click, simulate async add with a deterministic delay (~800–1200ms)
  - [x] CTA transitions to a success state (e.g., “Added” + check)
  - [ ] After ~1–2 seconds, reset to idle **or** close the modal (choose one and be consistent)
- [x] **Motion** requirements:
  - [x] Backdrop fade in/out
  - [x] Modal entrance/exit animation
  - [x] At least one microinteraction animation (examples below are acceptable):
    - [ ] Animated selected option indicator
    - [x] Button loading → success transition
    - [ ] Image crossfade when variant changes
    - [x] Subtle press feedback on CTA
- [ ] TypeScript requirements:
  - [ ] No `any` for the core Shopify response shapes used in the modal (product, variants, options, prices)

---

### Optional (Nice to Have / Extra Credit)

- [ ] Shared element transition: product card image → modal hero image.
- [ ] Prefetch product detail data on product hover/focus to reduce perceived modal load time.
- [x] Route-based modal:
  - [x] Opening Quick View updates the URL (e.g., `/products/[handle]`)
  - [x] Closing returns to the previous route without a full page reload
- [ ] Focus trap + full accessible modal semantics (`role="dialog"`, `aria-modal="true"`, labelled title).
- [ ] Sticky mobile CTA bar (improves usability on small screens).
- [ ] Keyboard enhancements:
  - [ ] Arrow-key navigation through option values
  - [ ] Enter/Space activation on option controls
- [ ] Refined state handling:
  - [ ] Abort/cancel in-flight product fetch on rapid modal switching
  - [ ] Avoid UI flicker when switching products (keep previous content until new content is ready)
- [ ] UI polish extras:
  - [ ] Thumbnail gallery with animated selection states
  - [ ] Price/compare-at layout transitions using Motion layout animations
  - [ ] Reduced motion support (`prefers-reduced-motion`)

---

## Getting Started

### .git

Make sure to delete the ".git" folder after cloning and create a new git repo! That way you can host the github repo on your git account. Thanks!

### Environment Variables

Create a `.env.local` file with:

```bash
# Private
SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN="shpat_********************************"

# Public
NEXT_PUBLIC_SHOPIFY_STORE_NAME="shop-name"
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION="2025-10"
```

### Commands

1. `pnpm dev` -> Start development server
2. `pnpm codegen` -> Generate storefront api types (`/lib/shopify/graphql`)

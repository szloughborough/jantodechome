import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const companyName = "Shenzhen Loughborough Trading Co., Ltd";
const brandName = "Jantodec Home";
const siteUrl = "https://jantodechome.com";
const adminEmail = "admin@jantodechome.com";
const salesEmail = "sale@jantodechome.com";
const phone = "+8613902448340";
const ogImage = `${siteUrl}/assets/catalog/scenario-wall-black-white-kitchen-mt1588.jpg`;

const productData = [
  {
    productName: "Marble Look Peel and Stick Floor Tile",
    slug: "marble-look-floor-tile-mft-101",
    category: "Floor tile",
    application: ["Bathroom", "Kitchen", "Retail", "E-commerce"],
    style: ["Marble"],
    material: "Vinyl / PVC",
    size: "12 x 12 in / custom options",
    thickness: "1.5-2.0 mm options",
    surfaceFinish: "Matte wear layer",
    waterproofLevelNotes: "Waterproof surface; substrate and edge sealing affect wet-area performance.",
    adhesiveType: "Pressure-sensitive backing",
    moq: "Discuss by SKU and packaging plan",
    leadTime: "Sample first, bulk lead time confirmed by order quantity",
    packagingOptions: "Retail box, barcode label, instruction insert, master carton",
    privateLabelSupport: true,
    imageGallery: ["assets/catalog/floor-marble-white-ft1129.jpg"],
    specSheet: "Available on request",
    relatedProducts: ["waterproof-peel-and-stick-floor-tiles", "bathroom-peel-and-stick-floor-tiles"],
    ctaLabel: "Request Sample"
  },
  {
    productName: "Stone Look Matte Floor Tile",
    slug: "stone-look-floor-tile-sft-203",
    category: "Floor tile",
    application: ["Kitchen", "Rental renovation", "Light commercial", "Retail"],
    style: ["Stone"],
    material: "Vinyl / PVC",
    size: "12 x 12 in / custom options",
    thickness: "1.5-2.0 mm options",
    surfaceFinish: "Matte textured surface",
    waterproofLevelNotes: "Waterproof surface for kitchens and dry-to-damp areas.",
    adhesiveType: "Stable self-adhesive backing",
    moq: "Discuss by SKU and packaging plan",
    leadTime: "Sample first, bulk lead time confirmed by order quantity",
    packagingOptions: "Retail box, color label, instruction insert",
    privateLabelSupport: true,
    imageGallery: ["assets/catalog/floor-vintage-green-ft1423.jpg"],
    specSheet: "Available on request",
    relatedProducts: ["kitchen-peel-and-stick-floor-tiles", "vinyl-peel-and-stick-floor-tiles"],
    ctaLabel: "Get Quote"
  },
  {
    productName: "Gel Peel and Stick Wall Tile",
    slug: "gel-wall-tile-gwt-301",
    category: "Wall tile",
    application: ["Kitchen backsplash", "Bathroom wall", "RV", "E-commerce"],
    style: ["3D", "Vinyl"],
    material: "PVC / PET surface options",
    size: "12 x 12 in / custom options",
    thickness: "Gel surface options by series",
    surfaceFinish: "Gloss gel finish",
    waterproofLevelNotes: "Suitable for wall splash areas; ask for recommendations before direct shower use.",
    adhesiveType: "Self-adhesive backing",
    moq: "Discuss by SKU and packaging plan",
    leadTime: "Sample first, bulk lead time confirmed by order quantity",
    packagingOptions: "Retail box, barcode label, installation guide",
    privateLabelSupport: true,
    imageGallery: ["assets/catalog/wall-mosaic-grey-mt1001.jpg", "assets/catalog/scenario-wall-pink-bathroom-mt1385.jpg"],
    specSheet: "Available on request",
    relatedProducts: ["kitchen-peel-and-stick-wall-tiles", "3d-peel-and-stick-wall-tiles"],
    ctaLabel: "Request Samples"
  }
];

const nav = {
  Products: [
    ["Peel and Stick Floor Tiles", "/products/peel-and-stick-floor-tiles/"],
    ["Peel and Stick Wall Tiles", "/products/peel-and-stick-wall-tiles/"],
    ["Waterproof Floor Tiles", "/products/waterproof-peel-and-stick-floor-tiles/"],
    ["3D Wall Tiles", "/products/3d-peel-and-stick-wall-tiles/"],
    ["Vinyl Floor Tiles", "/products/vinyl-peel-and-stick-floor-tiles/"]
  ],
  Applications: [
    ["Bathroom Floor Tiles", "/products/bathroom-peel-and-stick-floor-tiles/"],
    ["Kitchen Floor Tiles", "/products/kitchen-peel-and-stick-floor-tiles/"],
    ["Bathroom Wall Tiles", "/products/bathroom-peel-and-stick-wall-tiles/"],
    ["Kitchen Wall Tiles", "/products/kitchen-peel-and-stick-wall-tiles/"],
    ["Shower Wall Tiles", "/products/shower-peel-and-stick-wall-tiles/"]
  ],
  Resources: [
    ["Market Insights", "/resources/market-insights/"],
    ["Sourcing Guides", "/resources/sourcing-guides/"],
    ["Retail & E-commerce Tips", "/resources/retail-ecommerce-tips/"],
    ["Installation & After-Sales", "/resources/installation-after-sales/"],
    ["Product Selection Guides", "/resources/product-selection-guides/"]
  ]
};

const productPages = [
  {
    path: "/products/peel-and-stick-floor-tiles/",
    type: "Floor tile category",
    title: "Peel and Stick Floor Tiles for Wholesale & Retail",
    seoTitle: "Peel and Stick Floor Tiles for Wholesale & Retail | Vinyl Tile Supplier",
    meta: "Source peel and stick floor tiles for wholesale, retail, e-commerce, and private label programs. View styles, applications, packaging support, MOQ, samples, and inquiry options.",
    keywords: ["peel and stick floor tile", "peel and stick floor tiles", "peel and stick tile flooring", "peel and stick vinyl floor tiles", "vinyl floor tiles peel and stick"],
    intro: "Source vinyl peel-and-stick floor tiles for retail shelves, e-commerce listings, distributor programs, and light renovation channels.",
    image: "assets/catalog/scenario-floor-marble-ft1129.jpg",
    overview: ["Vinyl / PVC material options", "Matte and lightly textured surfaces", "Self-adhesive backing", "Common square formats and private-label packaging"],
    options: ["Marble look", "Wood look", "Stone look", "Black and white", "Hexagon", "Vintage / retro", "Waterproof vinyl floor tiles"],
    applications: ["Bathroom", "Kitchen", "Rental renovation", "DIY home improvement", "Light commercial space", "Retail shelf sales", "E-commerce sales"],
    related: ["/products/bathroom-peel-and-stick-floor-tiles/", "/products/kitchen-peel-and-stick-floor-tiles/", "/products/waterproof-peel-and-stick-floor-tiles/", "/products/vinyl-peel-and-stick-floor-tiles/", "/products/marble-peel-and-stick-floor-tiles/"],
    faqs: [
      ["Can I order mixed patterns?", "Mixed pattern orders can be discussed based on packaging plan, MOQ, and inventory or production schedule."],
      ["Do you offer private label packaging?", "Yes. We can support retail boxes, barcode labels, instruction inserts, and master carton information."],
      ["Are the tiles waterproof?", "The surface is waterproof, but installation conditions, substrate quality, and edge treatment affect long-term wet-area performance."],
      ["What is the MOQ?", "MOQ depends on product series, packaging requirements, and whether private-label materials are needed."],
      ["Can I get samples before a bulk order?", "Yes. Sample testing is recommended before confirming patterns, adhesive performance, packaging, and compliance needs."]
    ]
  },
  {
    path: "/products/peel-and-stick-wall-tiles/",
    type: "Wall tile category",
    title: "Peel and Stick Wall Tiles for Wholesale, Retail & Private Label",
    seoTitle: "Peel and Stick Wall Tiles for Wholesale, Retail & Private Label",
    meta: "Source peel and stick wall tiles for kitchen backsplash, bathroom walls, retail, e-commerce, and private label programs with sample, packaging, and compliance support.",
    keywords: ["peel and stick wall tile", "peel and stick wall tiles", "peel and stick tile wall", "wall tiles peel and stick", "peel and stick tiles for walls"],
    intro: "Build wall tile programs for backsplash, bathroom wall, decorative wall, retail shelf, and marketplace channels.",
    image: "assets/catalog/scenario-wall-black-white-backsplash-mt1588.jpg",
    overview: ["Adhesive wall tile products", "Gel, vinyl, stone-look, wood-look, and 3D visual options", "Retail and e-commerce packaging support", "Use guidance for bathroom and shower-adjacent applications"],
    options: ["3D peel and stick wall tiles", "Stone peel and stick wall tiles", "Wood peel and stick wall tiles", "Vinyl peel and stick wall tiles", "Bathroom wall tiles", "Kitchen wall tiles"],
    applications: ["Kitchen backsplash", "Bathroom wall", "Living room decorative wall", "Bedroom wall", "Retail home improvement products", "E-commerce home decor products"],
    note: "Bathroom walls and direct shower areas may require different material and moisture-performance recommendations. Please contact us before promoting any wall tile for long-term direct water exposure.",
    related: ["/products/bathroom-peel-and-stick-wall-tiles/", "/products/kitchen-peel-and-stick-wall-tiles/", "/products/shower-peel-and-stick-wall-tiles/", "/products/3d-peel-and-stick-wall-tiles/", "/products/stone-peel-and-stick-wall-tiles/"],
    faqs: [
      ["Can wall tiles be used in bathrooms?", "Many wall tiles are suitable for bathroom walls or vanity areas. Direct shower areas should be evaluated separately."],
      ["Do you support private label packaging?", "Yes. We support retail boxes, inserts, barcode labels, and packaging claim review."],
      ["Can I request different surface styles?", "Yes. Product options include 3D, stone-look, wood-look, vinyl, marble-look, and kitchen backsplash styles."],
      ["Can I get samples before bulk ordering?", "Yes. Sample review is recommended for surface finish, adhesion, packaging, and installation guidance."]
    ]
  }
];

const applicationPages = [
  {
    path: "/products/bathroom-peel-and-stick-floor-tiles/",
    title: "Bathroom Peel and Stick Floor Tiles for B2B Retail Programs",
    seoTitle: "Bathroom Peel and Stick Floor Tiles for Wholesale & Retail Buyers",
    meta: "Choose bathroom peel and stick floor tiles for retail and wholesale programs. Compare waterproof surface, adhesive strength, anti-slip needs, packaging, and sample options.",
    keywords: ["peel and stick bathroom floor tile", "bathroom peel and stick floor tile", "waterproof peel and stick floor tile bathroom", "peel and stick floor tiles for bathroom"],
    intro: "Help customers refresh bathroom floors with easy-clean floor tiles while keeping sourcing claims practical and verifiable.",
    image: "assets/catalog/scenario-floor-marble-ft1129.jpg",
    requirements: ["Waterproof surface", "Adhesive strength", "Easy cleaning", "Anti-slip consideration", "Thickness and durability"],
    options: ["Marble", "Stone", "Black and white", "Grey"],
    commercial: ["Bathroom styles sell well in retail display sets", "Use clear wet-area instructions", "Add anti-slip and cleaning notes on packaging"],
    cta: "Request Bathroom Tile Samples"
  },
  {
    path: "/products/kitchen-peel-and-stick-floor-tiles/",
    title: "Kitchen Peel and Stick Floor Tiles for Retail & E-commerce",
    seoTitle: "Kitchen Peel and Stick Floor Tiles | Wholesale Vinyl Tile Supplier",
    meta: "Source kitchen peel and stick floor tiles for wholesale, retail, and e-commerce channels. Review easy-clean surfaces, wear resistance, adhesive stability, and packaging options.",
    keywords: ["peel and stick kitchen floor tile", "kitchen peel and stick floor tile", "peel and stick floor tiles for kitchen", "waterproof peel and stick floor tile kitchen"],
    intro: "Kitchen floor programs need practical surfaces, strong product photos, and packaging that explains cleaning and installation clearly.",
    image: "assets/catalog/scenario-floor-black-white-ft1413.jpg",
    requirements: ["Easy cleaning", "Water resistance", "Wear resistance", "Stable adhesive"],
    options: ["Wood look", "Stone look", "Marble look"],
    commercial: ["Show installed kitchen images for e-commerce", "Use retail boxes with cleaning and installation notes", "Prepare style bundles for repeat replenishment"],
    cta: "Request Kitchen Floor Tile Catalog"
  },
  {
    path: "/products/bathroom-peel-and-stick-wall-tiles/",
    title: "Bathroom Peel and Stick Wall Tiles for Wholesale Buyers",
    seoTitle: "Bathroom Peel and Stick Wall Tiles | B2B Supplier & Samples",
    meta: "Source bathroom peel and stick wall tiles for retail and e-commerce. Learn moisture considerations, bathroom vs shower wall guidance, packaging notes, and sample options.",
    keywords: ["peel and stick bathroom wall tile", "peel and stick wall tiles for bathroom", "peel and stick tiles for bathroom wall", "bathroom wall tile peel and stick"],
    intro: "Bathroom wall tile buyers need attractive visuals and careful moisture guidance so retail listings do not overpromise.",
    image: "assets/catalog/scenario-wall-pink-bathroom-mt1385.jpg",
    requirements: ["Moisture considerations", "Bathroom wall vs shower wall distinction", "Surface cleaning", "Adhesive compatibility"],
    options: ["Gel wall tiles", "Stone-look wall tiles", "Marble-look wall tiles", "Subway styles"],
    commercial: ["Add warning labels where needed", "Separate vanity-wall claims from shower-wall claims", "Request material recommendations before listing"],
    cta: "Get Bathroom Wall Tile Samples"
  },
  {
    path: "/products/kitchen-peel-and-stick-wall-tiles/",
    title: "Kitchen Peel and Stick Wall Tiles for Backsplash Programs",
    seoTitle: "Kitchen Peel and Stick Wall Tiles | Backsplash Tile Supplier",
    meta: "Source kitchen peel and stick wall tiles for backsplash, retail, and e-commerce programs. Compare easy-clean surfaces, decorative styles, packaging, and sample support.",
    keywords: ["peel and stick wall tiles for kitchen", "kitchen wall tiles peel and stick", "peel and stick kitchen wall tiles", "peel and stick tiles for kitchen walls"],
    intro: "Kitchen backsplash tiles need strong visual impact, easy-clean claims, and packaging that helps customers understand installation.",
    image: "assets/catalog/scenario-wall-black-white-kitchen-mt1588.jpg",
    requirements: ["Easy-clean surface", "Decorative style options", "Oil-resistant positioning", "Clear installation instructions"],
    options: ["3D styles", "Stone styles", "Marble styles", "Subway tile styles"],
    commercial: ["Use real backsplash images", "Prepare marketplace main-image sets", "Offer retail pack counts by channel"],
    cta: "Request Kitchen Wall Tile Catalog"
  },
  {
    path: "/products/shower-peel-and-stick-wall-tiles/",
    title: "Shower Peel and Stick Wall Tiles: Sourcing Guidance",
    seoTitle: "Peel and Stick Tile for Shower Walls | B2B Material Guidance",
    meta: "Learn sourcing concerns for shower peel and stick wall tiles. Understand moisture risk, adhesive performance, buyer checklist, and material recommendation options.",
    keywords: ["peel and stick tile for shower walls", "waterproof peel and stick tiles for shower walls", "peel and stick shower wall tiles", "shower wall peel and stick tile"],
    intro: "Some peel and stick wall tiles are suitable for bathroom walls and low-moisture areas. For direct shower wall applications, please contact us for material recommendations and testing details.",
    image: "assets/catalog/scenario-wall-pink-bathroom-mt1385.jpg",
    requirements: ["Moisture risk", "Adhesive performance", "Substrate condition", "Edge sealing and maintenance", "Clear retail claim control"],
    options: ["Ask for recommended material type", "Request test details", "Separate shower-wall listings from general bathroom-wall listings"],
    commercial: ["Avoid overpromising long-term direct water exposure", "Use careful packaging and listing warnings", "Confirm the application before bulk ordering"],
    cta: "Ask Us for Shower Wall Material Recommendations"
  }
];

const stylePages = [
  ["waterproof-peel-and-stick-floor-tiles", "Waterproof Peel and Stick Floor Tiles", "waterproof peel and stick floor tile", "Waterproof use cases for bathroom, kitchen, rental, and e-commerce floor tile programs.", ["Bathroom and kitchen applications", "Surface and adhesive considerations", "Recommended waterproof vinyl series", "B2B sourcing checklist"], "assets/catalog/scenario-floor-marble-ft1129.jpg"],
  ["vinyl-peel-and-stick-floor-tiles", "Vinyl Peel and Stick Floor Tiles", "peel and stick vinyl floor tiles", "Vinyl material benefits for wholesale, retail shelf, marketplace, and private-label floor tile programs.", ["Vinyl material benefits", "Wholesale and retail use cases", "Product specification table", "Recommended styles"], "assets/catalog/floor-wood-light-ft1101.jpg"],
  ["marble-peel-and-stick-floor-tiles", "Marble Peel and Stick Floor Tiles", "peel and stick marble floor tile", "Marble style floor tile programs for retailers and online sellers targeting bathroom and kitchen refresh demand.", ["White marble", "Grey marble", "Black marble", "Calacatta gold"], "assets/catalog/floor-marble-white-ft1129.jpg"],
  ["black-and-white-peel-and-stick-floor-tiles", "Black and White Peel and Stick Floor Tiles", "black and white peel and stick floor tile", "Checkerboard and retro floor tile styles for retail displays, e-commerce bundles, and differentiated SKU planning.", ["Checkerboard style", "Retro retail demand", "Display ideas", "Product options"], "assets/catalog/floor-geo-black-white-ft1413.jpg"],
  ["hexagon-peel-and-stick-floor-tiles", "Hexagon Peel and Stick Floor Tiles", "hexagon peel and stick floor tile", "Hexagon peel and stick floor tiles as a niche SKU for buyers who need style differentiation.", ["Niche SKU value", "Suitable buyers", "Style differentiation", "Product options"], "assets/catalog/floor-geo-grey-ft1175.jpg"],
  ["3d-peel-and-stick-wall-tiles", "3D Peel and Stick Wall Tiles", "3d peel and stick wall tiles", "3D wall tile sourcing page for importers and retailers comparing decorative wall tile programs.", ["Decorative wall demand", "Visual selling points", "Packaging and shipping notes", "Recommended applications"], "assets/catalog/wall-mosaic-grey-mt1001.jpg"],
  ["stone-peel-and-stick-wall-tiles", "Stone Peel and Stick Wall Tiles", "peel and stick stone wall tiles", "Stone-look wall decor tiles for retail, e-commerce, kitchen backsplash, and decorative wall programs.", ["Stone-look demand", "Suitable channels", "Texture and photo requirements", "Product options"], "assets/catalog/wall-subway-pink-mt1385.jpg"],
  ["wood-peel-and-stick-wall-tiles", "Wood Peel and Stick Wall Tiles", "peel and stick wood wall tiles", "Wood-look peel and stick wall tiles for living room, bedroom, retail, and e-commerce decor programs.", ["Wood-look demand", "Living room and bedroom use cases", "Retail selling points", "Product options"], "assets/catalog/wall-vintage-mt1105.jpg"]
].map(([slug, title, keyword, intro, points, image]) => ({
  path: `/products/${slug}/`,
  title,
  seoTitle: `${title} | Wholesale Peel-and-Stick Tile Supplier`,
  meta: `${intro} Request samples, packaging support, MOQ, lead time, and private-label options.`,
  keywords: [keyword],
  intro,
  image,
  requirements: points,
  options: points,
  commercial: ["Request samples before bulk order", "Confirm packaging and marketplace claims", "Review related series and test-document needs"],
  cta: "Send Inquiry"
}));

const seriesPages = [
  ["marble-floor-tile-series", "Marble Floor Tile Series", "MFT", "assets/catalog/floor-marble-white-ft1129.jpg", "Marble"],
  ["wood-look-floor-tile-series", "Wood Look Floor Tile Series", "WFT", "assets/catalog/floor-wood-light-ft1101.jpg", "Wood"],
  ["stone-look-floor-tile-series", "Stone Look Floor Tile Series", "SFT", "assets/catalog/floor-vintage-green-ft1423.jpg", "Stone"],
  ["black-and-white-floor-tile-series", "Black and White Floor Tile Series", "BWF", "assets/catalog/floor-geo-black-white-ft1413.jpg", "Black and white"],
  ["3d-wall-tile-series", "3D Wall Tile Series", "3DW", "assets/catalog/wall-mosaic-grey-mt1001.jpg", "3D"],
  ["stone-wall-tile-series", "Stone Wall Tile Series", "SWT", "assets/catalog/wall-subway-pink-mt1385.jpg", "Stone"],
  ["vinyl-wall-tile-series", "Vinyl Wall Tile Series", "VWT", "assets/catalog/wall-black-white-mt1588.jpg", "Vinyl"]
].map(([slug, title, prefix, image, style]) => ({
  path: `/series/${slug}/`,
  title,
  seoTitle: `${title} | Pattern Cards & Sample Request`,
  meta: `Browse ${title.toLowerCase()} pattern cards, item codes, size, thickness, finish, packaging information, MOQ, lead time, and sample request options.`,
  prefix,
  image,
  style
}));

const resources = [
  ["why-peel-and-stick-floor-tiles-are-gaining-demand-in-the-us-renovation-market", "Why Peel and Stick Floor Tiles Are Gaining Demand in the U.S. Renovation Market", "Market Insights", ["/products/peel-and-stick-floor-tiles/", "/products/waterproof-peel-and-stick-floor-tiles/", "/products/bathroom-peel-and-stick-floor-tiles/"], "Request wholesale floor tile catalog and samples."],
  ["floor-vs-wall-peel-and-stick-tiles-wholesale-buyers", "Floor vs Wall Peel and Stick Tiles: Which Category Is Better for Wholesale Buyers?", "Sourcing Guides", ["/products/peel-and-stick-floor-tiles/", "/products/peel-and-stick-wall-tiles/"], "Tell us your target channel and we will recommend suitable product lines."],
  ["choose-peel-and-stick-floor-tiles-for-bathroom-retail-programs", "How to Choose Peel and Stick Floor Tiles for Bathroom Retail Programs", "Product Selection Guides", ["/products/bathroom-peel-and-stick-floor-tiles/", "/products/waterproof-peel-and-stick-floor-tiles/", "/products/marble-peel-and-stick-floor-tiles/"], "Request bathroom floor tile samples."],
  ["sourcing-kitchen-peel-and-stick-floor-tiles", "What Buyers Should Know Before Sourcing Kitchen Peel and Stick Floor Tiles", "Product Selection Guides", ["/products/kitchen-peel-and-stick-floor-tiles/", "/products/vinyl-peel-and-stick-floor-tiles/"], "Request kitchen floor tile catalog."],
  ["are-peel-and-stick-wall-tiles-suitable-for-bathrooms", "Are Peel and Stick Wall Tiles Suitable for Bathrooms? A Sourcing Guide for Buyers", "Installation & After-Sales", ["/products/bathroom-peel-and-stick-wall-tiles/", "/products/shower-peel-and-stick-wall-tiles/", "/products/peel-and-stick-wall-tiles/"], "Ask us for bathroom wall tile material recommendations."],
  ["best-selling-peel-and-stick-floor-tile-styles-for-us-retailers", "Best-Selling Peel and Stick Floor Tile Styles for U.S. Retailers", "Retail & E-commerce Tips", ["/products/marble-peel-and-stick-floor-tiles/", "/products/black-and-white-peel-and-stick-floor-tiles/", "/products/hexagon-peel-and-stick-floor-tiles/"], "Request available style catalog."],
  ["3d-peel-and-stick-wall-tiles-importers-retailers-guide", "3D Peel and Stick Wall Tiles: What Importers and Retailers Should Know", "Sourcing Guides", ["/products/3d-peel-and-stick-wall-tiles/", "/products/kitchen-peel-and-stick-wall-tiles/", "/products/stone-peel-and-stick-wall-tiles/"], "Request 3D wall tile samples."],
  ["how-to-source-peel-and-stick-tiles-from-china-us-buyers", "How to Source Peel and Stick Tiles from China: A Guide for U.S. Buyers", "Sourcing Guides", ["/products/peel-and-stick-floor-tiles/", "/products/peel-and-stick-wall-tiles/", "/contact/"], "Send your target market, quantity, and packaging needs."],
  ["peel-and-stick-tile-packaging-guide-retailers-ecommerce-sellers", "Peel and Stick Tile Packaging Guide for Retailers and E-commerce Sellers", "Retail & E-commerce Tips", ["/products/peel-and-stick-floor-tiles/", "/products/peel-and-stick-wall-tiles/", "/contact/"], "Ask us about private label packaging options."],
  ["what-to-check-before-ordering-peel-and-stick-floor-tiles-in-bulk", "What to Check Before Ordering Peel and Stick Floor Tiles in Bulk", "Sourcing Guides", ["/products/peel-and-stick-floor-tiles/", "/products/vinyl-peel-and-stick-floor-tiles/", "/products/waterproof-peel-and-stick-floor-tiles/"], "Request bulk order checklist and samples."]
].map(([slug, title, category, links, cta]) => ({
  path: `/resources/${slug}/`,
  slug,
  title,
  seoTitle: `${title} | B2B Peel-and-Stick Tile Resource`,
  meta: `${title}. A practical B2B sourcing article for importers, wholesalers, retailers, and e-commerce sellers evaluating peel-and-stick tile programs.`,
  category,
  links,
  cta
}));

const resourceCategories = {
  "market-insights": "Market Insights",
  "sourcing-guides": "Sourcing Guides",
  "retail-ecommerce-tips": "Retail & E-commerce Tips",
  "installation-after-sales": "Installation & After-Sales",
  "product-selection-guides": "Product Selection Guides"
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function cleanPath(pagePath) {
  return pagePath === "/" ? "/" : pagePath.replace(/\/?$/, "/");
}

function writePage(pagePath, content) {
  const targetDir = pagePath === "/" ? root : path.join(root, pagePath);
  return mkdir(targetDir, { recursive: true }).then(() => writeFile(path.join(targetDir, "index.html"), content));
}

function linkList(items) {
  return `<div class="link-list">${items.map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join("")}</div>`;
}

function navHtml() {
  const groups = Object.entries(nav).map(([label, items]) => `
    <div class="nav-group">
      <button class="nav-parent" type="button">${label}</button>
      <div class="nav-menu">${items.map(([item, href]) => `<a href="${href}">${esc(item)}</a>`).join("")}</div>
    </div>
  `).join("");

  return `
    <header class="site-header" data-header>
      <a class="brand" href="/" aria-label="${brandName} home"><span class="brand-mark">JH</span><span>${brandName}</span></a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button>
      <nav class="main-nav" data-nav>
        <a href="/">Home</a>
        ${groups}
        <a href="/about/">About Us</a>
        <a href="/contact/">Contact Us</a>
        <a class="nav-cta" href="/contact/">Request a Quote</a>
        <a class="nav-cta secondary-nav-cta" href="/contact/#sample-request">Get Samples</a>
      </nav>
    </header>
  `;
}

function footerHtml() {
  return `
    <footer class="site-footer">
      <div>
        <strong>${brandName}</strong>
        <p>Peel and stick floor tiles | Peel and stick wall tiles | OEM and private label programs for B2B buyers.</p>
      </div>
      <div class="footer-columns">
        <div><h3>Products</h3>${linkList(nav.Products)}</div>
        <div><h3>Applications</h3>${linkList(nav.Applications)}</div>
        <div><h3>Resources</h3>${linkList(nav.Resources)}</div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:${salesEmail}">${salesEmail}</a>
          <a href="mailto:${adminEmail}">${adminEmail}</a>
          <a href="tel:${phone}">${phone}</a>
          <a href="/contact/">Send Inquiry</a>
          <a href="/contact/#catalog-download">Download Catalog</a>
        </div>
      </div>
      <p class="copyright">Copyright 2026 ${companyName}. All rights reserved.</p>
    </footer>
  `;
}

function breadcrumbSchema(page) {
  const parts = cleanPath(page.path).split("/").filter(Boolean);
  const itemListElement = [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }];
  let current = "";
  parts.forEach((part, index) => {
    current += `/${part}`;
    itemListElement.push({ "@type": "ListItem", position: index + 2, name: page.title || part.replaceAll("-", " "), item: `${siteUrl}${current}/` });
  });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function productSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: page.title,
    description: page.meta,
    image: `${siteUrl}/${page.image || "assets/catalog/scenario-wall-black-white-kitchen-mt1588.jpg"}`,
    brand: { "@type": "Brand", name: brandName },
    category: page.type || "Peel and stick tile"
  };
}

function layout(page, body, schemas = []) {
  const canonical = `${siteUrl}${cleanPath(page.path)}`;
  const jsonLd = [breadcrumbSchema(page), ...schemas].map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(page.seoTitle || page.title)}</title>
    <meta name="description" content="${esc(page.meta)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${esc(page.seoTitle || page.title)}">
    <meta property="og:description" content="${esc(page.meta)}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="/styles.css?v=20260529-home-ux7">
    ${jsonLd}
  </head>
  <body>
    ${navHtml()}
    <main>${body}</main>
    ${footerHtml()}
    <script src="/script.js?v=20260529-home-ux7"></script>
  </body>
</html>`;
}

function hero(page, extra = "") {
  return `
    <section class="page-hero">
      <div>
        <p class="eyebrow">${esc(page.type || "B2B peel and stick tile supplier")}</p>
        <h1>${esc(page.title)}</h1>
        <p>${esc(page.intro || page.meta)}</p>
        <div class="hero-actions">
          <a class="button primary" href="/contact/">Request a Quote</a>
          <a class="button secondary-dark" href="/contact/#sample-request">Get Samples</a>
          <a class="button secondary-dark" href="/contact/#catalog-download">Download Catalog</a>
        </div>
      </div>
      <img src="/${page.image || "assets/catalog/scenario-wall-black-white-kitchen-mt1588.jpg"}" alt="${esc(page.title)}">
    </section>
    ${extra}
  `;
}

function inquiryBlock(title = "Looking for wholesale peel and stick tiles?", text = "Tell us your target market, quantity, preferred style, and packaging needs. Our team will recommend suitable product options.") {
  return `
    <section class="cta-panel">
      <div>
        <p class="eyebrow">Inquiry support</p>
        <h2>${esc(title)}</h2>
        <p>${esc(text)}</p>
      </div>
      <a class="button primary" href="/contact/">Send Inquiry</a>
    </section>
  `;
}

function cards(title, items) {
  return `
    <section class="section">
      <div class="section-heading"><h2>${esc(title)}</h2></div>
      <div class="card-grid">${items.map((item) => `
        <article class="info-card">
          <h3>${esc(item)}</h3>
          <p>Review this option for wholesale, retail, e-commerce, or private-label sourcing programs.</p>
        </article>
      `).join("")}</div>
    </section>
  `;
}

const reviewPhotos = {
  floor: [
    ["Bathroom floor installation", "Customer-submitted photo showing a black-and-white peel-and-stick floor tile installed in a bathroom.", "assets/catalog/review-floor-bathroom-geo.jpg"],
    ["Star pattern bathroom floor", "End-customer installation photo for a decorative floor tile pattern in a compact bathroom.", "assets/catalog/review-floor-bathroom-star.jpg"],
    ["Cutting and fitting detail", "Installation feedback photo showing floor tile cutting and fitting near a doorway.", "assets/catalog/review-floor-install-cutting.jpg"]
  ],
  wall: [
    ["Vanity wall installation", "Customer-submitted photo showing a grey hex wall tile around a vanity area.", "assets/catalog/review-wall-hex-vanity.jpg"],
    ["Laundry wall backsplash", "End-customer photo showing a black-and-white peel-and-stick wall tile used in a laundry area.", "assets/catalog/review-wall-laundry-black-white.jpg"],
    ["Kitchen backsplash installation", "Customer-submitted photo showing hex wall tiles used as a kitchen backsplash.", "assets/catalog/review-wall-hex-kitchen.jpg"]
  ]
};

function reviewKindForPage(page) {
  const path = page.path || "";
  const title = page.title || "";
  if (path.includes("wall") || title.includes("Wall")) return "wall";
  if (path.includes("floor") || title.includes("Floor")) return "floor";
  return "mixed";
}

function reviewBlock(kind = "mixed") {
  const photos = kind === "mixed"
    ? [reviewPhotos.floor[0], reviewPhotos.floor[2], reviewPhotos.wall[0], reviewPhotos.wall[2]]
    : reviewPhotos[kind] || reviewPhotos.floor;
  return `
    <section class="section review-section">
      <div class="section-heading">
        <p class="eyebrow">Customer installation feedback</p>
        <h2>Real installation photos help buyers judge style, application, and listing potential.</h2>
        <p>These end-customer photos are useful for understanding how patterns look after installation. For wholesale orders, we still recommend sample testing before final packaging or marketplace claims are approved.</p>
      </div>
      <div class="review-grid">
        ${photos.map(([title, text, image]) => `
          <article class="review-card">
            <img src="/${image}" alt="${esc(title)}">
            <div>
              <h3>${esc(title)}</h3>
              <p>${esc(text)}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function buyingInfo() {
  return `
    <section class="section alt">
      <div class="section-heading">
        <p class="eyebrow">B2B buying information</p>
        <h2>Information buyers usually confirm before sample or bulk order.</h2>
      </div>
      <div class="spec-table wide">
        <div><span>MOQ</span><strong>Discuss by SKU, packaging plan, and first order quantity.</strong></div>
        <div><span>Lead time</span><strong>Sample first; bulk lead time confirmed by quantity and packaging requirements.</strong></div>
        <div><span>Packaging</span><strong>Retail box, barcode label, instruction insert, master carton, e-commerce protection.</strong></div>
        <div><span>Private label</span><strong>Custom branding, carton artwork, product labels, and claim wording support.</strong></div>
        <div><span>Samples</span><strong>Sample sets available for style, adhesive, surface, and packaging review.</strong></div>
        <div><span>Export support</span><strong>Programs for U.S., Europe, retail, e-commerce, distributor, and project channels.</strong></div>
      </div>
    </section>
  `;
}

function faqBlock(faqs) {
  return `
    <section class="section">
      <div class="section-heading"><p class="eyebrow">FAQ</p><h2>Common sourcing questions</h2></div>
      <div class="faq-grid">${faqs.map(([q, a]) => `<article><h3>${esc(q)}</h3><p>${esc(a)}</p></article>`).join("")}</div>
    </section>
  `;
}

function relatedLinks(links) {
  return `
    <section class="section slim">
      <div class="section-heading"><p class="eyebrow">Related pages</p><h2>Continue product research</h2></div>
      ${linkList(links.map((href) => [titleFromPath(href), href]))}
    </section>
  `;
}

function titleFromPath(href) {
  const slug = href.split("/").filter(Boolean).pop() || "home";
  return slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

function productPage(page) {
  const body = `
    ${hero(page)}
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Product overview</p><h2>Material, surface, adhesive, and application basics.</h2></div>
      <div class="check-grid">${page.overview.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
    </section>
    ${cards("Available product options", page.options)}
    ${buyingInfo()}
    ${cards("Common applications", page.applications)}
    ${page.note ? `<section class="notice"><h2>Usage note</h2><p>${esc(page.note)}</p></section>` : ""}
    ${reviewBlock(reviewKindForPage(page))}
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Why source from us</p><h2>Specific support for wholesale and private-label tile programs.</h2></div>
      <div class="card-grid">
        ${["Stable quality checks", "Flexible packaging support", "Wholesale and bulk order support", "OEM / ODM sample support", "Adhesive, surface, size, and carton inspection"].map((item) => `<article class="info-card"><h3>${item}</h3><p>Our team helps buyers reduce uncertainty before scaling a product line.</p></article>`).join("")}
      </div>
    </section>
    ${faqBlock(page.faqs)}
    ${relatedLinks(page.related)}
    ${inquiryBlock("Send your floor or wall tile requirement", "Share product type, quantity, target market, packaging needs, and any test-report requirements.")}
  `;
  return layout(page, body, [faqSchema(page.faqs), productSchema(page)]);
}

function landingPage(page) {
  const faqs = [
    ["Can I request samples for this product type?", "Yes. Send the target application and sales channel so we can recommend suitable sample options."],
    ["Can packaging be customized?", "Yes. Private-label packaging, labels, instruction inserts, and carton information can be discussed."],
    ["How should buyers confirm suitability?", "Review sample performance, installation surface, packaging claims, and any compliance documents needed for your market."]
  ];
  const body = `
    ${hero(page)}
    ${cards("Product requirements buyers should review", page.requirements)}
    ${cards("Recommended styles or product options", page.options)}
    <section class="section alt">
      <div class="section-heading"><p class="eyebrow">Commercial notes</p><h2>How to position this product for retail and e-commerce buyers.</h2></div>
      <div class="check-grid">${page.commercial.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
    </section>
    ${reviewBlock(reviewKindForPage(page))}
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Common sourcing mistakes</p><h2>Reduce risk before placing a bulk order.</h2></div>
      <div class="card-grid">
        ${["Using consumer-only claims in B2B listings", "Skipping sample testing before packaging approval", "Ignoring surface and moisture limitations", "Treating all patterns as separate SEO pages"].map((item) => `<article class="info-card"><h3>${item}</h3><p>Ask for product-specific guidance before finalizing listings, packaging, or bulk order details.</p></article>`).join("")}
      </div>
    </section>
    ${faqBlock(faqs)}
    ${inquiryBlock(page.cta, "Tell us your target market, preferred style, quantity, and packaging requirements.")}
  `;
  return layout(page, body, [faqSchema(faqs), productSchema(page)]);
}

function seriesPage(page) {
  const imageSets = {
    Marble: ["assets/catalog/floor-marble-white-ft1129.jpg", "assets/catalog/scenario-floor-marble-ft1129.jpg"],
    Wood: ["assets/catalog/floor-wood-light-ft1101.jpg"],
    Stone: ["assets/catalog/floor-vintage-green-ft1423.jpg", "assets/catalog/floor-minimal-block-ft1430.jpg"],
    "Black and white": ["assets/catalog/floor-geo-black-white-ft1413.jpg", "assets/catalog/scenario-floor-black-white-ft1413.jpg"],
    "3D": ["assets/catalog/wall-mosaic-grey-mt1001.jpg", "assets/catalog/wall-vintage-mt1105.jpg"],
    Vinyl: ["assets/catalog/wall-black-white-mt1588.jpg", "assets/catalog/scenario-wall-black-white-backsplash-mt1588.jpg"],
  };
  const seriesImages = page.path.includes("stone-wall-tile-series")
    ? ["assets/catalog/wall-subway-pink-mt1385.jpg", "assets/catalog/scenario-wall-pink-backsplash-mt1385.jpg", "assets/catalog/scenario-wall-pink-bathroom-mt1385.jpg"]
    : imageSets[page.style] || [page.image];
  const patterns = [1, 2, 3, 4, 5, 6].map((number) => ({
    name: `${page.style} Pattern ${number}`,
    code: `${page.prefix}-${String(number).padStart(3, "0")}`,
    image: seriesImages[(number - 1) % seriesImages.length],
    size: "12 x 12 in / custom",
    thickness: page.path.includes("wall") ? "Gel / vinyl surface options" : "1.5-2.0 mm options",
    finish: page.path.includes("wall") ? "Gloss / textured wall finish" : "Matte floor finish",
    application: page.path.includes("wall") ? "Kitchen backsplash / bathroom wall / decor wall" : "Bathroom / kitchen / rental / retail shelf"
  }));
  const body = `
    ${hero({ ...page, intro: `Browse available ${page.title.toLowerCase()} patterns and request sample sets for B2B review.`, image: page.image, type: "Product series" })}
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Pattern cards</p><h2>Use pattern cards for sample selection, not thin duplicate SEO pages.</h2></div>
      <div class="pattern-grid">
        ${patterns.map((pattern) => `
          <article class="pattern-card">
            <img src="/${pattern.image}" alt="${esc(pattern.name)}">
            <h3>${esc(pattern.name)}</h3>
            <div class="spec-table compact">
              <div><span>Item code</span><strong>${pattern.code}</strong></div>
              <div><span>Size</span><strong>${pattern.size}</strong></div>
              <div><span>Thickness</span><strong>${pattern.thickness}</strong></div>
              <div><span>Finish</span><strong>${pattern.finish}</strong></div>
              <div><span>Application</span><strong>${pattern.application}</strong></div>
            </div>
            <a class="button text-button" href="/contact/#sample-request">Request Sample</a>
          </article>
        `).join("")}
      </div>
    </section>
    ${buyingInfo()}
    ${inquiryBlock("Need a sample set from this series?", "Send the item codes, target channel, quantity, and packaging requirements.")}
  `;
  return layout(page, body, [productSchema(page)]);
}

function resourcePage(article) {
  const faq = [
    ["Who is this guide written for?", "It is written for importers, wholesalers, retailers, e-commerce sellers, and private-label buyers."],
    ["Can your team recommend product lines?", "Yes. Share your target market, buyer channel, quantity, and packaging requirements."],
    ["Can I request samples after reading this guide?", "Yes. Use the inquiry form and mention the product type or article topic."]
  ];
  const productLinks = article.links.map((href) => [titleFromPath(href), href]);
  const body = `
    <article class="article">
      <header>
        <p class="eyebrow">${esc(article.category)}</p>
        <h1>${esc(article.title)}</h1>
        <p>${esc(article.meta)}</p>
        <a class="button primary" href="/contact/">${esc(article.cta)}</a>
      </header>
      <section>
        <h2>Market or sourcing context</h2>
        <p>B2B buyers need products that fit the target channel, not just attractive patterns. Before adding peel and stick tiles to a catalog, buyers should evaluate application, packaging, claims, sample testing, and after-sales risk.</p>
      </section>
      <section>
        <h2>Key product factors buyers should consider</h2>
        <div class="check-grid">
          ${["Adhesive strength", "Surface finish", "Thickness and dimensional stability", "Waterproof or moisture notes", "Retail packaging", "Sample vs bulk consistency"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </section>
      <section class="recommend-module">
        <h2>Recommended product pages</h2>
        ${linkList(productLinks)}
      </section>
      <section>
        <h2>Common sourcing mistakes</h2>
        <p>Avoid relying only on pattern images, using consumer-only claims, ignoring packaging damage risk, or confirming bulk orders before sample and document review.</p>
      </section>
      <section>
        <h2>How we support B2B buyers</h2>
        <p>We help buyers compare product types, request samples, review packaging, prepare test-document information, and match tile series to retail, wholesale, e-commerce, or project channels.</p>
      </section>
    </article>
    ${faqBlock(faq)}
    ${inquiryBlock(article.cta, "Tell us your target market, quantity, packaging needs, and which product category you are evaluating.")}
  `;
  return layout(article, body, [faqSchema(faq)]);
}

function homePage() {
  const page = {
    path: "/",
    title: "Peel and Stick Tile Supplier for U.S. Wholesale, Retail & E-commerce Buyers",
    seoTitle: "Peel and Stick Tile Supplier for Wholesale, Retail & Private Label",
    meta: "Source peel and stick floor tiles and wall tiles for U.S. wholesale, retail, e-commerce, and private label programs with samples, packaging support, and inquiry-focused sourcing help.",
    image: "assets/catalog/scenario-wall-black-white-kitchen-mt1588.jpg"
  };
  const body = `
    <section class="home-hero">
      <div class="home-hero-copy">
        <p class="eyebrow">B2B peel and stick tile supplier</p>
        <h1>Wholesale peel and stick floor & wall tiles.</h1>
        <p>For U.S. wholesalers, retailers, e-commerce sellers, and private-label brands that need stable quality, flexible packaging, samples, and practical sourcing support.</p>
        <div class="hero-actions">
          <a class="button primary" href="/contact/">Request a Quote</a>
          <a class="button secondary-dark" href="/contact/#sample-request">Get Samples</a>
          <a class="button secondary-dark" href="/products/peel-and-stick-floor-tiles/">View Products</a>
        </div>
        <div class="buyer-path" data-buyer-path>
          <p class="buyer-path-label">What are you sourcing?</p>
          <div class="buyer-path-options" role="tablist" aria-label="Sourcing path">
            <button class="active" type="button" data-buyer-choice="floor">Floor tiles</button>
            <button type="button" data-buyer-choice="wall">Wall tiles</button>
            <button type="button" data-buyer-choice="label">Private label</button>
            <button type="button" data-buyer-choice="sample">Samples</button>
          </div>
          <div class="buyer-path-result">
            <strong data-buyer-title>Start with floor tile programs</strong>
            <span data-buyer-text>Compare waterproof vinyl, marble, wood look, black-and-white, and hexagon series.</span>
            <a href="/products/peel-and-stick-floor-tiles/" data-buyer-link>View floor tile options</a>
          </div>
        </div>
      </div>
      <div class="home-hero-media" aria-label="Peel and stick tile product preview">
        <img class="hero-main-image" src="/assets/catalog/scenario-wall-black-white-kitchen-mt1588.jpg" alt="Peel and stick wall tiles installed in a kitchen backsplash scene">
        <div class="hero-thumb-row">
          <a href="/products/peel-and-stick-floor-tiles/"><img src="/assets/catalog/floor-marble-white-ft1129.jpg" alt="White marble peel and stick floor tile"><span>Floor</span></a>
          <a href="/products/peel-and-stick-wall-tiles/"><img src="/assets/catalog/wall-mosaic-grey-mt1001.jpg" alt="Grey mosaic peel and stick wall tile"><span>Wall</span></a>
          <a href="/contact/#catalog-download"><img src="/assets/catalog/scenario-floor-black-white-ft1413.jpg" alt="Black and white peel and stick floor tile installed"><span>Catalog</span></a>
        </div>
        <div class="hero-proof-strip">
          <span>RoHS / CE</span>
          <span>Private label</span>
          <span>Sample support</span>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Core advantages</p><h2>Built to help buyers source with less back-and-forth.</h2></div>
      <div class="card-grid">
        ${["Factory direct supply", "Wholesale and bulk order support", "Private label packaging", "Sample support", "Quality inspection", "Responsive sales support"].map((item) => `<article class="info-card"><h3>${item}</h3><p>Specific support for sourcing, launch planning, packaging, and repeat orders.</p></article>`).join("")}
      </div>
    </section>
    <section class="section alt">
      <div class="section-heading"><p class="eyebrow">Browse products</p><h2>Main product categories and sourcing pages.</h2></div>
      ${linkList([...nav.Products, ...nav.Applications])}
    </section>
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Featured styles</p><h2>Representative floor and wall tile styles from the current catalog.</h2></div>
      <div class="pattern-grid">
        ${[
          ["White Marble Floor Tile", "Clean marble-look vinyl floor tile for bathroom, kitchen, retail, and e-commerce programs.", "assets/catalog/floor-marble-white-ft1129.jpg", "/products/marble-peel-and-stick-floor-tiles/"],
          ["Light Wood Floor Tile", "Warm wood-look floor tile for rental renovation and DIY home improvement channels.", "assets/catalog/floor-wood-light-ft1101.jpg", "/series/wood-look-floor-tile-series/"],
          ["Black & White Retro Floor Tile", "Graphic black-and-white floor tile for differentiated retail and online SKUs.", "assets/catalog/floor-geo-black-white-ft1413.jpg", "/products/black-and-white-peel-and-stick-floor-tiles/"],
          ["Grey Mosaic Wall Tile", "Gel wall tile mosaic style for backsplash and decorative wall programs.", "assets/catalog/wall-mosaic-grey-mt1001.jpg", "/products/3d-peel-and-stick-wall-tiles/"],
          ["Pink Subway Wall Tile", "Soft stone-look subway wall tile for bathroom wall and backsplash programs.", "assets/catalog/wall-subway-pink-mt1385.jpg", "/products/bathroom-peel-and-stick-wall-tiles/"],
          ["Black & White Kitchen Wall Tile", "High-contrast wall tile style with application images for marketplace listings.", "assets/catalog/wall-black-white-mt1588.jpg", "/products/kitchen-peel-and-stick-wall-tiles/"]
        ].map(([title, text, image, href]) => `
          <article class="pattern-card">
            <img src="/${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${text}</p>
            <a class="button text-button" href="${href}">View Related Page</a>
          </article>
        `).join("")}
      </div>
    </section>
    ${reviewBlock("mixed")}
    ${inquiryBlock("Need samples, catalog, or a wholesale quote?", "Send product type, quantity, target market, and packaging needs. Our team will recommend suitable tile options.")}
  `;
  return layout(page, body);
}

function contactPage() {
  const page = {
    path: "/contact/",
    title: "Contact Us",
    seoTitle: `Contact ${brandName} | Request Quote & Samples`,
    meta: `Contact ${companyName} for peel and stick tile samples, catalogs, wholesale quotes, private-label packaging, and bulk order project support.`
  };
  const body = `
    <section class="contact-page">
      <div>
        <p class="eyebrow">Contact us</p>
        <h1>Send your requirement. We will reply within 24 hours.</h1>
        <p>${companyName} will help you confirm samples, wholesale pricing, packaging requirements, target market details, and project timelines.</p>
        <div class="contact-methods">
          <a href="mailto:${salesEmail}">Sales: ${salesEmail}</a>
          <a href="mailto:${adminEmail}">Admin: ${adminEmail}</a>
          <a href="tel:${phone}">Phone / WhatsApp: ${phone}</a>
        </div>
      </div>
      <form class="rfq-form" id="quick-inquiry" novalidate data-rfq-form>
        <div class="form-mode" role="tablist" aria-label="Inquiry type">
          <button class="mode-button active" type="button" data-form-mode="quick">Quick Inquiry</button>
          <button class="mode-button" type="button" data-form-mode="project">Project / Bulk Order Inquiry</button>
        </div>
        <div class="form-grid">
          <label>Name <input name="name" autocomplete="name" required></label>
          <label>Email <input name="email" type="email" autocomplete="email" required></label>
          <label>WhatsApp / Phone <input name="phone" autocomplete="tel"></label>
          <label>Product Interested In <select name="productInterest" required><option value="">Select one</option><option>Peel and Stick Floor Tiles</option><option>Peel and Stick Wall Tiles</option><option>Waterproof Floor Tiles</option><option>3D Wall Tiles</option><option>Private Label Program</option></select></label>
        </div>
        <div class="project-fields" data-project-fields>
          <div class="form-grid">
            <label>Company Name <input name="company" autocomplete="organization"></label>
            <label>Buyer Type <select name="buyerType"><option value="">Select one</option><option>Importer</option><option>Wholesaler</option><option>Retailer</option><option>E-commerce seller</option><option>Contractor</option><option>Other</option></select></label>
            <label>Country / Market <input name="country" placeholder="U.S., Europe, Amazon, retail chain"></label>
            <label>Quantity <input name="quantity" placeholder="Cartons, pallets, containers"></label>
            <label>Packaging Requirement <input name="packaging" placeholder="Private label, retail box, barcode, insert"></label>
            <label>Target Price <input name="targetPrice" placeholder="If available"></label>
            <label>Timeline <input name="timeline" placeholder="Sample date, launch date, first order"></label>
            <label>File Upload <input name="attachment" type="file"></label>
          </div>
        </div>
        <label>Message <textarea name="message" rows="5" required placeholder="Tell us your product type, quantity, target market, packaging needs, and first question."></textarea></label>
        <p class="form-status" data-form-status aria-live="polite"></p>
        <button class="button primary form-submit" type="submit">Send Your Requirement</button>
      </form>
    </section>
    <section class="section alt" id="sample-request">
      <div class="section-heading"><p class="eyebrow">Sample request</p><h2>Need samples before placing a bulk order?</h2></div>
      <form class="mini-form" data-simple-form>
        <input name="name" placeholder="Name" required>
        <input name="email" type="email" placeholder="Email" required>
        <input name="company" placeholder="Company">
        <input name="country" placeholder="Country">
        <input name="series" placeholder="Interested product series">
        <textarea name="message" rows="3" placeholder="Shipping address and sample requirements"></textarea>
        <button class="button primary" type="submit">Request Samples</button>
        <p class="form-status" aria-live="polite"></p>
      </form>
    </section>
    <section class="section" id="catalog-download">
      <div class="section-heading"><p class="eyebrow">Catalog download</p><h2>Download our peel and stick tile catalog.</h2></div>
      <form class="mini-form" data-simple-form>
        <input name="name" placeholder="Name" required>
        <input name="email" type="email" placeholder="Email" required>
        <input name="company" placeholder="Company">
        <input name="country" placeholder="Country">
        <select name="buyerType"><option>Importer</option><option>Wholesaler</option><option>Retailer</option><option>E-commerce seller</option><option>Contractor</option><option>Other</option></select>
        <button class="button primary" type="submit">Get Catalog</button>
        <p class="form-status" aria-live="polite"></p>
      </form>
    </section>
  `;
  return layout(page, body);
}

function aboutPage() {
  const page = {
    path: "/about/",
    title: "About Us",
    seoTitle: `About ${brandName} | B2B Peel and Stick Tile Supplier`,
    meta: `Learn how ${companyName} supports B2B buyers with peel and stick floor tiles, wall tiles, packaging customization, sample testing, and export-ready sourcing support.`
  };
  const body = `
    ${hero({ ...page, intro: `${companyName} is focused on practical peel and stick tile sourcing support for importers, wholesalers, retailers, e-commerce sellers, and private-label brands.`, image: "assets/catalog/scenario-wall-pink-bathroom-mt1385.jpg", type: "About us" })}
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Our position</p><h2>${brandName} supports tile sourcing programs, not consumer DIY retail.</h2></div>
      <p class="large-copy">We support buyers with product matching, sample review, packaging planning, compliance-document coordination, and order follow-up for peel and stick floor tiles and wall tiles.</p>
    </section>
    <section class="section alt">
      <div class="section-heading"><p class="eyebrow">Capabilities</p><h2>Use specific operational checks instead of empty quality claims.</h2></div>
      <div class="card-grid">
        ${["Adhesive strength review", "Surface finish checks", "Size consistency checks", "Packaging condition checks", "Private-label packaging coordination", "Responsive sales support"].map((item) => `<article class="info-card"><h3>${item}</h3><p>These checkpoints help buyers reduce sample-to-bulk and packaging risks.</p></article>`).join("")}
      </div>
    </section>
    ${inquiryBlock("Talk to our sales team", "Share your target market, product category, expected order size, and packaging needs.")}
  `;
  return layout(page, body);
}

function resourcesIndex() {
  const page = {
    path: "/resources/",
    title: "Resources",
    seoTitle: "B2B Peel and Stick Tile Resources | Sourcing Guides & Market Insights",
    meta: "Read B2B sourcing guides, market insights, retail and e-commerce tips, installation and after-sales notes, and product selection guides for peel and stick tile buyers."
  };
  const body = `
    ${hero({ ...page, intro: "Buyer-focused articles for importers, wholesalers, retailers, e-commerce sellers, and private-label brands.", image: "assets/catalog/floor-vintage-green-ft1423.jpg", type: "Resource center" })}
    <section class="section">
      <div class="section-heading"><p class="eyebrow">Categories</p><h2>Find guidance by buying task.</h2></div>
      ${linkList(Object.entries(resourceCategories).map(([slug, label]) => [label, `/resources/${slug}/`]))}
    </section>
    <section class="section alt">
      <div class="section-heading"><p class="eyebrow">Latest resources</p><h2>First B2B article templates and drafts.</h2></div>
      <div class="resource-grid">${resources.map((article) => resourceCard(article)).join("")}</div>
    </section>
  `;
  return layout(page, body);
}

function resourceCard(article) {
  return `<article class="resource-card"><span>${esc(article.category)}</span><h3>${esc(article.title)}</h3><p>${esc(article.meta)}</p><a class="button text-button" href="${article.path}">Read Guide</a></article>`;
}

function categoryPage(slug, label) {
  const page = {
    path: `/resources/${slug}/`,
    title: label,
    seoTitle: `${label} | B2B Peel and Stick Tile Resources`,
    meta: `${label} for B2B peel and stick tile buyers evaluating products, sourcing risks, packaging, retail channels, and inquiry preparation.`
  };
  const filtered = resources.filter((article) => article.category === label);
  const list = filtered.length ? filtered : resources.slice(0, 4);
  const body = `
    ${hero({ ...page, intro: `Browse ${label.toLowerCase()} written for importers, wholesalers, retailers, and e-commerce sellers.`, image: "assets/catalog/floor-vintage-green-ft1423.jpg", type: "Resource category" })}
    <section class="section"><div class="resource-grid">${list.map((article) => resourceCard(article)).join("")}</div></section>
  `;
  return layout(page, body);
}

async function main() {
  await writePage("/", homePage());
  await writePage("/contact/", contactPage());
  await writePage("/about/", aboutPage());
  await writePage("/resources/", resourcesIndex());

  for (const page of productPages) await writePage(page.path, productPage(page));
  for (const page of [...applicationPages, ...stylePages]) await writePage(page.path, landingPage(page));
  for (const page of seriesPages) await writePage(page.path, seriesPage(page));
  for (const article of resources) await writePage(article.path, resourcePage(article));
  for (const [slug, label] of Object.entries(resourceCategories)) await writePage(`/resources/${slug}/`, categoryPage(slug, label));

  await mkdir(path.join(root, "data"), { recursive: true });
  await writeFile(path.join(root, "data", "product-data.json"), JSON.stringify(productData, null, 2));
}

main();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.sEOMeta.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.address.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Fresh Bouquets",
        slug: "fresh-bouquets",
        description: "Beautiful handcrafted fresh flower arrangements for every occasion",
        imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800",
      },
    }),
    prisma.category.create({
      data: {
        name: "Dried & Preserved",
        slug: "dried-preserved",
        description: "Long-lasting dried and preserved flower bouquets that keep their beauty for years",
        imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
      },
    }),
    prisma.category.create({
      data: {
        name: "Gift Hampers",
        slug: "gift-hampers",
        description: "Curated gift bundles combining flowers with luxury treats",
        imageUrl: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800",
      },
    }),
  ]);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Eternal Rose Bouquet",
        slug: "eternal-rose-bouquet",
        description: "Looking for the perfect anniversary gift? Our Eternal Rose Bouquet is handcrafted with preserved roses that last up to 3 years — no watering required. Each bloom is carefully selected and preserved at peak beauty, ensuring a lasting reminder of your love.",
        price: 49.99,
        comparePrice: 65.00,
        categoryId: categories[1].id,
        inventory: 25,
        sku: "AMR-DRY-001",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["roses", "preserved", "anniversary", "romantic", "bestseller"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800", altText: "Eternal Rose Bouquet - preserved pink roses", position: 0 },
            { url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800", altText: "Eternal Rose Bouquet - close up detail", position: 1 },
          ],
        },
        variants: {
          create: [
            { name: "Size", value: "Small (6 roses)", price: 39.99, inventory: 10, sku: "AMR-DRY-001-S" },
            { name: "Size", value: "Medium (12 roses)", price: 49.99, inventory: 10, sku: "AMR-DRY-001-M" },
            { name: "Size", value: "Large (24 roses)", price: 79.99, inventory: 5, sku: "AMR-DRY-001-L" },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Spring Garden Bouquet",
        slug: "spring-garden-bouquet",
        description: "Brighten someone's day with our Spring Garden Bouquet — a vibrant mix of seasonal blooms including tulips, daffodils, and hyacinths. Hand-tied by our artisans and delivered in eco-friendly wrapping.",
        price: 34.99,
        categoryId: categories[0].id,
        inventory: 40,
        sku: "AMR-FRH-001",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["spring", "fresh", "seasonal", "colourful", "birthday"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800", altText: "Spring Garden Bouquet", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Lavender Dreams",
        slug: "lavender-dreams",
        description: "Indulge in the calming beauty of our Lavender Dreams bouquet. This dried lavender arrangement brings the soothing scent of Provence right into your home. Perfect for relaxation, decoration, or as a thoughtful gift.",
        price: 29.99,
        categoryId: categories[1].id,
        inventory: 35,
        sku: "AMR-DRY-002",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["lavender", "dried", "calming", "home-decor", "scented"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800", altText: "Lavender Dreams dried bouquet", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Romantic Red Roses",
        slug: "romantic-red-roses",
        description: "Say 'I love you' with the classic elegance of a dozen premium red roses. Hand-selected for their rich crimson colour and velvety petals, beautifully arranged and gift-wrapped with a complimentary message card.",
        price: 44.99,
        comparePrice: 55.00,
        categoryId: categories[0].id,
        inventory: 30,
        sku: "AMR-FRH-002",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["roses", "romantic", "valentines", "anniversary", "red"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800", altText: "Romantic Red Roses bouquet", position: 0 },
          ],
        },
        variants: {
          create: [
            { name: "Quantity", value: "12 Roses", price: 44.99, inventory: 15 },
            { name: "Quantity", value: "24 Roses", price: 74.99, inventory: 10 },
            { name: "Quantity", value: "50 Roses", price: 129.99, inventory: 5 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Luxury Gift Hamper",
        slug: "luxury-gift-hamper",
        description: "The ultimate gift experience. Our Luxury Gift Hamper combines a stunning dried flower bouquet with artisan chocolates, scented candle, and bath treats — all presented in a beautiful keepsake box.",
        price: 89.99,
        comparePrice: 110.00,
        categoryId: categories[2].id,
        inventory: 15,
        sku: "AMR-GFT-001",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["luxury", "hamper", "gift-set", "chocolates", "candle", "bestseller"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800", altText: "Luxury Gift Hamper", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Wildflower Meadow",
        slug: "wildflower-meadow",
        description: "Bring the countryside indoors with our Wildflower Meadow bouquet. A cheerful mix of daisies, cornflowers, and wild grasses, arranged in a natural, unstructured style. Perfect for nature lovers.",
        price: 32.99,
        categoryId: categories[0].id,
        inventory: 20,
        sku: "AMR-FRH-003",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["wildflower", "natural", "countryside", "rustic", "eco"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800", altText: "Wildflower Meadow bouquet", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Crochet Flower Bouquet",
        slug: "crochet-flower-bouquet",
        description: "A truly unique forever gift — our handmade crochet flower bouquet features meticulously crafted yarn flowers that will never wilt. Each piece takes hours to create by our skilled artisans.",
        price: 54.99,
        categoryId: categories[1].id,
        inventory: 10,
        sku: "AMR-CRO-001",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["crochet", "handmade", "knitted", "forever", "unique", "artisan"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800", altText: "Crochet Flower Bouquet", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Mother's Day Special",
        slug: "mothers-day-special",
        description: "Show mum how much she means to you with our Mother's Day Special. A pastel arrangement of peonies, roses, and eucalyptus, hand-tied with a satin ribbon and delivered with a personalised card.",
        price: 42.99,
        categoryId: categories[0].id,
        inventory: 50,
        sku: "AMR-FRH-004",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["mothers-day", "mum", "pastel", "peonies", "seasonal"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800", altText: "Mother's Day Special bouquet", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Birthday Bliss Box",
        slug: "birthday-bliss-box",
        description: "Make birthdays unforgettable with our Birthday Bliss Box. Includes a vibrant fresh flower posy, gourmet macarons, a birthday balloon, and a luxury greeting card — all in one gorgeous gift box.",
        price: 64.99,
        categoryId: categories[2].id,
        inventory: 20,
        sku: "AMR-GFT-002",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["birthday", "gift-box", "macarons", "balloon", "celebration"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800", altText: "Birthday Bliss Box", position: 0 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Sunset Pampas Arrangement",
        slug: "sunset-pampas-arrangement",
        description: "Our Sunset Pampas Arrangement features fluffy pampas grass, dried palm leaves, and bunny tails in warm sunset tones. A stunning statement piece for your home that lasts forever.",
        price: 59.99,
        categoryId: categories[1].id,
        inventory: 12,
        sku: "AMR-DRY-003",
        isPublished: true,
        publishedAt: new Date(),
        tags: ["pampas", "dried", "boho", "home-decor", "statement", "trending"],
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800", altText: "Sunset Pampas Arrangement", position: 0 },
          ],
        },
      },
    }),
  ]);

  // Create admin user
  await prisma.user.create({
    data: {
      email: "admin@amore-gifts.com",
      name: "Amoré Admin",
      role: "ADMIN",
    },
  });

  // Create sample customer
  const customer = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      name: "Sarah Johnson",
      role: "CUSTOMER",
    },
  });

  // Create sample address
  const address = await prisma.address.create({
    data: {
      userId: customer.id,
      firstName: "Sarah",
      lastName: "Johnson",
      line1: "42 Rose Lane",
      city: "London",
      county: "Greater London",
      postcode: "SW1A 1AA",
      country: "GB",
      isDefault: true,
    },
  });

  // Create sample order
  await prisma.order.create({
    data: {
      orderNumber: "AMR-SAMPLE-001",
      userId: customer.id,
      status: "DELIVERED",
      addressId: address.id,
      shippingMethod: "standard",
      shippingCost: 4.99,
      subtotal: 49.99,
      discount: 0,
      total: 54.98,
      paymentStatus: "PAID",
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 49.99,
            personalisation: "Happy Anniversary, darling!",
          },
        ],
      },
    },
  });

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        productId: products[0].id,
        userId: customer.id,
        rating: 5,
        title: "Absolutely stunning!",
        body: "The roses are even more beautiful in person. They've lasted months already and still look perfect. My wife loved them!",
        isVerified: true,
        isPublished: true,
      },
      {
        productId: products[1].id,
        rating: 4,
        title: "Gorgeous spring colours",
        body: "Beautiful arrangement with a lovely mix of flowers. Lasted about a week which is great for fresh flowers. Would buy again!",
        isVerified: true,
        isPublished: true,
      },
      {
        productId: products[4].id,
        userId: customer.id,
        rating: 5,
        title: "Best gift ever!",
        body: "Sent this to my mum for her birthday and she was over the moon. The chocolates were delicious and the flowers were beautiful. Amazing quality.",
        isVerified: true,
        isPublished: true,
      },
    ],
  });

  // Create sample coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME10",
        type: "PERCENTAGE",
        value: 10,
        minOrderValue: 25,
        isActive: true,
      },
      {
        code: "FREESHIP",
        type: "FREE_SHIPPING",
        value: 0,
        minOrderValue: 40,
        isActive: true,
      },
      {
        code: "LOVE20",
        type: "FIXED",
        value: 20,
        minOrderValue: 60,
        maxUses: 100,
        isActive: true,
      },
    ],
  });

  // Create sample blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "best-anniversary-gift-ideas-2025",
        title: "10 Best Anniversary Gift Ideas for 2025",
        excerpt: "From preserved rose bouquets to luxury hampers, discover the most thoughtful anniversary gifts that show how much you care.",
        content: "<h2>Finding the Perfect Anniversary Gift</h2><p>Anniversaries are a celebration of love, commitment, and shared memories. Finding the right gift can feel daunting, but the best presents come from the heart.</p><h3>1. Eternal Rose Bouquet</h3><p>Our bestselling Eternal Rose Bouquet features preserved roses that last up to 3 years. Unlike fresh flowers, these beauties require no watering and maintain their stunning appearance month after month.</p>",
        authorId: customer.id,
        category: "Gift Ideas & Inspiration",
        tags: ["anniversary", "gift-guide", "roses", "romantic"],
        isPublished: true,
        publishedAt: new Date(),
        seoTitle: "10 Best Anniversary Gift Ideas for 2025 | Amoré",
        seoDescription: "Discover the most thoughtful anniversary gift ideas including preserved roses, luxury hampers, and handcrafted bouquets.",
      },
      {
        slug: "fresh-vs-dried-bouquets",
        title: "Fresh vs Dried Bouquets — Which Lasts Longer?",
        excerpt: "Wondering whether to choose fresh or dried flowers? We compare longevity, care requirements, and aesthetics to help you decide.",
        content: "<h2>The Great Flower Debate</h2><p>Both fresh and dried flowers have their unique charm. But when it comes to longevity, maintenance, and sustainability, which comes out on top?</p>",
        authorId: customer.id,
        category: "Flower Trends & Seasonal Edits",
        tags: ["fresh-flowers", "dried-flowers", "comparison", "care-tips"],
        isPublished: true,
        publishedAt: new Date(),
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { province, category, culinary, recipe, culinaryCategory } from "./schema";
import { nanoid } from "nanoid";

// Load environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const queryClient = postgres(DATABASE_URL);
const db = drizzle({ client: queryClient });

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // 1. Seed Provinces
    console.log("\n📍 Seeding provinces...");
    const provinces = [
      { id: nanoid(), name: "Jawa Barat", code: "JB" },
      { id: nanoid(), name: "Jawa Timur", code: "JT" },
      { id: nanoid(), name: "Sumatera Barat", code: "SB" },
      { id: nanoid(), name: "Bali", code: "BA" },
      { id: nanoid(), name: "Yogyakarta", code: "YK" },
      { id: nanoid(), name: "DKI Jakarta", code: "JK" },
      { id: nanoid(), name: "Sulawesi Selatan", code: "SS" },
    ];

    await db.insert(province).values(provinces);
    console.log(`✅ Inserted ${provinces.length} provinces`);

    // 2. Seed Categories
    console.log("\n🏷️  Seeding categories...");
    const categories = [
      {
        id: nanoid(),
        name: "Spicy",
        description: "Culinary items with hot and spicy flavor profiles",
      },
      {
        id: nanoid(),
        name: "Sweet",
        description: "Desserts and sweet dishes",
      },
      {
        id: nanoid(),
        name: "Savory",
        description: "Savory main dishes and side dishes",
      },
      {
        id: nanoid(),
        name: "Traditional",
        description: "Traditional and authentic Indonesian recipes",
      },
      {
        id: nanoid(),
        name: "Street Food",
        description: "Popular street food items",
      },
      {
        id: nanoid(),
        name: "Vegetarian",
        description: "Vegetarian-friendly options",
      },
      {
        id: nanoid(),
        name: "Seafood",
        description: "Dishes featuring seafood as main ingredient",
      },
    ];

    await db.insert(category).values(categories);
    console.log(`✅ Inserted ${categories.length} categories`);

    // 3. Seed Culinaries
    console.log("\n🍽️  Seeding culinaries...");
    const culinaries = [
      {
        id: nanoid(),
        name: "Rendang",
        image: "https://images.unsplash.com/photo-1591959300945-4bb5bcd06e5f",
        description:
          "Rendang is a rich and tender coconut beef stew which is explosively flavorful and beef rendang is arguably the king of rendang. Cooked with coconut milk and a paste of mixed spices, the beef is slow-cooked until it absorbs the spices and turns dark caramel colored.",
        type: "food" as const,
        provinceId: provinces[2].id, // Sumatera Barat
      },
      {
        id: nanoid(),
        name: "Sate Ayam",
        image: "https://images.unsplash.com/photo-1625937329935-010d8c0c5066",
        description:
          "Satay or Sate is a dish of seasoned, skewered and grilled meat, served with a sauce. Chicken satay is marinated in a blend of spices and coconut milk, then grilled over charcoal and served with peanut sauce.",
        type: "food" as const,
        provinceId: provinces[1].id, // Jawa Timur
      },
      {
        id: nanoid(),
        name: "Gudeg",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
        description:
          "Gudeg is a traditional Javanese dish from Yogyakarta. It is made from young unripe jack fruit (gori) cooked with palm sugar and coconut milk. The sweet flavor is balanced by savory side dishes.",
        type: "food" as const,
        provinceId: provinces[4].id, // Yogyakarta
      },
      {
        id: nanoid(),
        name: "Es Cendol",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        description:
          "Cendol is an iced sweet dessert that contains droplets of green rice flour jelly, coconut milk, and palm sugar syrup. It is commonly served in Indonesia as a way to cool down on hot days.",
        type: "beverage" as const,
        provinceId: provinces[0].id, // Jawa Barat
      },
      {
        id: nanoid(),
        name: "Nasi Goreng",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        description:
          "Nasi Goreng is Indonesian fried rice, and a popular dish throughout Indonesia and Southeast Asia. It is distinguished from other fried rice by its aromatic and smoky flavor from the use of kecap manis (sweet soy sauce).",
        type: "food" as const,
        provinceId: provinces[5].id, // DKI Jakarta
      },
      {
        id: nanoid(),
        name: "Gado-Gado",
        image: "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a",
        description:
          "Gado-gado is an Indonesian salad of slightly boiled, blanched or steamed vegetables and hard-boiled eggs, boiled potatoes, fried tofu, and tempeh, served with a peanut sauce dressing.",
        type: "food" as const,
        provinceId: provinces[5].id, // DKI Jakarta
      },
      {
        id: nanoid(),
        name: "Bebek Betutu",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6",
        description:
          "Bebek Betutu is a traditional Balinese dish of duck stuffed with spices, wrapped in banana leaves and coconut husks, then roasted in embers. It is a popular ceremonial dish in Bali.",
        type: "food" as const,
        provinceId: provinces[3].id, // Bali
      },
      {
        id: nanoid(),
        name: "Coto Makassar",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
        description:
          "Coto Makassar is a traditional Indonesian soup from Makassar, South Sulawesi. The soup is made from beef and offal, cooked in a broth mixed with ground peanuts.",
        type: "food" as const,
        provinceId: provinces[6].id, // Sulawesi Selatan
      },
      {
        id: nanoid(),
        name: "Es Teh Manis",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
        description:
          "Es Teh Manis is Indonesian sweet iced tea. It is one of the most popular drinks in Indonesia, served in restaurants, warungs, and street food stalls. Simple yet refreshing.",
        type: "drink" as const,
        provinceId: provinces[5].id, // DKI Jakarta
      },
      {
        id: nanoid(),
        name: "Martabak Manis",
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d",
        description:
          "Martabak Manis is a sweet, thick pancake with various toppings and fillings. Common toppings include chocolate, cheese, peanuts, and condensed milk. It's a popular street food dessert.",
        type: "food" as const,
        provinceId: provinces[5].id, // DKI Jakarta
      },
    ];

    await db.insert(culinary).values(culinaries);
    console.log(`✅ Inserted ${culinaries.length} culinaries`);

    // 4. Link Culinaries to Categories
    console.log("\n🔗 Linking culinaries to categories...");
    const culinaryCategories = [
      // Rendang - Spicy, Traditional, Savory
      { culinaryId: culinaries[0].id, categoryId: categories[0].id },
      { culinaryId: culinaries[0].id, categoryId: categories[3].id },
      { culinaryId: culinaries[0].id, categoryId: categories[2].id },

      // Sate Ayam - Traditional, Street Food, Savory
      { culinaryId: culinaries[1].id, categoryId: categories[3].id },
      { culinaryId: culinaries[1].id, categoryId: categories[4].id },
      { culinaryId: culinaries[1].id, categoryId: categories[2].id },

      // Gudeg - Traditional, Sweet
      { culinaryId: culinaries[2].id, categoryId: categories[3].id },
      { culinaryId: culinaries[2].id, categoryId: categories[1].id },

      // Es Cendol - Sweet, Traditional, Street Food
      { culinaryId: culinaries[3].id, categoryId: categories[1].id },
      { culinaryId: culinaries[3].id, categoryId: categories[3].id },
      { culinaryId: culinaries[3].id, categoryId: categories[4].id },

      // Nasi Goreng - Savory, Street Food
      { culinaryId: culinaries[4].id, categoryId: categories[2].id },
      { culinaryId: culinaries[4].id, categoryId: categories[4].id },

      // Gado-Gado - Vegetarian, Savory, Traditional
      { culinaryId: culinaries[5].id, categoryId: categories[5].id },
      { culinaryId: culinaries[5].id, categoryId: categories[2].id },
      { culinaryId: culinaries[5].id, categoryId: categories[3].id },

      // Bebek Betutu - Spicy, Traditional, Savory
      { culinaryId: culinaries[6].id, categoryId: categories[0].id },
      { culinaryId: culinaries[6].id, categoryId: categories[3].id },
      { culinaryId: culinaries[6].id, categoryId: categories[2].id },

      // Coto Makassar - Traditional, Savory
      { culinaryId: culinaries[7].id, categoryId: categories[3].id },
      { culinaryId: culinaries[7].id, categoryId: categories[2].id },

      // Es Teh Manis - Sweet, Street Food
      { culinaryId: culinaries[8].id, categoryId: categories[1].id },
      { culinaryId: culinaries[8].id, categoryId: categories[4].id },

      // Martabak Manis - Sweet, Street Food
      { culinaryId: culinaries[9].id, categoryId: categories[1].id },
      { culinaryId: culinaries[9].id, categoryId: categories[4].id },
    ];

    await db.insert(culinaryCategory).values(culinaryCategories);
    console.log(`✅ Created ${culinaryCategories.length} culinary-category links`);

    // 5. Seed Recipes
    console.log("\n👨‍🍳 Seeding recipes...");
    const recipes = [
      {
        id: nanoid(),
        name: "Authentic Padang Rendang",
        description:
          "Traditional Minangkabau slow-cooked beef rendang recipe that takes hours to perfect. The result is tender, flavorful meat in a rich, dark sauce.",
        ingredients: `- 1 kg beef (chuck or round), cut into 5cm cubes
- 400ml coconut milk
- 200ml thick coconut cream
- 5 shallots, minced
- 4 cloves garlic, minced
- 3 red chilies
- 2 stalks lemongrass, bruised
- 4 kaffir lime leaves
- 3cm galangal, sliced
- 2cm turmeric, minced
- 2 tbsp tamarind juice
- 2 tbsp palm sugar
- Salt to taste`,
        steps: `1. Grind shallots, garlic, chilies, galangal, and turmeric into a smooth paste
2. Mix beef with spice paste, lemongrass, lime leaves, and coconut milk in a large pot
3. Cook on medium heat, stirring occasionally, until the sauce comes to a boil
4. Reduce heat to low and simmer for 2-3 hours, stirring every 30 minutes
5. Add coconut cream, tamarind juice, palm sugar, and salt
6. Continue cooking until sauce thickens and darkens to a deep brown color
7. Keep stirring to prevent burning as the sauce reduces
8. Cook until oil separates from the sauce and beef is very tender
9. Adjust seasoning to taste
10. Serve hot with steamed rice`,
        culinaryId: culinaries[0].id,
      },
      {
        id: nanoid(),
        name: "Classic Chicken Satay",
        description:
          "Juicy grilled chicken skewers marinated in aromatic spices, served with rich peanut sauce. Perfect for parties or family gatherings.",
        ingredients: `For the satay:
- 500g chicken breast, cut into cubes
- 3 tbsp sweet soy sauce (kecap manis)
- 2 cloves garlic, minced
- 1 tsp coriander powder
- 1/2 tsp cumin powder
- Bamboo skewers, soaked in water

For the peanut sauce:
- 200g roasted peanuts, ground
- 3 cloves garlic
- 3 red chilies
- 2 tbsp sweet soy sauce
- 1 tbsp lime juice
- 200ml water
- Salt and sugar to taste`,
        steps: `1. Mix chicken with sweet soy sauce, garlic, coriander, and cumin
2. Marinate for at least 2 hours in the refrigerator
3. Thread chicken pieces onto soaked bamboo skewers
4. For peanut sauce, blend garlic and chilies into paste
5. Cook the paste in oil until fragrant
6. Add ground peanuts, sweet soy sauce, and water
7. Simmer until sauce thickens, add lime juice, salt, and sugar
8. Grill satay over charcoal or BBQ until cooked and slightly charred
9. Turn frequently to ensure even cooking
10. Serve hot with peanut sauce, sliced cucumber, and rice cakes`,
        culinaryId: culinaries[1].id,
      },
      {
        id: nanoid(),
        name: "Traditional Yogyakarta Gudeg",
        description:
          "Sweet and savory young jackfruit stew, a signature dish from Yogyakarta that requires patience and traditional cooking methods.",
        ingredients: `- 1 kg young jackfruit (nangka muda), cut into pieces
- 400ml coconut milk
- 5 hard-boiled eggs
- 10 shallots, sliced
- 6 cloves garlic, sliced
- 5 bay leaves
- 3 salam leaves
- 2 stalks lemongrass
- 3cm galangal
- 200g palm sugar
- 1 tsp coriander seeds
- Salt to taste
- Water as needed`,
        steps: `1. Boil jackfruit pieces until tender, drain and set aside
2. Grind coriander seeds into powder
3. Heat coconut milk with all spices, bay leaves, and salam leaves
4. Add palm sugar and stir until dissolved
5. Add boiled jackfruit and hard-boiled eggs
6. Cook on very low heat for 4-6 hours, stirring occasionally
7. Add more coconut milk as needed to prevent drying
8. The gudeg is ready when it turns dark brown and sweet
9. Adjust seasoning with salt
10. Serve with steamed rice, chicken, and sambal goreng krecek`,
        culinaryId: culinaries[2].id,
      },
      {
        id: nanoid(),
        name: "Refreshing Es Cendol",
        description:
          "Cool and sweet beverage perfect for hot tropical days. The combination of pandan jelly, coconut milk, and palm sugar creates a delightful treat.",
        ingredients: `For the cendol:
- 100g rice flour
- 25g tapioca flour
- 400ml pandan water (blend pandan leaves with water and strain)
- 1/4 tsp salt
- Ice water bath

For serving:
- 200ml coconut milk
- 150g palm sugar (gula merah)
- 100ml water
- Ice cubes
- Jackfruit pieces (optional)`,
        steps: `1. Mix rice flour, tapioca flour, pandan water, and salt in a pot
2. Cook over medium heat, stirring constantly until mixture thickens
3. Press the mixture through a cendol mold into ice water bath
4. Drain and set aside
5. Boil palm sugar with water until dissolved and syrupy
6. To serve, place cendol jelly in a glass
7. Add ice cubes and jackfruit pieces if using
8. Pour palm sugar syrup over the cendol
9. Top with coconut milk
10. Serve immediately with a spoon and straw`,
        culinaryId: culinaries[3].id,
      },
      {
        id: nanoid(),
        name: "Indonesian Fried Rice (Nasi Goreng)",
        description:
          "The beloved Indonesian fried rice with aromatic spices and sweet soy sauce. Simple yet incredibly flavorful.",
        ingredients: `- 3 cups cooked rice (day-old rice works best)
- 3 cloves garlic, minced
- 4 shallots, sliced
- 2 red chilies
- 2 tbsp sweet soy sauce (kecap manis)
- 1 tbsp regular soy sauce
- 1 tsp shrimp paste (terasi), optional
- 2 eggs
- 100g chicken or shrimp
- 2 tbsp oil
- Salt and pepper to taste
- Fried shallots for garnish`,
        steps: `1. Grind garlic, shallots, chilies, and shrimp paste into paste
2. Heat oil in a wok over high heat
3. Fry the spice paste until fragrant
4. Add chicken or shrimp, cook until done
5. Push everything to the side, crack eggs into the wok
6. Scramble the eggs, then mix with other ingredients
7. Add rice, breaking up any clumps
8. Pour sweet soy sauce and regular soy sauce over rice
9. Stir-fry everything together on high heat
10. Season with salt and pepper, garnish with fried shallots
11. Serve with fried egg on top, crackers, and pickles`,
        culinaryId: culinaries[4].id,
      },
    ];

    await db.insert(recipe).values(recipes);
    console.log(`✅ Inserted ${recipes.length} recipes`);

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Provinces: ${provinces.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Culinaries: ${culinaries.length}`);
    console.log(`   - Recipes: ${recipes.length}`);
    console.log(`   - Category Links: ${culinaryCategories.length}`);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    throw error;
  } finally {
    await queryClient.end();
    console.log("\n👋 Database connection closed");
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("\n🎉 Seeding script finished successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding script failed:", error);
    process.exit(1);
  });

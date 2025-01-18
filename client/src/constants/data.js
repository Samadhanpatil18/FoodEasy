import carousel1 from '../assets/videos/carousel1.mp4'
import carousel2 from '../assets/videos/carousel2.mp4'
import carousel3 from '../assets/videos/carousel3.mp4'
import carousel4 from '../assets/videos/carousel4.mp4'
import carousel5 from '../assets/videos/carousel5.mp4'
import samadhanphoto from '/src/assets/images/foodeasy.png'


export const navLinks = [
    {
        text : "Home",
        icon : "fa-solid fa-house",
        url : "/"
    },
    {
        text : "Menu",
        icon : "fa-regular fa-calendar-minus",
        url : "/menu"
    },
    {
        text : "About",
        icon : "fa-solid fa-circle-question",
        url : "/about"
    },
    {
        text : "Contact",
        icon : "fa-solid fa-user",
        url : "#contact"
    },
]

export const heroContent = {
    title : "Your Favorite Dishes, Just a Click Away!",
    subTitle : "Freshly prepared meals, quick delivery, and flavors that make every bite unforgettable.",
    btnText : "Explore Menu"
}

export const iconicDishes = [
    {
        title : "Mutton Biriyani",
        image_url : "https://leyaana.com/wp-content/uploads/2022/04/fdf3-scaled.jpeg"
    },
    {
        title : "Japn Chicken",
        image_url : "https://www.yummytummyaarthi.com/wp-content/uploads/2023/05/IMG_6965-1024x683.jpg"
    },
    {
        title : "Tender Coconut Payasam",
        image_url : "https://www.nestleprofessional.in/sites/default/files/2022-07/Elaneer-Payasam.jpg"
    },
    {
        title : "Mutton Rogan Josh",
        image_url : "https://img.freepik.com/premium-photo/aromatic-feast-mutton-rogan-josh-with-naan-indian-culinary-delight_896558-35674.jpg"
    },
    {
        title : "Baklawa",
        image_url : "https://falasteenifoodie.com/wp-content/uploads/2023/02/walnut-baklava-recipe.jpeg"
    },
    {
        title : "Dream Cake",
        image_url : "https://bkmedia.bakingo.com/chocolate-dream-cake-cake3750drea-C.jpg"
    },
    {
        title : "Bisi Bele Bath",
        image_url : "https://www.archanaskitchen.com//images/archanaskitchen/Indian_Rice/Barnyard_millet_bisi_belle_bhaat_recipe_healthy_vegetarian-1.jpg"
    },
    {
        title : "Panna kotta",
        image_url : "https://www.allrecipes.com/thmb/NlP50cO2BjJdN4uGvl5JhW0Rx2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72567-Panna-cotta-ddmfs-4x3-14ae724a2a8e4ca3a79c5e27b2b61994.jpg"
    }
]

export const hightlightsSlides = [
    {
      id: 1,
      textLists: [
        "Sizzle and Serve Perfection!",
        "Premium Cuts, Ultimate Taste!",
      ],
      video: carousel1,
      videoDuration: 6,
    },
    {
      id: 2,
      textLists: ["Farm-Fresh Ingredients for Every Dish!", "Fresh Ingredients, Masterful Cooking"],
      video: carousel2,
      videoDuration: 6,
    },
    {
      id: 3,
      textLists: [
        "Master Chefs at Work!",
        "Crafting Culinary Excellence",
      ],
      video: carousel3,
      videoDuration: 5,
    },
    {
      id: 4,
      textLists: ["Bringing Flavor to Your Table!", "Experience the Art of Fine Cooking"],
      video: carousel4,
      videoDuration: 5,
    },
    {
      id: 5,
      textLists: ["Savor the Process, Taste the Difference"],
      video: carousel5,
      videoDuration: 3,
    },
];

export const foodCuisines = [
    {
        title : "South Indian",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fs-india.jpg?alt=media&token=43229dfe-a700-4ba6-9763-6da585b0d8ee"
    },
    {
        title : "North Indian",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fn-india.jpg?alt=media&token=07ea1606-9733-410a-a93e-3e4ed91f7c4f"
    },
    {
        title : "Chinese",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fchinese.jpg?alt=media&token=6429e39a-a3da-4888-9572-464610373610"
    },
    {
        title : "Italian",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fitalian.jpg?alt=media&token=ae09f4a3-4fe0-4f87-833c-b2788bbde90d"
    },
]

export const foodCategories = [
    {
        title : "Meals",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fmeals.jpg?alt=media&token=7ce30581-9779-499b-b948-74e46d1709f3"
    },
    {
        title : "Light Meals",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Flight-meals.jpg?alt=media&token=09e1a81d-c3d6-4531-8e75-24dd5528aa97"
    },
    {
        title : "Side Dishes",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fside-dish.jpg?alt=media&token=8ef5c830-857e-4312-b39e-28cfd1b0c6ea"
    },
    {
        title : "Starters",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fstarter.jpg?alt=media&token=6f6d22c4-1519-4112-be11-780873cc7aeb"
    },
    {
        title : "Desserts",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fdessert.jpg?alt=media&token=60bc3e0e-763c-4f97-8be5-57b99b8ea4b5"
    },
    {
        title : "Snacks",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fsnacks.avif?alt=media&token=222ecae7-776f-49a1-9e8b-e13ab5a4e40f"
    },
    {
        title : "Juice & MilkShakes",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fjuice.jpg?alt=media&token=d451a6e7-91de-4902-a902-c2765e8bdc20"
    }
]

export const socialLinks = [
    {
        icon : "fa-brands fa-github",
        url : "https://github.com/Samadhanpatil18"
    },
    {
        icon : "fa-brands fa-linkedin",
        url : "https://www.linkedin.com/in/samadhan-patil18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
   
]

export const filterCategories = [
    {
        text : "Main Course",
        val : "Main-course",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fmeals.jpg?alt=media&token=7ce30581-9779-499b-b948-74e46d1709f3"
    },
    {
        text : "Light Meals",
        val : "Light-Meals",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Flight-meals.jpg?alt=media&token=09e1a81d-c3d6-4531-8e75-24dd5528aa97"
    },
    {
        text : "Side Dishes",
        val : "Side-Dish",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fside-dish.jpg?alt=media&token=8ef5c830-857e-4312-b39e-28cfd1b0c6ea"
    },
    {
        text : "Starters",
        val : "Starter",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fstarter.jpg?alt=media&token=6f6d22c4-1519-4112-be11-780873cc7aeb"
    },
    {
        text : "Desserts",
        val : "Dessert",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fdessert.jpg?alt=media&token=60bc3e0e-763c-4f97-8be5-57b99b8ea4b5"
    },
    {
        text : "Snacks",
        val : "Snack",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fsnacks.avif?alt=media&token=222ecae7-776f-49a1-9e8b-e13ab5a4e40f"
    },
    {
        text : "Juices",
        val : "Drink",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/food-categories%2Fjuice.jpg?alt=media&token=d451a6e7-91de-4902-a902-c2765e8bdc20"
    }
]

export const aboutFounder = {
    name : "Samadhan Patil",

    image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/chefs%2Ffounder.jpeg?alt=media&token=8806e839-4e86-488b-9bc3-39c1ebe5d609"
}

export const aboutAmbiance = {
    text : "Our restaurant offers a tranquil dining experience near the beach, where you can enjoy the natural, peaceful ambiance with the option of AC dining. We take pride in our fast and efficient service, ensuring that your food is served promptly. Our commitment to cleanliness is reflected in our cooking methods, and we use only the freshest meats and vegetables to prepare each dish, delivering a wholesome and delightful culinary experience.",
    image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/chefs%2Frestaurant-mm.jpg?alt=media&token=2af5f24b-742f-46aa-9790-9d1eaf431b76"
}

export const expertChefs = [
    {
        name : "Stephen Flaming E",
        description : "Chinies and Italian Dish Expert",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/chefs%2Fchef1.jpg?alt=media&token=80e4aac2-5b57-4b5c-97ae-51017e27409d"
    },
    {
        name : "Ramachandran K",
        description : "Indian Cuisine Expert",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/chefs%2Fchef2.jpg?alt=media&token=fe32c160-660c-40e4-9e97-2368a04f54ea"
    },
    {
        name : "Finn Allen A",
        description : "Deserts and Sweet Expert",
        image_url : "https://firebasestorage.googleapis.com/v0/b/auth-f14b7.appspot.com/o/chefs%2Fchef3.jpg?alt=media&token=8555ec3d-17c1-439f-b249-0adda0b308aa"
    },
]

export function discountedPrice (price, discount) {
    return price - Math.round(price/discount);
}

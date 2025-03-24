import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { RecoverPasswordForm } from "./components/RecoverPasswordForm/RecoverPasswordForm";
import { BeehiveList } from "./pages/BeehiveList/BeehiveList";

const resources = {
  es: {
    translation: {
      // General
      loading: "Cargando...",
      error: "Error",
      save: "Guardar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar",
      view_more: "Ver más",
      add: "Añadir",
      back: "Volver",
      confirm: "Confirmar",
      no_image: "No hay imagen disponible",

      // Navegación
      our_store: "Nuestra tienda",
      our_beehives: "Nuestras colmenas",
      workshops_visits: "Cursos y talleres",
      sponsor_beehive: "Apoya una colmena",

      //loginform
      login_title: "Iniciar sesión",
      login_button: "Iniciar sesión",
      enter_email: "Introduce tu email",
      enter_password: "Introduce tu contraseña",
      forgot_password: "¿Olvidaste tu contraseña?",
      no_account: "¿No tienes una cuenta?",
      register_link: "Regístrate",

      // Hero
      hero_title: "Con la miel en los labios",
      hero_subtitle: "Endulza tu vida, salva las abejas",

      // Contacto
      contact_title: "Contáctanos",
      contact_subtitle: "¡Estamos para ayudarte!",
      name: "Nombre",
      last_name: "Apellido",
      email: "Correo electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      send: "Enviar",

      // CategoryList
      categories: "Categorías",
      add_category: "Agregar Categoría",
      edit_category: "Editar Categoría",
      category_name_placeholder: "Nombre de la categoría",
      loading_categories: "Cargando categorías...",
      no_categories: "No hay categorías disponibles",
      actions: "Acciones",
      update: "Actualizar",

      // ExpandableOrder
      products: "productos",
      quantity: "Cantidad",
      pending: "Pendiente",
      canceled: "Cancelado",
      completed: "Completado",

      // Footer
      home: "Inicio",
      follow_us_instagram: "¡Síguenos en Instagram!",
      terms_conditions: "Términos y condiciones",
      privacy_policy: "Políticas de privacidad",

      // Navbar
      profile: "Perfil",
      my_orders: "Mis pedidos",
      my_subscriptions: "Mis suscripciones",
      logout: "Cerrar sesión",

      //navbaradmin
      admin_products: "Productos",
      admin_categories: "Categorías",
      admin_users: "Usuarios",
      admin_subscriptions: "Suscripciones",
      admin_beehives: "Colmenas",
      admin_sales: "Ventas",

      // Profile
      your_profile: "Tu perfil",

      // UpdateProfileForm
      password: "Contraseña",
      confirm_password: "Repetir contraseña",
      address: "Dirección",
      city: "Ciudad",
      province: "Provincia",
      zipcode: "Código Postal",
      save_changes: "Guardar cambios",
      edit_profile: "Editar perfil",

      //RecoverPasswordForm
      recover_password_title: "Recuperar contraseña",
      recover_password_button: "Recuperar contraseña",
      recover_password_message:
        "Si tu correo está registrado en nuestros sistemas, recibirás un correo con tu nueva contraseña. La podrás cambiar cuando quieras desde tu perfil de usuario.",

      //registerForm
      register_title: "Registrarse",
      register_button: "Registrar",
      register_validation_message:
        "Para poder usar tu cuenta antes tienes que verificarla. Revisa tu correo electrónico.",
      form_error: "Corrige los errores del formulario",
      close: "Cerrar",
      profile_image: "Imagen de perfil",

      password_conditions_title: "La contraseña debe tener:",
      password_min_length: "8 o más caracteres",
      password_uppercase: "Una letra mayúscula",
      password_lowercase: "Una letra minúscula",
      password_number: "Un número",
      password_special: "Un carácter especial",

      placeholder_name: "Introduce tu nombre",
      placeholder_lastname: "Introduce tu apellido",
      placeholder_email: "Introduce tu email",
      placeholder_phone: "Número de teléfono",
      placeholder_city: "Introduce tu ciudad",
      placeholder_province: "Introduce tu provincia",
      placeholder_address: "Introduce tu dirección",
      placeholder_zipcode: "Introduce tu código postal",

      //SubscriptionCards
      most_selected: "Más elegido",
      per_month: "/mes",
      sponsor_now: "Quiero apadrinar",

      //BeehiveList
      beehives: "Colmenas",
      add_beehive: "Agregar Colmena",
      edit_beehive: "Editar Colmena",
      beehive_name: "Nombre de la colmena",
      beehive_short_description: "Descripción corta",
      beehive_large_description: "Descripción larga de la colmena",
      select_image: "Seleccionar imagen",
      current_images: "Imágenes actuales",
      loading_beehives: "Cargando colmenas...",
      error_loading_beehives: "Error al cargar las colmenas",
      error_create_beehive: "Error al crear la colmena",
      error_update_beehive: "Error al actualizar la colmena",
      error_delete_beehive: "Error al eliminar la colmena",
      error_delete_image: "Error al eliminar la imagen",
      error_fields_required: "Por favor, completa todos los campos",
      no_beehives: "No hay colmenas disponibles",

      //beehivesview
      bees_importance:
        "Las abejas son esenciales para la vida en el planeta. Son las principales responsables de la polinización, un proceso que permite la reproducción de muchas plantas y cultivos que forman parte de nuestra alimentación. Sin ellas, la biodiversidad y la producción de alimentos estarían en peligro. Sin embargo, el uso de pesticidas, la deforestación y el cambio climático amenazan su existencia. Proteger a las abejas es proteger el equilibrio del ecosistema y nuestra propia supervivencia. 🌿🐝",

      //CategoryList
      error_loading_categories: "Error al obtener las categorías",
      error_saving_category: "Error al guardar la categoría",
      error_deleting_category: "Error al eliminar la categoría",

      //apadrinasection
      sponsorship_subtitle:
        "Elige entre nuestros planes de apadrinamiento y contribuye a la conservación de las abejas",
      error_fetching_sponsorships:
        "Error al obtener los planes de apadrinamiento.",

      //colmenassection
      some_beehives: "Algunas de nuestras colmenas",
      sponsor_message:
        "Estas colmenas son parte de nuestra comunidad, puedes apadrinar una de ellas con nosotros",
      view_all: "Ver todas",

      //contactosection
      contact_description:
        "¿Tienes alguna pregunta, sugerencia o simplemente quieres saber más sobre nuestros talleres y servicios? No dudes en ponerte en contacto con nosotros. Estamos encantados de escucharte y ayudarte en todo lo que necesites.",

      //contactForm
      contact_success: "Email enviado correctamente.",
      contact_submit_error:
        "Error al enviar el formulario. Inténtalo de nuevo.",
      contact_error_required: "Por favor, completa todos los campos.",
      placeholder_message: "¿Qué nos quieres decir?",

      //reservaTuVisitaSection
      experience_title: "Vive la experiencia de ser apicultor",
      experience_description:
        "Descubre el mundo de las abejas y participa en nuestras actividades educativas",
      book_visit: "Reserva tu visita",

      //talleresSection
      workshop_title: "Talleres educativos",
      workshop_intro:
        "En nuestro compromiso por fomentar la conciencia ambiental y el conocimiento sobre la importancia de las abejas en nuestro ecosistema, ofrecemos charlas educativas diseñadas especialmente para colegios y centros de estudios. Nuestras charlas están impartidas por expertos en apicultura y están adaptadas a diferentes niveles educativos, desde primaria hasta secundaria.",
      workshop_students_learn:
        "Durante estas sesiones, los estudiantes aprenderán sobre:",
      workshop_point_pollination:
        "El papel crucial de las abejas en la polinización y la biodiversidad.",
      workshop_point_challenges:
        "Los desafíos que enfrentan las abejas y cómo podemos ayudar a protegerlas.",
      workshop_point_honey_process:
        "El proceso de producción de la miel y otros productos de la colmena.",
      workshop_point_sustainability:
        "La importancia de la apicultura sostenible.",
      workshop_extra_info:
        "Además, las charlas pueden incluir demostraciones prácticas y material didáctico para una experiencia más interactiva y enriquecedora.",
      additional_info: "Información adicional",
      duration: "Duración",
      duration_info:
        "Las charlas tienen una duración aproximada de 1 a 2 horas, dependiendo del nivel educativo y las necesidades del centro.",
      materials: "Materiales",
      materials_info:
        "Proporcionamos todo el material necesario, incluyendo presentaciones, folletos informativos y, en algunos casos, muestras de productos apícolas.",
      flexibility: "Flexibilidad",
      flexibility_info:
        "Nos adaptamos a los horarios y necesidades específicas de cada centro educativo.",
      request_more_info: "Solicitar más información",

      //tiendaSection
      our_products: "Nuestros productos",
      explore_beekeeping_products:
        "Explora nuestra selección de productos relacionados con la apicultura",
      view_store: "Ver toda la tienda",

      //beehiveindividual
      beehive_loading: "Cargando detalles de la colmena...",
      beehive_not_found: "No se encontró la colmena",
      back_to_beehives: "Volver a todas las colmenas",
      bee_description: "Descripción",
      beehive_error_loading: "Error al cargar la colmena",

      //productdetail
      error_fetching_product: "Error al obtener el producto",
      product_not_found: "Producto no encontrado",
      add_to_cart: "Añadir al carrito",
      related_products: "Otros productos que podrían interesarte",

      //products
      title: "Title",
      description: "Description",
      price: "Price",
      category_id: "Category ID",
      create_product: "Create Product",
      edit_product: "Edit Product",
      error_fetching_products: "Error fetching products",
      error_creating_product: "Error creating product",
      error_editing_product: "Error editing product",
      error_deleting_product: "Error deleting product",

      //Sales
      sales_history: "Historial de Ventas",
      purchase_id: "Compra ID",
      complete: "Completar",
      no_orders: "No hay pedidos",
      error_fetching_sales: "Error al obtener las ventas",
      error_deleting_sale: "Error al eliminar la venta",
      error_updating_sale_status: "Error al modificar el estado de la venta",

      //ShoppingCart
      cart: "Carrito",
      cart_empty: "El carrito está vacío.",
      remove: "Eliminar",
      invalid_product: "Producto no válido",
      cart_total: "Total del carrito",
      subtotal: "Subtotal",
      shipping: "Envío",
      total: "Total",
      checkout: "Finaliza tu compra",
      clear_cart: "Vaciar Carrito",

      //SponsorColmena
      make_difference: "¡HAZ LA DIFERENCIA!",
      sponsor_and_save: "Apadrina una colmena y salva abejas",
      sponsor_description:
        "Disfruta de miel exclusiva, ayuda a la biodiversidad y vive una experiencia única en el campo",
      sponsorships_error: "Error al obtener los planes de apadrinamiento.",
      beehives_images_error: "Error al obtener las imágenes de las colmenas.",
      client_opinions_title:
        "Las opiniones de nuestros clientes son muy importantes",

      //SponsorColmenaConfirmation
      sponsor_confirmation_title: "Confirmación de patrocinio",
      sponsor_confirmation_subtitle: "¡Gracias por patrocinar nuestra colmena!",
      error_fetching_beehive: "Error al obtener los datos de la colmena.",
      learn_more: "Saber más",

      //SponsorColmenaType
      error_fetching_plan: "Error al obtener el plan de apadrinamiento.",
      must_login_to_sponsor: "Debes iniciar sesión para apadrinar.",
      payment_error: "Error al realizar el pago.",
      assigned_beehive_info:
        "Se te asignará una colmena de las disponibles para apadrinar. Disfruta de los beneficios de tu elección y apoya la conservación de las abejas.",

      //sponsorships
      subscriptions: "Suscripciones",
      subscription_type: "Tipo de Suscripción",
      start_date: "Fecha de Inicio",
      user_name: "Nombre del Usuario",
      status: "Estado",
      action: "Acción",
      active: "Activa",
      inactive: "Inactiva",
      error_fetching_subscriptions: "Error al obtener las suscripciones",

      //Store
      store_title: "Descubre el sabor y la magia de la apicultura",
      store_description:
        "Explora nuestra tienda y lleva contigo un pedazo de la naturaleza. Encuentra miel pura, accesorios ecológicos y más. Cada compra apoya la apicultura sostenible.",
      search_products: "Buscar productos...",
      all: "Todos",
      sort_by: "Ordenar por",
      select_option: "Selecciona una opción",
      price_low_high: "Precio: Menor a Mayor",
      price_high_low: "Precio: Mayor a Menor",
      name_az: "Nombre: A - Z",
      name_za: "Nombre: Z - A",
      no_products: "No hay productos disponibles.",
      error_fetching_products_categories:
        "Error al obtener los productos o categorías",

      //TalleresForm
      workshops: {
        hero_alt: "Apicultor enseñando",
        title: "Talleres y visitas guiadas",
        subtitle: "Inspira a los niños a ser guardianes de la naturaleza",
        description_part1: "En",
        description_part2:
          "ofrecemos talleres interactivos para escuelas y grupos educativos. Nuestro objetivo es enseñar a los niños la importancia de las abejas y cómo proteger nuestro medio ambiente.",
        offers_title: "¿Qué ofrecemos?",
        offer1: "Talleres interactivos y prácticos",
        offer2: "Aprendizaje sobre abejas, polinización y biodiversidad",
        offer3:
          "Materiales educativos y actividades en el aula o en la naturaleza",
        benefits_title: "Beneficios",
        benefit1: "Conciencia ambiental",
        benefit2: "Curiosidad científica",
        benefit3: "Responsabilidad hacia la naturaleza",
        contact_prompt:
          "¿Quieres más información? ¡Contáctanos y planificamos un taller para tu escuela!",
      },

      //UserManagement
      user_management: {
        title: "Usuarios",
        id: "ID",
        name: "Nombre",
        email: "Correo electrónico",
        status: "Estado",
        action: "Acción",
        banned: "Baneado",
        active: "Activo",
        activate: "Activar",
        deactivate: "Desactivar",
        fetch_error: "Error al obtener usuarios",
        update_error: "Error al actualizar el estado del usuario",
        invalid_data: "Error: Datos inválidos",
      },

      //VerifyEmail
      email_verified: "Email verificado correctamente",
      back_to_home: "Volver al inicio",
    },
  },
  en: {
    translation: {
      // General
      loading: "Loading...",
      error: "Error",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      view_more: "View more",
      add: "Add",
      back: "Back",
      confirm: "Confirm",
      no_image: "No image available",

      // Navigation
      our_store: "Our Store",
      our_beehives: "Our Beehives",
      workshops_visits: "Workshops & Visits",
      sponsor_beehive: "Sponsor a Beehive",

      // Hero
      hero_title: "With honey on our lips",
      hero_subtitle: "Sweeten your life, save the bees",

      // Contact
      contact_title: "Contact Us",
      contact_subtitle: "We're here to help you!",
      name: "Name",
      last_name: "Last name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      send: "Send",

      // CategoryList
      categories: "Categories",
      add_category: "Add Category",
      edit_category: "Edit Category",
      category_name_placeholder: "Category name",
      loading_categories: "Loading categories...",
      no_categories: "No categories available",
      actions: "Actions",
      update: "Update",

      // ExpandableOrder
      products: "products",
      quantity: "Quantity",
      pending: "Pending",
      canceled: "Canceled",
      completed: "Completed",

      // Footer
      home: "Home",
      follow_us_instagram: "Follow us on Instagram!",
      terms_conditions: "Terms and conditions",
      privacy_policy: "Privacy policy",

      // Navbar
      profile: "Profile",
      my_orders: "My Orders",
      my_subscriptions: "My Subscriptions",
      logout: "Log out",

      // Profile
      your_profile: "Your profile",

      // UpdateProfileForm
      password: "Password",
      confirm_password: "Repeat password",
      address: "Address",
      city: "City",
      province: "Province",
      zipcode: "ZIP Code",
      save_changes: "Save changes",
      edit_profile: "Edit profile",

      //loginform
      login_title: "Log in",
      login_button: "Log in",
      enter_email: "Enter your email",
      enter_password: "Enter your password",
      forgot_password: "Forgot your password?",
      no_account: "Don't have an account?",
      register_link: "Sign up",

      //navbaradmin
      admin_products: "Products",
      admin_categories: "Categories",
      admin_users: "Users",
      admin_subscriptions: "Subscriptions",
      admin_beehives: "Beehives",
      admin_sales: "Sales",

      //RecoverPasswordForm
      recover_password_title: "Recover password",
      recover_password_button: "Recover password",
      recover_password_message:
        "If your email is registered in our system, you will receive a message with a new password. You can change it anytime from your user profile.",

      //registerForm
      register_title: "Sign up",
      register_button: "Register",
      register_validation_message:
        "To use your account, please verify it first. Check your email inbox.",
      form_error: "Please fix the form errors",
      close: "Close",
      profile_image: "Profile image",

      password_conditions_title: "The password must contain:",
      password_min_length: "8 or more characters",
      password_uppercase: "An uppercase letter",
      password_lowercase: "A lowercase letter",
      password_number: "A number",
      password_special: "A special character",

      placeholder_name: "Enter your name",
      placeholder_lastname: "Enter your last name",
      placeholder_email: "Enter your email",
      placeholder_phone: "Phone number",
      placeholder_city: "Enter your city",
      placeholder_province: "Enter your province",
      placeholder_address: "Enter your address",
      placeholder_zipcode: "Enter your ZIP code",

      //SubscriptionCards
      most_selected: "Most selected",
      per_month: "/month",
      sponsor_now: "Sponsor now",

      //BeehiveList
      beehives: "Beehives",
      add_beehive: "Add Beehive",
      edit_beehive: "Edit Beehive",
      beehive_name: "Beehive name",
      beehive_short_description: "Short description",
      beehive_large_description: "Long description",
      select_image: "Select image",
      current_images: "Current images",
      loading_beehives: "Loading beehives...",
      error_loading_beehives: "Error loading beehives",
      error_create_beehive: "Error creating beehive",
      error_update_beehive: "Error updating beehive",
      error_delete_beehive: "Error deleting beehive",
      error_delete_image: "Error deleting image",
      error_fields_required: "Please complete all fields",
      no_beehives: "No beehives available",

      //beehivesview
      bees_importance:
        "Bees are essential for life on the planet. They are the main pollinators, enabling the reproduction of many plants and crops that are part of our diet. Without them, biodiversity and food production would be in danger. However, the use of pesticides, deforestation, and climate change threaten their existence. Protecting bees means protecting the balance of the ecosystem and our own survival. 🌿🐝",

      //CategoryList
      error_loading_categories: "Error loading categories",
      error_saving_category: "Error saving category",
      error_deleting_category: "Error deleting category",

      //apadrinasection
      sponsorship_subtitle:
        "Choose from our sponsorship plans and contribute to the preservation of bees",
      error_fetching_sponsorships: "Error fetching sponsorship plans.",

      //colmenassection
      some_beehives: "Some of our beehives",
      sponsor_message:
        "These beehives are part of our community, and you can sponsor one of them with us",
      view_all: "View all",

      //contactosection
      contact_description:
        "Do you have any questions, suggestions, or just want to know more about our workshops and services? Don’t hesitate to get in touch with us. We’re happy to hear from you and help in any way we can.",

      //contactForm
      contact_success: "Email sent successfully.",
      contact_submit_error: "Error submitting the form. Please try again.",
      contact_error_required: "Please fill out all fields.",
      placeholder_message: "What would you like to tell us?",

      //reservaTuVisitaSection
      experience_title: "Live the experience of being a beekeeper",
      experience_description:
        "Discover the world of bees and take part in our educational activities",
      book_visit: "Book your visit",

      //talleresSection
      workshop_title: "Educational Workshops",
      workshop_intro:
        "As part of our commitment to promoting environmental awareness and knowledge about the importance of bees in our ecosystem, we offer educational talks specially designed for schools and educational centers. These talks are given by beekeeping experts and are adapted to different educational levels, from primary to secondary.",
      workshop_students_learn:
        "During these sessions, students will learn about:",
      workshop_point_pollination:
        "The crucial role of bees in pollination and biodiversity.",
      workshop_point_challenges:
        "The challenges bees face and how we can help protect them.",
      workshop_point_honey_process:
        "The process of honey production and other hive products.",
      workshop_point_sustainability:
        "The importance of sustainable beekeeping.",
      workshop_extra_info:
        "In addition, talks may include hands-on demonstrations and educational materials for a more interactive and enriching experience.",
      additional_info: "Additional Information",
      duration: "Duration",
      duration_info:
        "The talks last approximately 1 to 2 hours depending on the educational level and the needs of the school.",
      materials: "Materials",
      materials_info:
        "We provide all necessary materials, including presentations, brochures, and in some cases, samples of beekeeping products.",
      flexibility: "Flexibility",
      flexibility_info:
        "We adapt to the schedules and specific needs of each educational center.",
      request_more_info: "Request more information",

      //tiendaSection
      our_products: "Our Products",
      explore_beekeeping_products:
        "Explore our selection of beekeeping-related products",
      view_store: "View the full store",

      //beehiveindividual
      beehive_loading: "Loading beehive details...",
      beehive_not_found: "Beehive not found",
      back_to_beehives: "Back to all beehives",
      bee_description: "Description",
      beehive_error_loading: "Error loading beehive",

      //productdetail
      error_fetching_product: "Error fetching product",
      product_not_found: "Product not found",
      add_to_cart: "Add to cart",
      related_products: "Other products you might like",

      //products
      title: "Title",
      description: "Description",
      price: "Price",
      category_id: "Category ID",
      create_product: "Create Product",
      edit_product: "Edit Product",
      error_fetching_products: "Error fetching products",
      error_creating_product: "Error creating product",
      error_editing_product: "Error editing product",
      error_deleting_product: "Error deleting product",

      //Sales
      sales_history: "Sales History",
      purchase_id: "Purchase ID",
      complete: "Complete",
      no_orders: "No orders",
      error_fetching_sales: "Error fetching sales",
      error_deleting_sale: "Error deleting sale",
      error_updating_sale_status: "Error updating sale status",

      //ShappingCart
      cart: "Shopping Cart",
      cart_empty: "Your cart is empty.",
      remove: "Remove",
      invalid_product: "Invalid product",
      cart_total: "Cart Total",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
      checkout: "Checkout",
      clear_cart: "Clear Cart",

      //SponsorColmena
      make_difference: "MAKE A DIFFERENCE!",
      sponsor_and_save: "Sponsor a beehive and save the bees",
      sponsor_description:
        "Enjoy exclusive honey, help biodiversity and experience a unique adventure in the field",
      sponsorships_error: "Error fetching sponsorship plans.",
      beehives_images_error: "Error fetching beehive images.",
      client_opinions_title: "Our customers' opinions are very important",

      //SponsorColmenaConfirmation
      sponsor_confirmation_title: "Sponsorship Confirmation",
      sponsor_confirmation_subtitle: "Thank you for sponsoring our beehive!",
      error_fetching_beehive: "Error fetching beehive data.",
      learn_more: "Learn more",

      //SponsorColmenaType
      error_fetching_plan: "Error fetching sponsorship plan.",
      must_login_to_sponsor: "You must be logged in to sponsor.",
      payment_error: "Error processing payment.",
      assigned_beehive_info:
        "You will be assigned an available beehive to sponsor. Enjoy your benefits and help save the bees.",

      //sponsorships
      subscriptions: "Subscriptions",
      subscription_type: "Subscription Type",
      start_date: "Start Date",
      user_name: "User Name",
      status: "Status",
      action: "Action",
      active: "Active",
      inactive: "Inactive",
      error_fetching_subscriptions: "Error fetching subscriptions",

      //Store
      store_title: "Discover the taste and magic of beekeeping",
      store_description:
        "Explore our store and bring a piece of nature with you. Find pure honey, eco-friendly accessories and more. Every purchase supports sustainable beekeeping.",
      search_products: "Search products...",
      all: "All",
      sort_by: "Sort by",
      select_option: "Select an option",
      price_low_high: "Price: Low to High",
      price_high_low: "Price: High to Low",
      name_az: "Name: A - Z",
      name_za: "Name: Z - A",
      no_products: "No products available.",
      error_fetching_products_categories:
        "Error fetching products or categories",

      //TalleresForm
      workshops: {
        hero_alt: "Beekeeper teaching",
        title: "Workshops and guided visits",
        subtitle: "Inspire children to be guardians of nature",
        description_part1: "At",
        description_part2:
          "we offer interactive workshops for schools and educational groups. Our goal is to teach children the importance of bees and how to protect our environment.",
        offers_title: "What do we offer?",
        offer1: "Interactive and practical workshops",
        offer2: "Learning about bees, pollination, and biodiversity",
        offer3:
          "Educational materials and activities in the classroom or in nature",
        benefits_title: "Benefits",
        benefit1: "Environmental awareness",
        benefit2: "Scientific curiosity",
        benefit3: "Responsibility towards nature",
        contact_prompt:
          "Want more information? Contact us and we’ll plan a workshop for your school!",
      },

      //UserManagement
      user_management: {
        title: "Users",
        id: "ID",
        name: "Name",
        email: "Email",
        status: "Status",
        action: "Action",
        banned: "Banned",
        active: "Active",
        activate: "Activate",
        deactivate: "Deactivate",
        fetch_error: "Error fetching users",
        update_error: "Error updating user status",
        invalid_data: "Error: Invalid data",
      },

      //VerifyEmail
      email_verified: "Email successfully verified",
      back_to_home: "Back to home",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

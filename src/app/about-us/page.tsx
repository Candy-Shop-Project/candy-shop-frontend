const AboutUs = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Welcome to CandyShop</span>
          <span className="block text-indigo-600">
            A Sweet E-commerce Experience
          </span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          I built CandyShop as a personal project to showcase latest web
          technologies like <strong>Next.js</strong> and <strong>React</strong>.
          While it started as a demonstration, I made sure to follow best
          practices so that this app could be friendly and secure for both
          customers and website owners.
        </p>
      </div>

      {/* tech icons */}
      <div className="mt-8 flex justify-center flex-wrap gap-6">
        {/* Next.js */}
        <img src="/images/icon/next.svg" alt="Next.js" className="h-14" />
        {/* React */}
        <img src="/images/icon/react.svg" alt="React" className="h-14" />
        {/* Redux */}
        <img src="/images/icon/redux.svg" alt="Redux" className="h-14" />
        {/* Tailwind */}
        <img
          src="/images/icon/tailwind.svg"
          alt="Tailwind CSS"
          className="h-14"
        />
        {/* Framer motion */}
        <img
          src="/images/icon/framer-motion.svg"
          alt="Framer Motion"
          className="h-14"
        />
        {/* Stripe */}
        <img src="/images/icon/stripe.svg" alt="Stripe" className="h-14" />
        {/* Django */}
        <img src="/images/icon/django.svg" alt="Django" className="h-14" />
        {/* PostgreSQL */}
        <img
          src="/images/icon/postgresql.svg"
          alt="PostgreSQL"
          className="h-14"
        />
        {/* Heroku */}
        <img src="/images/icon/heroku.svg" alt="Heroku" className="h-14" />
        {/* Github */}
        <img src="/images/icon/github-icon.svg" alt="Github" className="h-14" />
      </div>

      <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-indigo-600">Tech Stack</h2>
          <ul className="mt-4 text-gray-700 space-y-3">
            <li>
              <strong>Backend:</strong> Built with Django and connected to a
              PostgreSQL database on Heroku.
            </li>
            <li>
              <strong>Frontend:</strong> Powered by Next.js for server-side
              rendering and styled with Tailwind CSS. FramerMotion for smooth
              animations.
            </li>
            <li>
              <strong>API Requests:</strong> Axios helps keep data interactions
              smooth and efficient.
            </li>
            <li>
              <strong>State Management:</strong> Redux provides a good state
              global management.
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-indigo-600">
            What CandyShop is All About
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CandyShop is a platform I designed to make buying sweet treats like
            chocolates, cakes, beverages and more a breeze. I also wanted to
            ensure that website owners who might not be technical can easily
            manage products without needing to touch the code.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            The admin panel allows owners to add, update, or delete products and
            categories easily. Thanks to Stripe integration, payments are
            handled securely, so customers can shop with confidence.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Built for Everyone</h2>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          I developed this project not just to demonstrate my technical skills
          but to create a tool thats accessible for everyone—from the customer
          browsing products to the website owner managing their inventory. Code
          is available on <strong>GitHub</strong>:
        </p>
        <a
          href="frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline text-lg"
        >
          Frontend
        </a>
        <br />
        <a
          href="frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline text-lg"
        >
          Backend
        </a>
      </div>
    </div>
  );
};

export default AboutUs;

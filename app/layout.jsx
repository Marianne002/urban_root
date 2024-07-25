// app/layout.jsx
import "@styles/globals.css";
import Provider from "@components/Provider";

const layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://use.typekit.net/mvs5bxy.css"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body className="dark-green-bg">
        <Provider>
          <main>{children}</main>
        </Provider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          rel="stylesheet"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
};

export default layout;

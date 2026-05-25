export const metadata = {

  title: "Dungeon Raid",

  description:
    "Seismic Dungeon Game",
};

export default function RootLayout({

  children,

}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );
}

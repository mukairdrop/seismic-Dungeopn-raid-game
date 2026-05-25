export const metadata = {

  title: "Dungeon Raid",

  description:
    "Seismic Dungeon Game"
};

export default function RootLayout({

  children

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );
}

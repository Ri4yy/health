import '../styles/index.css';

export const metadata = {
  title: 'Точка Баланса',
  description: 'Доставка здорового питания',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}

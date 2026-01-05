import Header from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'nulad.dev',
  description: 'Personal website and blog of nulad',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

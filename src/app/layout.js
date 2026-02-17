import RootLayoutContent from "./components/RootLayoutContent";
import "./globals.css";
import { AuthProvider } from "./store/AuthContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}

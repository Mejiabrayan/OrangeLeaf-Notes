import { GeistSans } from 'geist/font/sans';
import Sidebar from '../components/ui/Sidebar';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className='flex flex-col md:flex-row'>
        <Sidebar />
        <main className='flex-1'>{children}</main>
        <Footer />
      </div>
    </>
  );
}

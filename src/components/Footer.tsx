import { ReactNode } from 'react';
import { Container } from './Container';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaX } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList heading="Shop Categories">
            <Link href={'#'}>Phones</Link>
            <Link href={'#'}>Laptops</Link>
            <Link href={'#'}>Desktops</Link>
            <Link href={'#'}>Watches</Link>
            <Link href={'#'}>Tvs</Link>
            <Link href={'#'}>Accessories</Link>
          </FooterList>

          <FooterList heading="Customer Service">
            <Link href={'#'}>Contact Us</Link>
            <Link href={'#'}>Shopping Policy</Link>
            <Link href={'#'}>Returns & Exchanges</Link>
            <Link href={'#'}>FAQs</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold text-base mb-2">About Us</h3>

            <p className="mb-2">
              At our electronics store, we are dedicated to providing the best
              devices and accessories to our customers. With a wide range of
              products, we are sure you will find what you are looking for.
            </p>
            <p>
              &copy; {new Date().getFullYear()} ESHOP. All rights reserved.{' '}
            </p>
          </div>

          <FooterList heading="Follow Us">
            <div className="flex gap-2">
              <Link href={'#'}>
                <FaFacebook className="text-2xl" />
              </Link>
              <Link href={'#'}>
                <FaX className="text-2xl" />
              </Link>
              <Link href={'#'}>
                <FaInstagram className="text-2xl" />
              </Link>
              <Link href={'#'}>
                <FaLinkedin className="text-2xl" />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

function FooterList({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2">
      <h3 className="font-bold text-base mb-2">{heading}</h3>
      {children}
    </div>
  );
}

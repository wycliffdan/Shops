import Container from "../container";
import Link from "next/link";
import FooterList from "./FooterList";

const Footer = () => {
    return ( 
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">

            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-6 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Shop categories</h3>
                        <Link href='#'>tshirts</Link>
                        <Link href='#'>track suits</Link>
                        <Link href='#'>shorts</Link>
                        <Link href='#'>dress</Link>
                        <Link href='#'>jackets</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold ">customer services</h3>
                        <Link href='#'>contact us</Link>
                        <Link href='#'>shipping policy</Link>
                        <Link href='#'>Returns & exchange</Link>
                        <Link href='#'>FAQs</Link>
                     
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">About Us</h3>
                        <p className="mb-2">At our shop store,
                        we are dedicated to providing the latest and greatest clothes
                        to our customers. with a wide selection of clothes, and uniforms
                        </p>
                        <p>&copy; {new Date().getFullYear()} 
                        e-shop. All rights reserved</p>
                    </div>
                    <FooterList>
                    <h3 className="text-base font-bold mb-2">Follow us</h3>
                    <div className="gap-2">
                    <Link href='#'>
                        Facebook 
                        </Link> 
                    <Link href='#'>
                        google 
                        </Link> 
                    <Link href='#'>
                        TikTok
                        </Link> 
                    <Link href='#'>
                        twitter 
                        </Link> 
                    </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
     );
}
 
export default Footer;
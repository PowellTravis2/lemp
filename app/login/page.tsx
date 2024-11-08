import Image from "next/image";
import styles from "../../styles/auth.module.css";
import Link from 'next/link';
import MSFTLogo from '/MSFT.svg';
import InitializeDatabase from "@/components/InitializeDatabase";
export default function login() {
  return (
    <div>
      {/* <InitializeDatabase/> */}
      <button className={styles.EntraID}>
        <div className={styles.entraFloat}>
            <Image src='/MSFT.svg' width={50} height={50} alt="Microsoft Logo"></Image>
            <h3>Login with Microsoft</h3>
        </div>
      </button>
      {/* <Navbar navTarget="home"/> */}
    </div>
  );
}

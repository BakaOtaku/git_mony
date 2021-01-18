import Link from 'next/link'
import { useRouter } from "next/router";

export default function Layout() {

  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a className="nav__name" href="/">
          <img
            src="/logo.png"
            alt="Aman's logo"
            className="logo"
          />
      Gitnony <span>·</span> Open Source grows
    </a>
      </Link>

      <ul>
        <li>
          <Link href="/">
            <a className={router.pathname == "/" ? "nav__link--active" : ""}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/orgregister">
            <a className={router.pathname == "/orgregister" ? "nav__link--active" : ""} href="/orgregister">Org Register</a>
          </Link>
        </li>
        <li>
          <Link href="/claimreward">
            <a className={router.pathname == "/claimreward" ? "nav__link--active" : ""} href="/claimreward">Claim Reward</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
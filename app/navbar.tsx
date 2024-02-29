import createNodeSDK from "./utils/createNodeSDK";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  const cookieStore = cookies();
  const sdk = createNodeSDK();
  const session = cookieStore.get("cbo_short_session");
  let authenticated: boolean;
  try {
    const currentSessionUser = await sdk
      .sessions()
      .getCurrentUser(session?.value ?? "");
    authenticated =
      !!currentSessionUser && currentSessionUser.isAuthenticated();
  } catch {
    authenticated = false;
  }

  return (
    <nav className="fixed left-0 top-0 z-10 flex h-20 w-screen items-center px-5">
      <Link className="font-space-grotesk mr-auto text-3xl font-bold" href="/">
        <Image
          src="/Logo-Light.svg"
          alt="Corbado Logo"
          width={200}
          height={200}
        />
      </Link>
      <ul className="flex items-center gap-x-3">
        {authenticated && (
          <>
            <li>
              <Link
                href="/profile"
                className="rounded-xl bg-blue-700 px-4 py-2 text-lg text-white hover:bg-blue-500"
              >
                Profile
              </Link>
            </li>
          </>
        )}
        {!authenticated && (
          <>
            <li>
              <Link
                href="/login"
                style={{ borderRadius: "1.5rem" }}
                className="rounded-xl border border-blue-700 px-8 py-2 text-lg text-blue-700 hover:border-blue-500 hover:text-blue-500"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                style={{ borderRadius: "1.5rem" }}
                className="rounded-xl border border-blue-700 bg-blue-700 px-8 py-2 text-lg text-white hover:border-blue-500 hover:bg-blue-500"
              >
                Sign up for free
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

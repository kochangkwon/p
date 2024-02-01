'use client';

import React, { useReducer } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDwon, settoggleDropDwon] = useState(false);

  useEffect(() => {
    const setUpProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProvider();
  }, []);

  return (
    <nav className="flex-between w-full flex-center mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Promtopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>

      {/* {alert(session?.user)} */}
      {/* DeskTop Navication  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navication */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => settoggleDropDwon((prev) => !toggleDropDwon)}
            />
            {toggleDropDwon && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdwon_link"
                  onClick={() => settoggleDropDwon(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdwon_link"
                  onClick={() => settoggleDropDwon(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropDwon(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

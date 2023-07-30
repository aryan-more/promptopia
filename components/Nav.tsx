"use client";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const Nav = () => {

    const isLogedIn = true;


    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    const [ToggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();

            setProviders(response)
        }

        setProvider();
    })

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain" />
                <p className="logo_text">Promtopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">

                {isLogedIn
                    ?
                    <div className="flex md:gap-5 gap-3 ">

                        <Link href="/create-prompt" className="black_btn" >Create Post</Link>
                        <button type="button" onClick={() => signOut()} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src="/assets/images/logo.svg" alt="profile" width={37} height={37} />
                        </Link>
                    </div>
                    :
                    <>
                        {providers && Object.values(providers).map(
                            (provider) => (
                                <button type="button" key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            )
                        )}
                    </>

                }
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">

                {isLogedIn
                    ?


                    <div className="flex">

                        <Image src="/assets/images/logo.svg" alt="profile" width={37} height={37} className="rounded-full"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />
                        {ToggleDropDown && (
                            <div className="dropdown">

                                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                                    My Profile
                                </Link>
                                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={
                                        () => {
                                            setToggleDropDown(false);
                                            signOut();
                                        }
                                    }
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    :
                    <>
                        {providers && Object.values(providers).map(
                            (provider) => (

                                <button type="button" key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            )
                        )}
                    </>

                }
            </div>

        </nav>
    )
}

export default Nav
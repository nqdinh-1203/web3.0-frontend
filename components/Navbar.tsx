import React from 'react'

type Props = {}

type ItemProps = {
    title: string;
    classProps?: string;
}

const NavbarItem = ({ title, classProps }: ItemProps) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = (props: Props) => {
    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <h1 className='w-full cursor-pointer text-white text-3xl font-extrabold'>First Web3.0 App</h1>
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {['Market', 'Exchange', "Tutorials", "Wallet"].map((item, index) => (
                    <NavbarItem title={item} key={index} />
                ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2545bd]'>
                    Login
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
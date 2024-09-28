import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Context } from "../context/Context";
import './Navbar.css'; // Assuming you still want to use your custom CSS

import user from "./img/images.jpg";

export default function Navbar() {
    const { isAuthe } = useContext(Context);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Nav items
    const navItems = [
        { to: "/alldoctors", label: "All Doctors" },
        { to: "/specialities", label: "Specialities" },
        { to: "/mentalwellbeing", label: "Mental Wellbeing" },
        { to: "/appointment", label: "Appointment" },
        { to: "/healthscore", label: "Health Score" }
    ];

    const navLinkClass = ({ isActive }) =>
        `text-sm font-semibold relative cursor-pointer ${
            isActive ? "text-dark_theme" : "text-main_theme"
        }`;

    // Mobile menu toggle
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    // Mouse events on dropdown menu
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    return (
        <>
            <div className="w-full h-[8vh] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-3 md:px-4 h-full">
                    {/* Logo */}
                    <NavLink to="/">
                        <h1 className="text-3xl text-dark_theme tracking-wide font-bold">
                            MediHub
                        </h1>
                    </NavLink>

                    {/* Nav Menus */}
                    <div className="hidden lg:flex items-center justify-between gap-8">
                        <ul className="flex gap-8 items-center">
                            {navItems.map((navItem, index) => (
                                <li key={index}>
                                    <NavLink to={navItem.to} className={navLinkClass}>
                                        {navItem.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="relative">
                                <NavLink
                                    to="/login"
                                    className="text-md font-semibold relative cursor-pointer rounded flex items-center border border-dark_theme text-dark_theme px-4 py-2 gap-2 max-w-[150px]"
                                >
                                    <FaRegCircleUser className="text-dark_theme" />
                                    <span className="truncate">Login</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Toggle button */}
                    <div className="lg:hidden inline-flex">
                        <button onClick={toggleMobileMenu} className="text-dark_theme">
                            {isMobileMenuOpen ? (
                                <FaTimes size={26} />
                            ) : (
                                <FaBars size={26} />
                            )}
                        </button>
                    </div>

                    {/* User Profile Icon (desktop) */}
                    <div className="hidden lg:flex gap-3 items-center relative">
                        <NavLink
                            to="/profile"
                            className="flex items-center border border-dark_theme text-dark_theme rounded-full px-2 py-1"
                        >
                            <img
                                src={user} // Replace with your user image path
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div>
                        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMobileMenu}></div>
                        <div className="lg:hidden bg-gray-200 w-2/3 md:w-3/5 min-h-screen absolute right-0 z-50 px-4 py-4">
                            <ul className="w-full flex flex-col items-start px-4 py-4">
                                {navItems.map((navItem, index) => (
                                    <li key={index} className="mb-4">
                                        <NavLink
                                            to={navItem.to}
                                            className={navLinkClass}
                                            onClick={toggleMobileMenu}
                                        >
                                            {navItem.label}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className="relative mb-4">
                                    <NavLink
                                        to="/login"
                                        className="text-md font-semibold relative cursor-pointer rounded flex items-center border border-dark_theme text-dark_theme px-4 py-2 gap-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        <FaRegCircleUser className="text-dark_theme" />
                                        <span className="truncate">Login</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

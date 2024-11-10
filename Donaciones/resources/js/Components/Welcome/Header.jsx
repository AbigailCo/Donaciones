// Components/Header.js
import React from "react";
import { Link } from "@inertiajs/react";

export default function Header() {
  return (
    <header className="masthead text-center text-white">
      <div className="masthead-content">
        <div className="container px-5">
          <h1 className="masthead-heading mb-0">Dar vuelve</h1>
          <h2 className="masthead-subheading mb-0">siempre vuelve</h2>
          <Link className="btn btn-primary btn-xl rounded-pill mt-5"  href={route('login')}>
            Donar ahora
          </Link>
        </div>
      </div>
      <div className="bg-circle-1 bg-circle"></div>
      <div className="bg-circle-2 bg-circle"></div>
      <div className="bg-circle-3 bg-circle"></div>
      <div className="bg-circle-4 bg-circle"></div>
    </header>
  );
}

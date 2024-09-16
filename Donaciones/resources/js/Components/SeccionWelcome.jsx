import React from 'react';
import { Link } from "@inertiajs/react";

const SeccionWelcome = () => {
  return (
    <section className="container-fluid bg-blue-50 text-center py-10">
      <div className="container p-5 mx-auto max-w-4xl">
        <h2 className="text-blue-900 mb-5 text-3xl font-semibold">
          Dar siempre vuelve
          <span className="text-fuchsia-500"> ¡Es momento de usar la tecnología como aliada! </span>
        </h2>
        <div className="flex justify-center">
          <Link
            href={route('login')}
            className="bg-fuchsia-500 hover:bg-fuchsia-600 focus:bg-fuchsia-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
          >
            <span className="flex-1 text-center">Dona ahora</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeccionWelcome;

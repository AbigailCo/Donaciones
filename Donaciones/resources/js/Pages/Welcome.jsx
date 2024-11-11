import { Link, Head } from "@inertiajs/react";
//import Footer from "@/Components/Footer";
import Carrusel from "@/Components/Carrusel";
import SeccionWelcome from "@/Components/SeccionWelcome";
/* import Logo from "@/Components/Logo"; */
import NavBar from "../Layouts/NarBar";
import Header from "../Components/Welcome/Header";
import ContentSection from "../Components/Welcome/ContentSection";
import Footer from "../Components/Welcome/Footer";

export default function Welcome({ auth }) {
  const sections = [
    {
      title: "¿Te doy una mano?",
      content: "La expresión DAR UNA MANO en Argentina significa ayudar o echar una mano a alguien en una situación difícil o cuando necesita asistencia.",
      imageSrc: "assets/img/01.jpg",
    },
    {
      title: "Te tiro un cable",
      content: "Esta expresión se usa cuando alguien va a ayudar a otra persona, especialmente en situaciones donde se necesita resolver un problema. TIRAR UN CABLE es como ofrecer asistencia o soporte.",
      imageSrc: "assets/img/02.jpeg",
      reverse: true,
    },
    {
      title: "Te hago aguante",
      content: "Dar apoyo o respaldo, ya sea en un proyecto, una situación complicada o simplemente para tener compañía. HACER EL AGUANTE es como decir estar ahí para alguien.",
      imageSrc: "assets/img/03.jpg",
      
    },
  ];

  return (
    <>
      <Head title="Bienvenidos" />
      <div className="relative min-h-screen bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
          <div className="relative w-full px-0">
            <NavBar auth={auth} />
            <Header />
            <main className="mt-6">
              {sections.map((section, index) => (
                <ContentSection
                  key={index}
                  title={section.title}
                  content={section.content}
                  imageSrc={section.imageSrc}
                  reverse={section.reverse}
                />
              ))}
            </main>
            <Footer />
          </div>
        
      </div>
    </>
  );
}

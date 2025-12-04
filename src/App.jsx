import { useState, useEffect } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [projectCategory, setProjectCategory] = useState(null);
  const [santiagoTime, setSantiagoTime] = useState("");

  // Traer la hora de Santiago usando la API y actualizar cada segundo
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await fetch(
          "https://worldtimeapi.org/api/timezone/America/Santiago"
        );
        const data = await res.json();
        const date = new Date(data.datetime);
        setSantiagoTime(date);
      } catch (err) {
        console.error("Error fetching time:", err);
      }
    };

    fetchTime();
    const interval = setInterval(async () => {
      const res = await fetch(
        "https://worldtimeapi.org/api/timezone/America/Santiago"
      );
      const data = await res.json();
      setSantiagoTime(new Date(data.datetime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    if (!date) return "loading...";
    return date.toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const sections = {
    home: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          welcome!
        </h2>
        <img
          src="https://64.media.tumblr.com/4fa3ddf35c097c5153474f2cd7ea90f3/f97dcb2c4356f29f-e1/s640x960/3f47738b2af5c2f116e8fd002f378a5d2d4f5b9c.jpg"
          alt="Renato Herrera Urcullu."
          className="w-72 sm:w-96 shadow-lg"
        />
        <p className="text-gray-600 mt-4 text-sm sm:text-base">
          Software Engineering student based in Chile.
        </p>
        <p className="text-gray-500 mt-2 text-sm">
          Local time (Santiago, CL): {formatTime(santiagoTime)}
        </p>
      </div>
    ),
    about: (
      <div>
        <p className="text-gray-700 mb-2">
          I'm renato, a Software Engineering student. Looking to use technology to develop tools to better life in many aspects.
        </p>
        <h3 className="text-xl font-semibold mb-2">Work</h3>
        <p className="text-gray-700">
          Internship based mostly on automation.
        </p>
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <p className="text-gray-700">Software Engineering at UNAB, Chile.</p>
        <p className="text-gray-700">Semester abroad at University of Basque Country, Spain.</p>
      </div>
    ),
    projects: projectCategory === null ? (
      <div className="flex flex-col items-center justify-center h-full space-y-2">
        <div
          onClick={() => setProjectCategory("software")}
          className="text-gray-700 hover:text-red-700 cursor-pointer transition-colors duration-300 text-sm sm:text-base"
        >
          Software
        </div>
        <div
          onClick={() => setProjectCategory("hardware")}
          className="text-gray-700 hover:text-red-700 cursor-pointer transition-colors duration-300 text-sm sm:text-base"
        >
          Hardware
        </div>
      </div>
    ) : projectCategory === "software" ? (
      <div>
        <h3 className="text-xl font-semibold mb-2 text-black">Software Projects</h3>
        <p className="text-gray-700">
          Flags for RYM on Chrome Web Store.
        </p>
        <p className="text-gray-700">
          TectonicMap app.
        </p>
      </div>
    ) : (
      <div>
        <h3 className="text-xl font-semibold mb-2">Hardware Projects</h3>
        <p className="text-gray-700">
          Coming soon...
        </p>
      </div>
    ),
    contact: (
      <div>
        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <p className="text-gray-700">
          renatoherrerapolo@gmail.com / linkedin.com
        </p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
      {/* Barra lateral */}
      <div className="flex flex-col items-start p-6 sm:p-10 sm:w-52 bg-gray-50">
        <h1 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4">
          Renato Herrera U.
        </h1>
        <div className="flex flex-col space-y-0">
          {["home", "about", "projects", "contact"].map((text) => (
            <button
              key={text}
              onClick={() => {
                setActiveSection(text);
                if (text !== "projects") {
                  setProjectCategory(null);
                }
              }}
              className={`w-24 sm:w-28 h-7 sm:h-8 text-xs sm:text-sm font-semibold rounded-none
                ${
                  activeSection === text
                    ? "bg-red-700 text-white"
                    : "bg-white text-gray-900 hover:bg-red-700"
                }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`flex-1 p-6 sm:p-10 flex items-center ${activeSection === "projects" && projectCategory === "software" ? "justify-start" : "justify-center"}`}>
        {sections[activeSection]}
      </div>
    </div>
  );
}

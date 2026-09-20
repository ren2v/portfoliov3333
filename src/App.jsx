import { useState, useEffect, useMemo } from "react";

const TAGS = {
  "chrome-extension": { en: "Chrome Extension", es: "Extensión de Chrome" },
  web: { en: "Web App", es: "Aplicación Web" },
  geospatial: { en: "Geospatial", es: "Geoespacial" },
  "3d": { en: "3D", es: "3D" },
  social: { en: "Social", es: "Social" },
};

const PROJECTS = [
  {
    id: "flags-for-rym",
    name: "Flags for RYM",
    tags: ["chrome-extension"],
    tagline: {
      en: "Chrome extension.",
      es: "Extensión de Chrome.",
    },
    description: {
      en: "Adds country flags next to artists on rateyourmusic.com, using MusicBrainz's area hierarchy with a Nominatim fallback.",
      es: "Agrega banderas de países junto a los artistas en rateyourmusic.com, usando la jerarquía de áreas de MusicBrainz con Nominatim como respaldo.",
    },
    url: "https://chromewebstore.google.com/detail/flags-for-rym/ndbikjgmpkllhlcfemillocjgnmnffdg",
    media: { type: "gif", src: "/projects/flags-for-rym.gif" },
  },
  {
    id: "georiesgo-chile",
    name: "GeoRiesgo Chile",
    tags: ["web", "geospatial"],
    tagline: {
      en: "Geospatial risk data for Chile.",
      es: "Datos geoespaciales de riesgo para Chile.",
    },
    description: {
      en: "Seismic and geological risk evaluator for Chile, combining fault proximity, seismicity, tsunami inundation, and soil type into a weighted risk model.",
      es: "Evaluador de riesgo sísmico y geológico para Chile, que combina cercanía a fallas, sismicidad, inundación por tsunami y tipo de suelo en un modelo de riesgo ponderado.",
    },
    url: "https://georiesgo-chile.vercel.app/",
    media: { type: "gif", src: "/projects/georiesgo-chile.gif" },
  },
  {
    id: "volcanes-del-sur",
    name: "Volcanes del Sur",
    tags: ["3d", "geospatial"],
    tagline: {
      en: "3D terrain visualizer.",
      es: "Visualizador de terreno 3D.",
    },
    description: {
      en: "3D terrain visualizer of southern Chilean volcanoes (Villarrica, Osorno) built with real DEM and satellite data — Copernicus GLO-30 elevation, ESRI World Imagery textures, and Sentinel-2 NDVI layers rendered in Three.js with orbital camera controls.",
      es: "Visualizador 3D del terreno de volcanes del sur de Chile (Villarrica, Osorno) construido con datos DEM y satelitales reales — elevación Copernicus GLO-30, texturas ESRI World Imagery y capas NDVI de Sentinel-2, renderizado en Three.js con controles de cámara orbital.",
    },
    url: "",
    media: {
      type: "carousel",
      images: [
        "/projects/volcanes-del-sur-1.png",
        "/projects/volcanes-del-sur-2.png",
        "/projects/volcanes-del-sur-3.png",
      ],
    },
  },
  {
    id: "worldpinner",
    name: "WorldPinner",
    tags: ["web", "social", "geospatial"],
    tagline: {
      en: "Keep a visual record of your travels around the world.",
      es: "Lleva un registro visual de tus viajes por el mundo.",
    },
    description: {
      en: "Web app/social network for tracking your travel history: pin the countries and regions you've visited on an interactive map/globe, build your wishlist, earn XP and level up unlocking 111 achievements, compare yourself with friends, follow the global leaderboard, and share itineraries. Includes a social feed.",
      es: "App web/red social para trackear tu historial de viajes: marca los países y regiones que visitaste en un mapa/globo interactivo, arma tu wishlist, gana XP y sube de nivel desbloqueando 111 logros, comparate con amigos, sigue el leaderboard global y comparte itinerarios. Incluye un feed social.",
    },
    url: "https://worldpinner.app",
    media: { type: "image", src: "/projects/worldpinner.webp" },
  },
];

function Carousel({ images, alt }) {
  const [index, setIndex] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded border border-gray-200">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              className="w-full shrink-0"
            />
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-gray-700 hover:text-red-700 shadow"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-gray-700 hover:text-red-700 shadow"
          >
            ›
          </button>
          <div className="flex justify-center gap-1.5 mt-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? "bg-red-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LanguageIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-3.5 h-3.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="0" y="14" fontSize="12" fontFamily="sans-serif" fill="currentColor">
        あ
      </text>
      <text x="11" y="9" fontSize="9" fontFamily="sans-serif" fill="currentColor">
        A
      </text>
    </svg>
  );
}

function LanguageToggle({ lang, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
      className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-700 border border-gray-300 hover:border-red-700 rounded px-2 py-1 transition-colors"
    >
      <LanguageIcon />
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}

function TagPills({ tags, lang }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] uppercase tracking-wide text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5"
        >
          {TAGS[tag][lang]}
        </span>
      ))}
    </div>
  );
}

function TagFilter({ activeTag, onSelect, lang }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      <button
        onClick={() => onSelect(null)}
        className={`text-xs rounded-full px-2.5 py-1 border transition-colors ${
          activeTag === null
            ? "bg-red-700 border-red-700 text-white"
            : "border-gray-300 text-gray-500 hover:border-red-700 hover:text-red-700"
        }`}
      >
        {lang === "en" ? "All" : "Todos"}
      </button>
      {Object.entries(TAGS).map(([id, label]) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`text-xs rounded-full px-2.5 py-1 border transition-colors ${
            activeTag === id
              ? "bg-red-700 border-red-700 text-white"
              : "border-gray-300 text-gray-500 hover:border-red-700 hover:text-red-700"
          }`}
        >
          {label[lang]}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ project, isOpen, onToggle, lang }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span>
          <span className="text-gray-900 font-medium group-hover:text-red-700 transition-colors">
            {project.name}
          </span>{" "}
          <span className="text-gray-500">— {project.tagline[lang]}</span>
          <TagPills tags={project.tags} lang={lang} />
        </span>
        <span
          className={`font-mono text-gray-400 text-sm transition-transform duration-200 shrink-0 ml-4 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pt-1">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {project.description[lang]}
            </p>
            {project.media.type === "carousel" ? (
              <Carousel images={project.media.images} alt={project.name} />
            ) : (
              <img
                src={project.media.src}
                alt={`${project.name} demo`}
                className="w-full rounded border border-gray-200"
              />
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-gray-900 hover:text-red-700 underline decoration-gray-300 hover:decoration-red-700 transition-colors"
              >
                {lang === "en" ? "View project →" : "Ver proyecto →"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [santiagoTime, setSantiagoTime] = useState(new Date());
  const [openProject, setOpenProject] = useState(null);
  const [lang, setLang] = useState("en");
  const [activeTag, setActiveTag] = useState(null);

  const filteredProjects = useMemo(
    () =>
      activeTag
        ? PROJECTS.filter((project) => project.tags.includes(activeTag))
        : PROJECTS,
    [activeTag]
  );

  // Reloj local, sin llamadas a APIs externas
  useEffect(() => {
    const interval = setInterval(() => {
      setSantiagoTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-CL", {
      timeZone: "America/Santiago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const sections = {
    home: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
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
        <p className="font-mono text-gray-400 mt-2 text-xs tracking-wide">
          {formatTime(santiagoTime)} — America/Santiago
        </p>
      </div>
    ),
    about: (
      <div>
        <p className="text-gray-700 mb-4 leading-relaxed">
          I'm renato, a Software Engineering student. Looking to use technology to develop tools to better life in many aspects.
        </p>
        <h3 className="font-display text-lg font-semibold mb-2 text-gray-900">Work</h3>
        <p className="text-gray-700 mb-4">
          Internship based mostly on automation.
        </p>
        <h3 className="font-display text-lg font-semibold mb-2 text-gray-900">Education</h3>
        <p className="text-gray-700">Software Engineering at UNAB, Chile.</p>
        <p className="text-gray-700">Semester abroad at University of Basque Country, Spain.</p>
      </div>
    ),
    projects: (
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg font-semibold text-gray-900">
            {lang === "en" ? "Software Projects" : "Proyectos de Software"}
          </h3>
          <LanguageToggle
            lang={lang}
            onToggle={() => setLang(lang === "en" ? "es" : "en")}
          />
        </div>
        <TagFilter activeTag={activeTag} onSelect={setActiveTag} lang={lang} />
        <div>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              isOpen={openProject === project.id}
              onToggle={() =>
                setOpenProject(openProject === project.id ? null : project.id)
              }
            />
          ))}
          {filteredProjects.length === 0 && (
            <p className="text-gray-400 text-sm py-4">
              {lang === "en" ? "No projects with this tag." : "No hay proyectos con este tag."}
            </p>
          )}
        </div>
      </div>
    ),
    contact: (
      <div>
        <h3 className="font-display text-lg font-semibold mb-3 text-gray-900">Contact</h3>
        <p className="text-gray-700">
          renatoherrerapolo@gmail.com / linkedin.com
        </p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row font-sans">
      {/* Barra lateral */}
      <div className="flex flex-col items-start p-6 sm:p-10 sm:w-60 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-200">
        <h1 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-gray-900">
          Renato Herrera U.
        </h1>
        <p className="font-mono text-[11px] text-gray-400 tracking-wide mt-1 mb-8">
          33.4489°S, 70.6693°W
        </p>
        <nav className="flex flex-col w-full">
          {["home", "about", "projects", "contact"].map((text) => (
            <button
              key={text}
              onClick={() => setActiveSection(text)}
              className={`text-left pl-4 py-2 text-sm font-medium tracking-wide border-l-2 transition-colors duration-200
                ${
                  activeSection === text
                    ? "border-red-700 text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300"
                }`}
            >
              {text}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido principal */}
      <div className={`flex-1 p-6 sm:p-12 flex ${activeSection === "home" ? "items-center justify-center" : "items-start justify-start"}`}>
        <div className="w-full max-w-xl">
          {sections[activeSection]}
        </div>
      </div>
    </div>
  );
}

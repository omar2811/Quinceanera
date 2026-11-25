import { useEffect, useRef, useState } from "react";

import quinceanera1 from "../assets/img/melissa/Melissa - SESIÓN-6.jpg";
import quinceanera2 from "../assets/img/melissa/Melissa - SESIÓN-14.jpg";
import quinceanera3 from "../assets/img/melissa/Melissa - SESIÓN-32.jpg";
import quinceanera4 from "../assets/img/melissa/Melissa - SESIÓN-39.jpg";

import dressCodeGuide from "../assets/img/dress-code-guide.jpg";
import salonGomzav from "../assets/img/salon-gomzav.jpg";
import parroquiaImg from "../assets/img/parroquia-san-juan-bautista.jpg";

import floralOrnament from "../assets/img/floral-ornament.webp";
import bowOrnament from "../assets/img/bow-ornament.webp";

import starsPoster from "../assets/img/image.png";
import "./InvitationPro.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Keyboard } from "swiper/modules";

const quincesDate = new Date("2026-12-19T19:00:00-06:00");

const quinceaneraGallery = [
  { id: 1, src: quinceanera1, alt: "Quinceañera con mano en la cintura" },
  { id: 2, src: quinceanera2, alt: "Quinceañera tocando su cabello con ambas manos" },
  { id: 3, src: quinceanera3, alt: "Quinceañera sentada" },
  { id: 4, src: quinceanera4, alt: "Quinceañera con mano arriba" },
];

const suggestedColors = [
  {
    name: "Vino / Borgoña",
    hex: "#5B1324",
    gradient: "linear-gradient(135deg, #8a233b 0%, #5B1324 55%, #2e0610 100%)",
  },
  {
    name: "Verde Esmeralda",
    hex: "#174231",
    gradient: "linear-gradient(135deg, #2b6e53 0%, #174231 55%, #091f16 100%)",
  },
  {
    name: "Ciruela / Berenjena",
    hex: "#431D3B",
    gradient: "linear-gradient(135deg, #6e3362 0%, #431D3B 55%, #210b1c 100%)",
  },
  {
    name: "Negro Gala",
    hex: "#18181B",
    gradient: "linear-gradient(135deg, #3f3f46 0%, #18181B 55%, #09090b 100%)",
  },
  {
    name: "Azul Marino (Ellos)",
    hex: "#1B2945",
    gradient: "linear-gradient(135deg, #344d7e 0%, #1B2945 55%, #0c1424 100%)",
  },
];

const sparkles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 19 + 7) % 95}%`,
  top: `${(i * 29 + 11) % 90}%`,
  delay: `${(i % 5) * 0.85}s`,
  duration: `${4.2 + (i % 4)}s`,
  size: i % 3 === 0 ? 5 : 3,
}));

const salonMapUrl = "https://maps.app.goo.gl/PsJoYP4EkPpuZ1te9?g_st=ic";
const misaMapUrl = "https://maps.app.goo.gl/3TNwLSvXFtRn56946";

const whatsappPhone = "529931661341";
const whatsappMessage = encodeURIComponent(
  "¡Hola! Quiero confirmar mi asistencia a los XV años de Melissa Guadalupe el 19 de diciembre de 2026. "
);
const whatsappRsvpUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

const swiperSettings = {
  slidesPerView: 1,
  spaceBetween: 16,
  centeredSlides: true,
  speed: 500,
  grabCursor: true,
  simulateTouch: true,
  touchRatio: 1,
  pagination: { clickable: true },
  keyboard: { enabled: true },
  modules: [Pagination, Keyboard],
  className: "mySwiper",
};

function getCountdown() {
  const distance = Math.max(0, quincesDate.getTime() - Date.now());

  return [
    ["Días", Math.floor(distance / 86400000)],
    ["Horas", Math.floor((distance / 3600000) % 24)],
    ["Minutos", Math.floor((distance / 60000) % 60)],
    ["Segundos", Math.floor((distance / 1000) % 60)],
  ];
}

function downloadICS() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitacion XV//Melissa Guadalupe//ES",
    "BEGIN:VEVENT",
    "DTSTART:20261220T010000Z",
    "DTEND:20261220T080000Z",
    "SUMMARY:XV Años · Melissa Guadalupe Gil Arcos",
    "DESCRIPTION:Misa 7:00 p.m. en Parroquia San Juan Bautista. Recepción 7:30 p.m. en Salón de eventos Gomzav. Código de vestimenta: Noche 100 años Disney (Celebración para adultos).",
    "LOCATION:Salón de eventos Gomzav, Prol. Carlos Pellicer Camara 105-primer piso, 86168 Villahermosa, Tab.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "XV-Melissa-Guadalupe.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function Invitation() {
  const [countdown, setCountdown] = useState(getCountdown);
  const rootRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    const targets = container.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="invitation-pro-shell">
      <div className="gala-sparkles-layer" aria-hidden="true">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="gala-sparkle"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>



      <main>
        <section className="gallery-section light-paper-section hero-gala-section" id="bienvenida">
          <div className="royal-crest" data-reveal>
            <span>XV</span>
          </div>
          <p className="kicker" data-reveal>Celebremos juntos los XV años de</p>
          <h2 className="gala-title" data-reveal>Melissa Guadalupe Gil Arcos</h2>
          <div className="gold-hairline" data-reveal />

          <p className="lead" data-reveal>
            Con mucha ilusión celebro este momento tan especial y deseo compartir
            esta noche inolvidable con quienes llenan mi vida de alegría.
          </p>

          <Swiper {...swiperSettings}>
            {quinceaneraGallery.map((image) => (
              <SwiperSlide key={`quinceanera-img-${image.id}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="zoomable-photo"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="details-section dark-paper-section" id="padres-padrinos">
          <div className="ornament ornament-float" data-reveal>
            <img src={bowOrnament} width={88} height="auto" loading="lazy" alt="" />
          </div>
          <p className="kicker" data-reveal>Mis XV Años</p>
          <h2 data-reveal>Con la bendición de Dios y de mis:</h2>
          <div className="gold-hairline" data-reveal />

          <div className="details-grid">
            <article className="gala-card" data-reveal>
              <h3>Papás</h3>
              <p>
                <b>Sr. Candido Garcia Benitez</b> <br />
                <b>Sra. Jannet Arcos Garcia</b>
              </p>
            </article>
            <article className="gala-card" data-reveal>
              <h3>Padrinos de Bendición</h3>
              <p>
                <b>Ing. Omar Alberto Flores Reyes</b> <br />

                <b>Dra. Karen Nayely Arcos Pineda</b>
              </p>
            </article>
            <article className="gala-card" data-reveal>
              <h3>Padrinos de Brindis</h3>
              <p>
                <b>Ing. Paul Horacio Tinoco Agurto</b><br />
                <b>Sra. Maritza Arcos Garcia</b>
              </p>
            </article>
          </div>
        </section>

        <section className="countdown-section" id="contador">
          <p className="kicker light" data-reveal>La espera comienza</p>
          <h2 data-reveal>Faltan solamente</h2>
          <div className="countdown" data-reveal>
            {countdown.map(([label, value]) => (
              <div className="countdown-item gala-counter-box" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="calendar-cta-wrap" data-reveal>
            <button type="button" className="gala-outline-btn" onClick={downloadICS}>
              Guardar fecha en mi calendario
            </button>
          </div>
        </section>


        <section className="map-section light-paper-section" id="ubicacion">
          <div className="map-copy" data-reveal>
            <p className="kicker">Recepción · 7:30 p.m.</p>
            <p>Salón de eventos Gomzav</p>
            <span>Prol. Carlos Pellicer Camara 105-primer piso, 86168 Villahermosa, Tab.</span>
            <a
              className="map-link"
              href={salonMapUrl}
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar
            </a>
          </div>
          <a
            className="map-image-link gala-photo-frame"
            href={salonMapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver ubicación de Salón de eventos Gomzav en Google Maps"
            data-reveal
          >
            <img
              src={salonGomzav}
              alt="Fachada del Salón de eventos Gomzav"
              loading="lazy"
            />
          </a>
        </section>

        <section className="map-section dark-paper-section" id="misa">
          <div className="map-copy" data-reveal>
            <p className="kicker">Misa de Acción de Gracias · 7:00 p.m.</p>
            <p>Parroquia San Juan Bautista</p>
            <span>P.º Villahermosa 120, Plaza Villahermosa, 86179 Villahermosa, Tab.</span>
            <a
              className="map-link"
              href={misaMapUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir en Google Maps
            </a>
          </div>
          <a
            className="map-image-link gala-photo-frame"
            href={misaMapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver ubicación de Parroquia San Juan Bautista en Google Maps"
            data-reveal
          >
            <img
              src={parroquiaImg}
              alt="Parroquia San Juan Bautista en Villahermosa"
              loading="lazy"
            />
          </a>
        </section>

        <section className="gallery-section light-paper-section" id="vestimenta">
          <p className="kicker" data-reveal>Referencias de</p>
          <h2 data-reveal>Vestimenta</h2>
          <div className="gold-hairline" data-reveal />

          <p className="lead" data-reveal>
            Con mucho cariño les pedimos evitar las prendas estampadas y cualquier tonalidad en{" "}
            <b>plata o azul</b>, ya que son colores reservados. Les invitamos a elegir un atuendo
            acorde a la temática <i>100 años Disney</i> y a los tonos permitidos del evento.
          </p>

          <div className="dress-showcase" data-reveal>
            <img
              src={dressCodeGuide}
              alt="Referencias de vestimenta: Para Ellas y Para Ellos"
              loading="lazy"
            />
          </div>

          <div className="gala-swatches" data-reveal>
            {suggestedColors.map((color) => (
              <div className="gala-swatch" key={color.name}>
                <span
                  className="gala-swatch-dot"
                  style={{ background: color.gradient }}
                  aria-hidden="true"
                />
                <small>{color.name}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <img
            className="quote-video"
            src={starsPoster}
            alt=""
            aria-hidden="true"
          />

          <div className="quote-content" data-reveal>
            <p>“Haz de tu vida un sueño y de tu sueño una realidad.”</p>
            <span>- Antoine de Saint-Exupéry</span>
          </div>
        </section>

        <section className="gift-section light-paper-section" id="regalos">
          <p className="kicker" data-reveal>Lazos en forma de</p>
          <h2 data-reveal>Obsequios</h2>
          <p className="lead" data-reveal>
            Tu presencia es lo más importante para nosotros. Si además deseas
            tener un detalle, hemos preparado una opción sencilla.
          </p>
          <div className="gift-card gala-card" data-reveal>
            <h3>Lluvia de sobres (Efectivo)</h3>
            <p>
              Si deseas hacernos un obsequio en efectivo, encontrarás un buzón
              especial durante la celebración.
            </p>
          </div>
        </section>

        <section className="gift-section dark-paper-section" id="solo-adultos">
          <p className="kicker" data-reveal>Nota importante</p>
          <h2 data-reveal>Celebración para adultos</h2>
          <div className="gold-hairline" data-reveal />
          <p className="lead" data-reveal>
            Amamos la alegría y la magia que los pequeños aportan a nuestras vidas;
            sin embargo, en esta ocasión hemos decidido reservar esta noche de
            ensueño para una celebración entre adultos.
          </p>
          <p className="lead" data-reveal>
            Gracias por su comprensión y por ser parte de esta historia tan especial.
          </p>
        </section>

        <section className="rsvp-section" id="confirmar">
          <div className="rsvp-intro">
            <h2 data-reveal>Confirmar asistencia</h2>
            <p data-reveal>
              Envíanos un mensaje por WhatsApp para confirmar tu lugar en la misa y la recepción.
            </p>
            <div className="rsvp-confirmation gala-card" data-reveal>
              <div className="ornament ornament-float">
                <img src={bowOrnament} width={88} height="auto" loading="lazy" alt="" />
              </div>
              <h3>Melissa · 19 de diciembre de 2026</h3>
              <p>
                Al presionar el botón se abrirá WhatsApp con un mensaje listo para que indiques si asistirás.
              </p>
              <a
                className="submit-button gala-shine-btn"
                href={whatsappRsvpUrl}
                target="_blank"
                rel="noreferrer"
              >
                Confirmar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="light-paper-section">
        <div className="footer-overlay light-paper-section" />
        <section>
          <div className="ornament ornament-float">
            <img src={floralOrnament} width={88} height="auto" loading="lazy" alt="" />
          </div>
          <p className="signature">Quince Años</p>
          <span>19 · 12 · 2026</span>
        </section>
      </footer>
    </div>
  );
}
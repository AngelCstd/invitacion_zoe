import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Heart,
  ExternalLink,
  Plus,
  Gift,
} from "lucide-react";
import invitationData from "./data/invitationData.json";

// Hook para detectar cuando un elemento entra en viewport
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isIntersecting };
};

// Componente para elementos animados
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Componente de clavel decorativo
const Carnation = ({ className = "", size = "w-8 h-8" }) => (
  <div className={`${size} ${className} relative`}>
    <div className="absolute inset-0 bg-red-300 rounded-full opacity-60 animate-pulse"></div>
    <div
      className="absolute inset-1 bg-red-400 rounded-full opacity-80 animate-pulse"
      style={{ animationDelay: "0.5s" }}
    ></div>
    <div
      className="absolute inset-2 bg-red-500 rounded-full animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>
  </div>
);

// Componente de partículas flotantes
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
        }}
      >
        <Carnation size="w-4 h-4" />
      </div>
    ))}
  </div>
);

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventDate = new Date(invitationData.evento.fecha);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToGoogleCalendar = () => {
    const { fechaInicio, fechaFin, titulo, descripcion } =
      invitationData.calendario;
    const {
      nombre: lugarNombre,
      direccion,
      colonia,
      ciudad,
    } = invitationData.lugar;

    const title = encodeURIComponent(titulo);
    const details = encodeURIComponent(descripcion);
    const location = encodeURIComponent(
      `${lugarNombre}, ${direccion}, ${colonia}, ${ciudad}`
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fechaInicio}/${fechaFin}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-red-50 relative overflow-hidden">
      {/* Partículas de fondo globales */}
      <FloatingParticles />

      {/* Portada / Bienvenida */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-rose-600"></div>

        {/* Decoraciones florales animadas */}
        <div className="absolute top-10 left-10 animate-bounce-slow">
          <Carnation className="opacity-30" size="w-20 h-20" />
        </div>
        <div
          className="absolute bottom-20 right-10 animate-bounce-slow"
          style={{ animationDelay: "1s" }}
        >
          <Carnation className="opacity-30" size="w-16 h-16" />
        </div>
        <div
          className="absolute top-1/3 right-20 animate-bounce-slow"
          style={{ animationDelay: "2s" }}
        >
          <Carnation className="opacity-20" size="w-24 h-24" />
        </div>
        <div className="absolute bottom-1/3 left-20 animate-spin-slow">
          <div className="w-32 h-32 border-4 border-rose-300 border-dashed rounded-full opacity-20"></div>
        </div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute top-20 right-1/4 animate-pulse">
          <div className="w-2 h-2 bg-rose-200 rounded-full"></div>
        </div>
        <div
          className="absolute bottom-40 left-1/4 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-3 h-3 bg-red-200 rounded-full"></div>
        </div>

        <AnimatedSection className="relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider animate-glow">
              XV AÑOS
            </h1>
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-rose-200 mr-4 animate-heartbeat" />
              <h2 className="text-4xl md:text-5xl font-script text-rose-100 animate-shimmer">
                {invitationData.quinceañera.nombre}
              </h2>
              <Heart
                className="w-8 h-8 text-rose-200 ml-4 animate-heartbeat"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <p className="text-xl md:text-2xl font-light mb-8 text-rose-100 animate-fade-in-delayed">
              {invitationData.mensajes.bienvenida}
            </p>
            <div className="text-2xl md:text-3xl font-semibold animate-zoom-in">
              {invitationData.evento.fechaTexto}
            </div>
          </div>
        </AnimatedSection>

        {/* Flecha para scroll animada */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-glow-soft">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Cuenta Regresiva */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50 to-transparent opacity-50"></div>

        <AnimatedSection className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-red-600 mb-12 animate-bounce-in">
            {invitationData.mensajes.cuentaRegresiva}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Minutos" },
              { value: timeLeft.seconds, label: "Segundos" },
            ].map((item, index) => (
              <AnimatedSection
                key={item.label}
                delay={index * 100}
                className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in-bounce"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 animate-number-flip">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-lg font-semibold opacity-90">
                  {item.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Detalles del Evento */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-red-50 relative">
        <div className="absolute top-10 right-10">
          <Carnation
            className="opacity-10 animate-spin-slow"
            size="w-32 h-32"
          />
        </div>

        <AnimatedSection className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-red-600 text-center mb-12 animate-slide-in-top">
            Detalles del Evento
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection
              delay={200}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-card-flip"
            >
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-red-500 mr-4 animate-wiggle" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Fecha y Hora
                </h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center animate-slide-in-left">
                  <Clock className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-lg">
                    {invitationData.evento.fechaTexto}
                  </span>
                </div>
                <div
                  className="flex items-center animate-slide-in-left"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Clock className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-lg">
                    {`${invitationData.evento.horaInicio} - ${invitationData.evento.horaIFin}`}
                  </span>
                </div>
              </div>
              <button
                onClick={addToGoogleCalendar}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 animate-button-glow"
              >
                <Plus className="w-5 h-5 mr-2 animate-spin-on-hover" />
                Agregar al Calendario
              </button>
            </AnimatedSection>

            <AnimatedSection
              delay={400}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-card-flip"
            >
              <div className="flex items-center mb-6">
                <MapPin
                  className="w-8 h-8 text-red-500 mr-4 animate-wiggle"
                  style={{ animationDelay: "0.5s" }}
                />
                <h3 className="text-2xl font-bold text-gray-800">Lugar</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <div className="animate-slide-in-right">
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {invitationData.lugar.nombre}
                  </p>
                  <p>{invitationData.lugar.direccion}</p>
                  <p>
                    {invitationData.lugar.colonia},{" "}
                    {invitationData.lugar.ciudad}
                  </p>
                </div>
              </div>
              <a
                href={invitationData.lugar.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-105 animate-button-glow"
              >
                <ExternalLink className="w-5 h-5 mr-2 animate-bounce-gentle" />
                Ver en Google Maps
              </a>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </section>

      {/* Itinerario
        <section className="py-16 bg-white relative">
          <div className="absolute bottom-10 left-10">
            <Carnation className="opacity-10 animate-pulse" size="w-24 h-24" />
          </div>

          <AnimatedSection className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-bold text-red-600 text-center mb-12 animate-slide-in-top">
              Itinerario
            </h2>

            <div className="space-y-8">
              {invitationData.itinerario.map((item, index) => {
                const IconComponent = getIcon(item.icono);
                return (
                  <AnimatedSection
                    key={index}
                    delay={index * 150}
                    className="flex items-center bg-gradient-to-r from-rose-50 to-red-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-slide-in-stagger"
                  >
                    <div className="bg-red-500 text-white rounded-full p-4 mr-6 animate-icon-bounce hover:animate-spin-once">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="text-lg font-bold text-red-600 mb-1 md:mb-0 md:mr-4 animate-text-glow">
                          {item.hora}
                        </span>
                        <span className="text-xl font-semibold text-gray-800 animate-slide-in-left">
                          {item.evento}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 animate-fade-in-delayed">
                        {item.descripcion}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>
        </section> */}

      {/* Regalos */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10">
          <Carnation className="opacity-10 animate-pulse" size="w-24 h-24" />
        </div>

        <AnimatedSection className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-red-600 text-center mb-12 animate-slide-in-top">
            {invitationData.regalos.titulo}
          </h2>

          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 animate-card-expand">
            <AnimatedSection delay={200} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-red-500 text-white rounded-full p-6 animate-icon-bounce">
                  <Gift className="w-12 h-12" />
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed animate-fade-in-delayed">
                {invitationData.regalos.mensaje}
              </p>
              <div className="bg-white rounded-lg p-6 shadow-md animate-zoom-in">
                <p className="text-xl font-semibold text-red-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 mr-2 animate-heartbeat" />
                  {invitationData.regalos.lluviaSobres}
                  <Heart
                    className="w-6 h-6 ml-2 animate-heartbeat"
                    style={{ animationDelay: "0.5s" }}
                  />
                </p>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </section>

      {/* Código de Vestimenta */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-red-50 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 transform translate-x-1/2">
          <div className="w-64 h-64 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <AnimatedSection className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-red-600 text-center mb-12 animate-slide-in-top">
            Código de Vestimenta
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 animate-card-expand">
            <AnimatedSection delay={200} className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 animate-zoom-in">
                {invitationData.vestimenta.tipo}
              </h3>
              <p className="text-lg text-gray-600 animate-fade-in-delayed">
                {invitationData.vestimenta.descripcion}
              </p>
            </AnimatedSection>

            <div className="grid gap-8">
              {/* <AnimatedSection delay={400} className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 animate-slide-in-left">
                  Sugerencias
                </h4>
                <ul className="text-gray-600 space-y-2">
                  {invitationData.vestimenta.sugerencias.map(
                    (sugerencia, index) => (
                      <li
                        key={index}
                        className="animate-list-item-appear"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        • {sugerencia}
                      </li>
                    )
                  )}
                </ul>
              </AnimatedSection> */}

              <AnimatedSection delay={600} className="text-center">
                <h4 className="text-xl font-semibold text-red-600 mb-4 animate-slide-in-right">
                  Colores a Evitar:
                </h4>
                <div className="bg-red-50 p-4 rounded-lg animate-warning-glow">
                  <ul className="text-red-500 space-y-2">
                    {invitationData.vestimenta.coloresEvitar.map(
                      (color, index) => (
                        <li
                          key={index}
                          className="animate-list-item-appear"
                          style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
                        >
                          • {color}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-rose-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <FloatingParticles />
        </div>

        <AnimatedSection className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12 animate-slide-in-top">
            Contacto
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-glass-morph hover:bg-white/20 transition-all duration-500">
            <AnimatedSection delay={200}>
              <p className="text-xl mb-6 animate-fade-in-delayed">
                {invitationData.mensajes.contactoTexto}
              </p>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <AnimatedSection delay={400}>
                <a
                  href={`tel:${invitationData.contacto.mama.telefonoUrl}`}
                  className="flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 animate-contact-glow"
                >
                  <Phone className="w-5 h-5 mr-3 animate-ring" />
                  <span className="font-semibold">
                    {invitationData.contacto.mama.nombre}:{" "}
                    {invitationData.contacto.mama.telefono}
                  </span>
                </a>
              </AnimatedSection>
            </div>

            <AnimatedSection
              delay={800}
              className="mt-8 pt-8 border-t border-white/20"
            >
              <p className="text-lg text-rose-100 animate-fade-in-delayed">
                {invitationData.mensajes.presencia}
              </p>
              <div className="flex items-center justify-center mt-4">
                <Heart className="w-6 h-6 text-rose-200 mx-2 animate-heartbeat" />
                <span className="text-2xl font-script animate-shimmer">
                  {invitationData.quinceañera.nombre}
                </span>
                <Heart
                  className="w-6 h-6 text-rose-200 mx-2 animate-heartbeat"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default App;

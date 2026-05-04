'use client';

import { useEffect, useState } from 'react';
import { api, utils } from '@/lib/api';

function hexToRgb(hex?: string | null) {
  if (!hex) return '0, 166, 81';

  const cleanHex = hex.replace('#', '').trim();

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 166, 81';
}

export default function Hero() {
  const [institucion, setInstitucion] = useState<any>(null);
  const [portadas, setPortadas] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const [instData, contentData] = await Promise.all([
          api.institution.getCurrentPrincipal(),
          api.content.getAll(),
        ]);

        setInstitucion(instData);
        setPortadas(contentData.portada || []);

        if (instData.colorinstitucion?.[0]) {
          const colors = instData.colorinstitucion[0];

          document.documentElement.style.setProperty('--color-primario', colors.color_primario);
          document.documentElement.style.setProperty('--color-secundario', colors.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', colors.color_terciario);

          document.documentElement.style.setProperty('--color-primario-rgb', hexToRgb(colors.color_primario));
          document.documentElement.style.setProperty('--color-secundario-rgb', hexToRgb(colors.color_secundario));
          document.documentElement.style.setProperty('--color-terciario-rgb', hexToRgb(colors.color_terciario));
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  useEffect(() => {
    if (!institucion?.institucion_nombre) return;

    const fullText = institucion.institucion_nombre.toUpperCase();
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);

        setTimeout(() => {
          setDisplayedText('');
        }, 2500);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [institucion]);

  useEffect(() => {
    if (portadas.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portadas.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [portadas]);

  const getPortadaUrl = (portada: any) => {
    if (!portada?.portada_imagen) return '';
    return utils.buildImageUrl(portada.portada_imagen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-14 h-14 rounded-full border-4 border-white/10 border-t-white animate-spin"
            style={{ borderTopColor: 'var(--color-primario)' }}
          />
          <p className="text-sm tracking-[0.35em] uppercase text-white/70">Cargando</p>
        </div>
      </div>
    );
  }

  if (portadas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-950 text-white text-2xl">
        NO HAY PORTADAS
      </div>
    );
  }

  return (
    <section id="inicio" className="hero-arch relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        {portadas.map((portada, index) => (
          <div
            key={portada.portada_id ?? index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={getPortadaUrl(portada)}
              alt={portada.portada_titulo || 'Portada'}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}
 
        <div className="absolute inset-0 z-20 bg-slate-950/10" />

        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.10) 35%, rgba(2,6,23,0.26) 100%)',
          }}
        />

        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, rgba(2,6,23,0.08) 45%, rgba(2,6,23,0.22) 100%)',
          }}
        />
      </div>
 
      <div className="hero-arch-grid" aria-hidden="true" />
      <div className="hero-arch-blueprint" aria-hidden="true" />
      <div className="hero-arch-circles" aria-hidden="true" />
      <div className="hero-arch-drawing-lines" aria-hidden="true" />

      <span className="hero-arch-corner hero-arch-corner-tl" aria-hidden="true" />
      <span className="hero-arch-corner hero-arch-corner-tr" aria-hidden="true" />
      <span className="hero-arch-corner hero-arch-corner-bl" aria-hidden="true" />
      <span className="hero-arch-corner hero-arch-corner-br" aria-hidden="true" />

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(var(--color-primario-rgb, 0, 166, 81), 0.18), transparent 26%), radial-gradient(circle at 82% 70%, rgba(var(--color-terciario-rgb, 30, 108, 68), 0.14), transparent 30%)',
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-[2px] z-30"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-primario), var(--color-secundario), var(--color-terciario), transparent)',
          boxShadow: '0 0 20px rgba(var(--color-primario-rgb, 0, 166, 81), 0.55)',
        }}
      />
 
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-24">
        <div className="w-full max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
 
            <div className="relative mb-8">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-125"
                style={{
                  background:
                    'radial-gradient(circle, rgba(var(--color-primario-rgb, 0, 166, 81), 0.48), transparent 68%)',
                }}
              />

              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border backdrop-blur-md"
                  style={{
                    borderColor: 'rgba(255,255,255,0.16)',
                    background: 'rgba(255,255,255,0.10)',
                    boxShadow:
                      '0 0 70px rgba(var(--color-primario-rgb, 0, 166, 81), 0.16), inset 0 0 70px rgba(255,255,255,0.06)',
                  }}
                />

                <div
                  className="absolute inset-3 rounded-full border opacity-55"
                  style={{ borderColor: 'var(--color-primario)' }}
                />

                <div
                  className="absolute inset-9 rounded-full border opacity-28"
                  style={{ borderColor: 'var(--color-secundario)' }}
                />

                <div
                  className="absolute -inset-4 rounded-full border border-dashed opacity-35 animate-spin-slow"
                  style={{ borderColor: 'var(--color-terciario)' }}
                />

                <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-8 lg:p-10">
                  {institucion?.institucion_logo ? (
                    <img
                      src={utils.buildImageUrl(institucion.institucion_logo)}
                      alt={institucion.institucion_nombre}
                      className="w-full h-full object-contain floating-animation"
                      style={{
                        filter: 'drop-shadow(0 20px 55px rgba(0,0,0,0.45))',
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-6xl lg:text-7xl font-black"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(var(--color-primario-rgb,0,166,81),0.22), rgba(var(--color-terciario-rgb,30,108,68),0.12))',
                        color: 'var(--color-primario)',
                      }}
                    >
                      {institucion?.institucion_iniciales || 'UPEA'}
                    </div>
                  )}
                </div>
              </div>
            </div>
 
            <h2
              className="text-base sm:text-lg lg:text-2xl font-semibold tracking-[0.42em] uppercase mb-4"
              style={{
                color: 'var(--color-primario)',
                textShadow: '0 0 18px rgba(var(--color-primario-rgb, 0, 166, 81), 0.28)',
              }}
            >
              Carrera de
            </h2>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl">
              <span
                className="block"
                style={{
                  background:
                    'linear-gradient(135deg, #ffffff 0%, var(--color-primario) 42%, var(--color-terciario) 78%, var(--color-secundario) 100%)',
                  backgroundSize: '220% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                  filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.30))',
                }}
              >
                {displayedText || institucion?.institucion_nombre.toUpperCase()}
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 pt-8">
              <div
                className="h-px w-14 sm:w-28"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--color-primario))',
                }}
              />

              <span
                className="px-5 py-2 rounded-full text-sm sm:text-base font-black tracking-[0.35em] border backdrop-blur-md"
                style={{
                  color: 'var(--color-primario)',
                  borderColor: 'rgba(var(--color-primario-rgb, 0, 166, 81), 0.35)',
                  background: 'rgba(2, 6, 23, 0.38)',
                  boxShadow: '0 0 24px rgba(var(--color-primario-rgb, 0, 166, 81), 0.12)',
                }}
              >
                {institucion?.institucion_iniciales}
              </span>

              <div
                className="h-px w-14 sm:w-28"
                style={{
                  background: 'linear-gradient(90deg, var(--color-terciario), transparent)',
                }}
              />
            </div>

            <p className="mt-8 max-w-3xl text-base sm:text-lg lg:text-xl text-white leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
              Formación académica, creatividad proyectual e innovación profesional
              para diseñar espacios funcionales, estéticos y sostenibles.
            </p>
          </div>
        </div>
      </div>
 
      {portadas.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/35 backdrop-blur-xl px-5 py-3">
          {portadas.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                i === currentSlide ? 'w-14 bg-white/20' : 'w-7 bg-white/25 hover:bg-white/45'
              }`}
              aria-label={`Ir a portada ${i + 1}`}
            >
              {i === currentSlide && (
                <div
                  className="absolute inset-y-0 left-0 h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-primario), var(--color-terciario))',
                    animation: 'slideProgress 8s linear forwards',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { institutionApi, utils, DescripcionInstitucion } from '@/lib/api';

interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
}

const navStructure: NavItem[] = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Carrera',
    children: [{ name: 'Nosotros', href: '/nosotros' }],
  },
  {
    name: 'Convocatorias',
    children: [
      { name: 'Convocatorias', href: '/convocatorias' },
      { name: 'Comunicados', href: '/comunicados' },
      { name: 'Avisos', href: '/avisos' },
    ],
  },
  {
    name: 'Cursos',
    children: [
      { name: 'Cursos', href: '/cursos' },
      { name: 'Seminarios', href: '/seminarios' },
    ],
  },
  {
    name: 'Más',
    children: [
      { name: 'Servicios', href: '/servicios' },
      { name: 'Ofertas Académicas', href: '/ofertas' },
      { name: 'Publicaciones', href: '/publicaciones' },
      { name: 'Gacetas', href: '/gacetas' },
      { name: 'Eventos', href: '/eventos' },
      { name: 'Videos', href: '/videos' },
    ],
  },
  { name: 'Contactos', href: '/contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [institucion, setInstitucion] = useState<DescripcionInstitucion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    let animationFrameId: number;
    const animate = () => {
      setAutoRotate((prev) => (prev + 0.25) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    const fetchData = async () => {
      try {
        const data = await institutionApi.getCurrentPrincipal();
        setInstitucion(data);

        if (data.colorinstitucion?.[0]) {
          const colors = data.colorinstitucion[0];
          document.documentElement.style.setProperty('--color-primario', colors.color_primario);
          document.documentElement.style.setProperty('--color-secundario', colors.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', colors.color_terciario);

          const primarioRgb = hexToRgb(colors.color_primario);
          const secundarioRgb = hexToRgb(colors.color_secundario);

          document.documentElement.style.setProperty('--color-primario-rgb', primarioRgb);
          document.documentElement.style.setProperty('--color-secundario-rgb', secundarioRgb);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRotation = ((y - rect.height / 2) / rect.height) * -12;
    const yRotation = ((x - rect.width / 2) / rect.width) * 12;

    setRotateX(xRotation);
    setRotateY(yRotation);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const logoUrl = institucion ? utils.buildImageUrl(institucion.institucion_logo) : '';

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '59, 130, 246';
  }

  const particlePositions = isMounted
    ? [...Array(5)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 10}s`,
        delay: `${Math.random() * 5}s`,
      }))
    : [...Array(5)].map(() => ({
        left: '0%',
        top: '0%',
        duration: '10s',
        delay: '0s',
      }));

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      
      <div className="absolute inset-0 border-b border-slate-200/70 bg-[rgba(255,255,255,0.78)] backdrop-blur-2xl" />
 
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.22) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>
 
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-primario), var(--color-secundario), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex min-h-[88px] items-center justify-between gap-6">
          
          <div
            className="group flex cursor-pointer items-center gap-4"
            onClick={() => scrollToSection('inicio')}
          >
            {loading ? (
              <div className="h-16 w-16 animate-pulse rounded-[1.4rem] bg-slate-200" />
            ) : (
              <div
                className="relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY + autoRotate}deg)`,
                  transition: rotateX === 0 && rotateY === 0 ? 'transform 0.4s ease' : 'transform 0.1s ease-out',
                }}
              >
                <div
                  className="absolute -inset-3 rounded-[1.8rem] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle, rgba(var(--color-primario-rgb,59,130,246),0.20), transparent 70%)',
                  }}
                />

                <div className="relative h-16 w-16 overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                  <div className="absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-slate-200/80" />

                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo Institución"
                      className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                    />
                  ) : (
                    <div className="relative z-10 flex h-full w-full items-center justify-center text-xl font-black text-[var(--color-primario)]">
                      ARQ
                    </div>
                  )}
                </div>

                <div
                  className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: 'var(--color-secundario)' }}
                />
              </div>
            )}

            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <span
                  className="h-px w-10"
                  style={{ backgroundColor: 'var(--color-primario)' }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.35em]"
                  style={{ color: 'var(--color-primario)' }}
                >
                  UPEA
                </span>
              </div>

              <h1 className="mt-1 text-[1.85rem] font-black uppercase tracking-tight text-slate-900 leading-none">
                {institucion?.institucion_nombre || 'Cargando...'}
              </h1>
            </div>
          </div>
 
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center rounded-full border border-slate-200 bg-white/80 px-2 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-md">
              {navStructure.map((item) => (
                <div key={item.name} className="group relative">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-slate-950"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div className="invisible absolute left-1/2 top-full min-w-[240px] -translate-x-1/2 translate-y-4 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white/95 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                          <div className="mb-2 rounded-2xl bg-slate-50 px-4 py-3">
                            <p
                              className="text-[10px] font-bold uppercase tracking-[0.3em]"
                              style={{ color: 'var(--color-primario)' }}
                            >
                              {item.name}
                            </p>
                          </div>

                          {item.children.map((child) => (
                            <div key={child.name} className="relative">
                              {child.children ? (
                                <>
                                  <div className="flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950">
                                    {child.name}
                                    <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                                  </div>

                                  <div className="absolute left-full top-0 ml-2 hidden min-w-[190px] group-hover:block">
                                    <div className="rounded-[1.5rem] border border-slate-200 bg-white/95 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                                      {child.children.map((sub) => (
                                        <a
                                          key={sub.name}
                                          href={sub.href}
                                          onClick={() => setIsOpen(false)}
                                          className="block rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                                        >
                                          {sub.name}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <a
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className="group/link flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                                >
                                  <span>{child.name}</span>
                                  <span
                                    className="h-1.5 w-1.5 rounded-full opacity-0 transition group-hover/link:opacity-100"
                                    style={{ backgroundColor: 'var(--color-secundario)' }}
                                  />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-slate-950"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <a
              href="/enlaces"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:text-slate-950"
            >
              Enlaces
            </a>

            <a
              href="https://servicioadministrador.upea.bo/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full px-5 py-3 text-sm font-black text-white shadow-[0_15px_35px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, var(--color-primario), var(--color-secundario))',
              }}
            >
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
              <span className="relative flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </span>
            </a>
          </div>
 
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:scale-[1.02] hover:shadow-md lg:hidden"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
 
        {isOpen && (
          <div className="pb-4 lg:hidden">
            <div className="mt-3 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3 rounded-[1.5rem] bg-slate-50 p-3">
                <div className="h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo Institución"
                      className="h-full w-full object-contain"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-black text-[var(--color-primario)]">
                      ARQ
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-base font-black uppercase text-slate-900">
                    {institucion?.institucion_nombre || 'Arquitectura'}
                  </h2>
                </div>
              </div>

              <div className="space-y-1">
                {navStructure.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div
                            className="ml-4 mt-1 space-y-1 border-l pl-3"
                            style={{ borderColor: 'rgba(var(--color-primario-rgb,59,130,246),0.35)' }}
                          >
                            {item.children.map((child) => (
                              <div key={child.name}>
                                {child.children ? (
                                  <>
                                    <button
                                      onClick={() => toggleDropdown(child.name)}
                                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                                    >
                                      {child.name}
                                      <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                          activeDropdown === child.name ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </button>

                                    <div
                                      className={`overflow-hidden transition-all duration-300 ${
                                        activeDropdown === child.name ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                      }`}
                                    >
                                      <div className="pl-3">
                                        {child.children.map((sub) => (
                                          <a
                                            key={sub.name}
                                            href={sub.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block rounded-xl px-3 py-2 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                                          >
                                            {sub.name}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <a
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                                  >
                                    {child.name}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4">
                <a
                  href="/enlaces"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-800 transition hover:bg-slate-50"
                >
                  Enlaces
                </a>

                <a
                  href="https://servicioadministrador.upea.bo/sign-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primario), var(--color-secundario))',
                  }}
                >
                  <LogIn className="h-5 w-5" />
                  Iniciar Sesión
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {isMounted && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particlePositions.map((pos, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                backgroundColor: 'rgba(var(--color-secundario-rgb,234,88,12),0.35)',
                left: pos.left,
                top: pos.top,
                animationName: 'particle-float',
                animationDuration: pos.duration,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: pos.delay,
              }}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
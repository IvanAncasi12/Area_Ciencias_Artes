'use client';

import { useState, useEffect } from 'react';
import { 
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ChevronRight,
  GraduationCap,
  Clock
} from 'lucide-react';
import { api, utils } from '@/lib/api';
 
const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Sobre Nosotros', href: '#about' },
  { name: 'Ofertas Académicas', href: '#projects' },
  { name: 'Autoridades', href: '#team' },
  { name: 'Contacto', href: '#contacto' }
];

export default function Footer() {
  const [institucion, setInstitucion] = useState<any>(null);
  const [colors, setColors] = useState({ 
    primario: '#10b981', 
    secundario: '#f59e0b', 
    terciario: '#06b6d4' 
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await api.institution.getCurrentPrincipal();
        setInstitucion(data);
        
        if (data.colorinstitucion?.[0]) {
          const c = data.colorinstitucion[0];

          setColors({
            primario: c.color_primario,
            secundario: c.color_secundario,
            terciario: c.color_terciario
          });
        }
      } catch (error) {
        console.error('Error cargando footer:', error);
      }
    };

    cargar();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!institucion) return null;

  return (
    <footer className="relative overflow-hidden bg-white pt-20 pb-8">
      
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${colors.primario}22 0%, rgba(255,255,255,0.82) 38%, ${colors.terciario}22 100%)
            `,
          }}
        />
 
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-[-14rem] h-[34rem] w-[46rem] origin-top -translate-x-[88%] -rotate-[25deg] rounded-full blur-[80px] opacity-75"
            style={{
              background: `linear-gradient(180deg, ${colors.primario}99 0%, ${colors.secundario}55 45%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-14rem] h-[34rem] w-[46rem] origin-top -translate-x-[12%] rotate-[25deg] rounded-full blur-[80px] opacity-75"
            style={{
              background: `linear-gradient(180deg, ${colors.terciario}99 0%, ${colors.primario}55 45%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[5%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full blur-[90px] opacity-45"
            style={{
              background: `radial-gradient(circle, ${colors.secundario}80 0%, ${colors.primario}35 42%, transparent 72%)`,
            }}
          />
        </div>

        <div className="absolute inset-0 bg-white/42" />
 
        <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:64px_64px]" />
 
        <div
          className="absolute top-0 left-0 w-full h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primario}, ${colors.secundario}, ${colors.terciario}, transparent)`,
            boxShadow: `0 0 24px ${colors.primario}45`,
          }}
        />
 
        <div className="absolute left-8 top-8 w-12 h-12 border-l-2 border-t-2 border-slate-400/40" />
        <div className="absolute right-8 top-8 w-12 h-12 border-r-2 border-t-2 border-slate-400/40" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
           
         
          <div
            className="relative overflow-hidden rounded-[2rem] border bg-white/76 backdrop-blur-xl p-6"
            style={{
              borderColor: `${colors.primario}28`,
              boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
            }}
          >
            <div
              className="absolute -top-20 -right-20 h-52 w-52 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: colors.primario }}
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4">
                {institucion.institucion_logo && (
                  <div
                    className="w-14 h-14 rounded-2xl bg-white border flex items-center justify-center shadow-xl overflow-hidden"
                    style={{
                      borderColor: `${colors.primario}30`,
                      boxShadow: `0 14px 32px ${colors.primario}18`,
                    }}
                  >
                    <img 
                      src={utils.buildImageUrl(institucion.institucion_logo)} 
                      alt="Logo" 
                      className="w-11 h-11 object-contain"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">
                    {institucion.institucion_iniciales || 'UPEA'}
                  </h3>
                  <p
                    className="text-xs font-black tracking-[0.22em] uppercase"
                    style={{ color: colors.primario }}
                  >
                    Institucional
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Formando profesionales con excelencia académica, compromiso social,
                innovación y visión de desarrollo para Bolivia.
              </p>
             
              <div className="flex gap-3 pt-2">
                {institucion.institucion_facebook && (
                  <SocialIcon icon={Facebook} url={institucion.institucion_facebook} color={colors.primario} />
                )}

                {institucion.institucion_youtube && (
                  <SocialIcon icon={Youtube} url={institucion.institucion_youtube} color="#FF0000" />
                )}

                {institucion.institucion_twitter && (
                  <SocialIcon icon={Twitter} url={institucion.institucion_twitter} color={colors.terciario} />
                )}
              </div>
            </div>
          </div>
  
          <div
            className="relative overflow-hidden rounded-[2rem] border bg-white/76 backdrop-blur-xl p-6"
            style={{
              borderColor: `${colors.terciario}28`,
              boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.terciario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
            }}
          >
            <div className="relative z-10 space-y-5">
              <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span
                  className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center"
                  style={{
                    color: colors.primario,
                    borderColor: `${colors.primario}30`,
                  }}
                >
                  <GraduationCap className="w-5 h-5" />
                </span>
                Enlaces Rápidos
              </h4>

              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:text-slate-950 transition-all hover:bg-white/80"
                    >
                      <ChevronRight
                        className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        style={{ color: colors.primario }}
                      />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          <div
            className="relative overflow-hidden rounded-[2rem] border bg-white/76 backdrop-blur-xl p-6"
            style={{
              borderColor: `${colors.secundario}28`,
              boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.secundario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
            }}
          >
            <div className="relative z-10 space-y-5">
              <h4 className="text-lg font-black text-slate-900">
                Contacto
              </h4>

              <ul className="space-y-4">
                {institucion.institucion_direccion && (
                  <ContactItem icon={MapPin} text={institucion.institucion_direccion} color={colors.primario} />
                )}

                {institucion.institucion_telefono1 && (
                  <ContactItem 
                    icon={Phone} 
                    text={String(institucion.institucion_telefono1).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')} 
                    color={colors.secundario}
                    href={`tel:${institucion.institucion_telefono1}`}
                  />
                )}

                {institucion.institucion_correo1 && (
                  <ContactItem 
                    icon={Mail} 
                    text={institucion.institucion_correo1} 
                    color={colors.terciario}
                    href={`mailto:${institucion.institucion_correo1}`}
                  />
                )}
              </ul>
            </div>
          </div>
  
          <div
            className="relative overflow-hidden rounded-[2rem] border bg-white/76 backdrop-blur-xl p-6"
            style={{
              borderColor: `${colors.primario}28`,
              boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
            }}
          >
            <div
              className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: colors.terciario }}
            />

            <div className="relative z-10 space-y-5">
              <h4 className="text-lg font-black text-slate-900">
                Horario de Atención
              </h4>

              <div
                className="p-5 rounded-2xl border bg-white/80"
                style={{
                  borderColor: `${colors.primario}28`,
                  boxShadow: `0 14px 32px ${colors.primario}10`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5" style={{ color: colors.primario }} />
                  <p className="text-slate-700 text-sm font-black">
                    Lunes a Viernes
                  </p>
                </div>

                <p
                  className="text-3xl font-black mt-1"
                  style={{ color: colors.primario }}
                >
                  08:00 - 18:00
                </p>

                <p className="text-slate-500 text-xs mt-2">
                  Atención presencial y virtual
                </p>
              </div>
         
              <button 
                onClick={scrollToTop}
                className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                  boxShadow: `0 14px 28px ${colors.primario}25`,
                }}
              >
                <ArrowUp className="w-4 h-4" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
 
        <div
          className="h-px w-full mb-6"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primario}55, ${colors.terciario}55, transparent)`,
          }}
        />
 
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="font-black" style={{ color: colors.primario }}>
              {institucion.institucion_nombre}
            </span>
            . Todos los derechos reservados.
          </p>

          <p className="flex items-center gap-1 font-bold text-slate-500">
            IAT <span style={{ color: colors.terciario }}>U - TIC</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
 

function SocialIcon({ icon: Icon, url, color }: { icon: any; url: string; color: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-2xl border bg-white/80 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
      style={{ 
        color,
        borderColor: `${color}35`,
        boxShadow: `0 12px 28px ${color}18`,
      }}
      aria-label="Red social"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function ContactItem({
  icon: Icon,
  text,
  color,
  href
}: {
  icon: any;
  text: string;
  color: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-3 text-sm text-slate-600 hover:text-slate-950 transition-colors">
      <span
        className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
        style={{
          color,
          borderColor: `${color}30`,
          boxShadow: `0 10px 24px ${color}12`,
        }}
      >
        <Icon className="w-5 h-5" />
      </span>

      <span className="leading-relaxed font-semibold pt-2">
        {text}
      </span>
    </div>
  );

  return href ? (
    <li>
      <a href={href} className="block">
        {content}
      </a>
    </li>
  ) : (
    <li>{content}</li>
  );
}
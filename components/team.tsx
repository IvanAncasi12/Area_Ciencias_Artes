'use client';

import { useState, useEffect } from 'react';
import { Facebook, Twitter, Phone, Loader2 } from 'lucide-react';
import { api, Autoridad, utils } from '@/lib/api';

export default function Team() {
  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState({ 
    primario: '#10b981', 
    secundario: '#f59e0b', 
    terciario: '#06b6d4' 
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        
        const instData = await api.institution.getCurrentPrincipal();
        if (instData.colorinstitucion?.[0]) {
          const c = instData.colorinstitucion[0];
          setColors({
            primario: c.color_primario,
            secundario: c.color_secundario,
            terciario: c.color_terciario
          });
          document.documentElement.style.setProperty('--color-primario', c.color_primario);
          document.documentElement.style.setProperty('--color-secundario', c.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', c.color_terciario);
        }
 
        const contentData = await api.content.getAll();
        setAutoridades(contentData.autoridad || []);
      } catch (error) {
        console.error('Error cargando autoridades:', error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100 relative overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[120%] w-[32rem] origin-top -translate-x-[78%] -rotate-[28deg] rounded-full blur-3xl opacity-35"
          style={{
            background: `linear-gradient(180deg, ${colors.primario}45, ${colors.secundario}18, transparent 78%)`,
          }}
        />

        <div
          className="absolute left-1/2 top-0 h-[120%] w-[32rem] origin-top -translate-x-[22%] rotate-[28deg] rounded-full blur-3xl opacity-35"
          style={{
            background: `linear-gradient(180deg, ${colors.terciario}45, ${colors.primario}18, transparent 78%)`,
          }}
        />

        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.primario }}
        />

        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.terciario }}
        />

        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(15,23,42,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.25)_1px,transparent_1px)] bg-[size:56px_56px]" />

        <div className="relative z-10 flex items-center gap-4 px-7 py-5 rounded-3xl border border-white/80 bg-white/75 backdrop-blur-xl shadow-2xl shadow-slate-300/40">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border"
            style={{
              color: colors.primario,
              borderColor: `${colors.primario}55`,
              backgroundColor: `${colors.primario}12`,
              boxShadow: `0 18px 40px ${colors.primario}25`,
            }}
          >
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">Cargando autoridades</p>
            <p className="text-slate-500 text-sm">Preparando equipo institucional...</p>
          </div>
        </div>
      </section>
    );
  }

  if (autoridades.length === 0) return null;

  return (
    <section id="team" className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
      
     
      <div className="absolute inset-0 pointer-events-none">
 
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-0 h-[120%] w-[38rem] origin-top -translate-x-[78%] -rotate-[28deg] rounded-full blur-3xl opacity-45"
            style={{
              background: `linear-gradient(180deg, ${colors.primario}45, ${colors.secundario}18, transparent 78%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-0 h-[120%] w-[38rem] origin-top -translate-x-[22%] rotate-[28deg] rounded-full blur-3xl opacity-45"
            style={{
              background: `linear-gradient(180deg, ${colors.terciario}45, ${colors.primario}18, transparent 78%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[18%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl opacity-25"
            style={{
              background: `radial-gradient(circle, ${colors.secundario}40, transparent 68%)`,
            }}
          />
        </div>

        <div
          className="absolute top-10 -left-48 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.primario }}
        />

        <div
          className="absolute bottom-10 -right-48 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: colors.terciario }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: colors.secundario }}
        />
 
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(15,23,42,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.3)_1px,transparent_1px)] bg-[size:72px_72px]" />
 
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0 22%, ${colors.primario} 22.15%, transparent 22.3%),
              linear-gradient(0deg, transparent 0 36%, ${colors.terciario} 36.15%, transparent 36.3%),
              linear-gradient(90deg, transparent 0 72%, ${colors.secundario} 72.15%, transparent 72.3%)
            `,
            backgroundSize: '260px 260px, 320px 320px, 420px 420px',
          }}
        />
 
        <div className="absolute left-8 top-8 w-12 h-12 border-l-2 border-t-2 border-slate-300/70" />
        <div className="absolute right-8 top-8 w-12 h-12 border-r-2 border-t-2 border-slate-300/70" />
        <div className="absolute left-8 bottom-8 w-12 h-12 border-l-2 border-b-2 border-slate-300/70" />
        <div className="absolute right-8 bottom-8 w-12 h-12 border-r-2 border-b-2 border-slate-300/70" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
          
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl mb-6"
            style={{
              borderColor: `${colors.primario}35`,
              backgroundColor: `${colors.primario}10`,
              boxShadow: `0 18px 45px ${colors.primario}18`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: colors.primario,
                boxShadow: `0 0 16px ${colors.primario}`,
              }}
            />

            <span className="text-xs sm:text-sm font-black tracking-[0.28em] uppercase text-slate-700">
              Equipo institucional
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none"
            style={{
              background: `linear-gradient(135deg, ${colors.primario} 0%, ${colors.terciario} 55%, ${colors.secundario} 100%)`,
              backgroundSize: '220% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            Nuestras Autoridades
          </h2>

          <div className="flex items-center justify-center gap-4 mt-7">
            <div
              className="h-px w-20 sm:w-32"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.primario})`,
              }}
            />

            <span
              className="px-4 py-1.5 rounded-full text-xs font-black tracking-[0.25em] uppercase border bg-white/70 backdrop-blur-xl"
              style={{
                color: colors.primario,
                borderColor: `${colors.primario}35`,
              }}
            >
              Dirección
            </span>

            <div
              className="h-px w-20 sm:w-32"
              style={{
                background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
              }}
            />
          </div>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mt-7 leading-relaxed">
            Conoce al equipo directivo que impulsa la formación académica,
            la gestión institucional y el desarrollo profesional de la carrera.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {autoridades.map((aut, idx) => (
            <AuthorityCard key={aut.id_autoridad} autoridad={aut} colors={colors} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
 

function AuthorityCard({ autoridad, colors, index }: { autoridad: Autoridad; colors: any; index: number }) {
  const [imgError, setImgError] = useState(false);
   
  const initials = autoridad.nombre_autoridad 
    ? autoridad.nombre_autoridad.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AU';
 
  const imageUrl = !imgError && autoridad.foto_autoridad 
    ? utils.buildImageUrl(autoridad.foto_autoridad)
    : null;

  return (
    <div 
      className="group relative overflow-hidden rounded-[2rem] border bg-white/80 p-7 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 fade-in-up"
      style={{
        animationDelay: `${index * 150}ms`,
        borderColor: `${colors.primario}28`,
        boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
      }}
    > 
      <div
        className="absolute inset-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px',
        }}
      />

      <div
        className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35"
        style={{ backgroundColor: colors.terciario }}
      />

      <div
        className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: colors.primario }}
      />
 
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.75)_50%,transparent_70%)] translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" />
      </div>
 
      <span
        className="absolute top-5 right-5 text-5xl font-black leading-none opacity-10"
        style={{ color: colors.primario }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
 
      <span className="absolute top-5 left-5 w-9 h-9 border-l-2 border-t-2 opacity-55" style={{ borderColor: colors.primario }} />
      <span className="absolute top-5 right-5 w-9 h-9 border-r-2 border-t-2 opacity-55" style={{ borderColor: colors.terciario }} />
      <span className="absolute bottom-5 left-5 w-9 h-9 border-l-2 border-b-2 opacity-55" style={{ borderColor: colors.terciario }} />
      <span className="absolute bottom-5 right-5 w-9 h-9 border-r-2 border-b-2 opacity-55" style={{ borderColor: colors.primario }} />
  
      <div className="relative mx-auto w-44 h-44 mb-7">
        <div 
          className="absolute inset-0 rounded-full border-2 border-dashed opacity-55 animate-spin-slow" 
          style={{ borderColor: colors.primario }}
        />

        <div 
          className="absolute inset-3 rounded-full border opacity-45" 
          style={{ borderColor: colors.terciario }}
        />

        <div
          className="absolute inset-5 rounded-full blur-xl opacity-25"
          style={{ backgroundColor: colors.primario }}
        />
         
        <div
          className="absolute inset-5 rounded-full overflow-hidden border-4 bg-white shadow-2xl"
          style={{
            borderColor: '#ffffff',
            boxShadow: `0 0 0 2px ${colors.primario}55, 0 22px 55px rgba(15,23,42,0.18), 0 0 38px ${colors.primario}22`,
          }}
        >
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={autoridad.nombre_autoridad || 'Autoridad'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primario}18, ${colors.terciario}14)`,
              }}
            >
              <span className="text-4xl font-black" style={{ color: colors.primario }}>
                {initials}
              </span>
            </div>
          )}
        </div>
         
        <div
          className="absolute bottom-4 right-5 w-5 h-5 border-[3px] border-white rounded-full z-10"
          style={{
            backgroundColor: colors.primario,
            boxShadow: `0 0 18px ${colors.primario}`,
          }}
        />
      </div>
  
      <div className="relative z-10">
        <p className="text-xs font-black tracking-[0.32em] uppercase text-slate-400 mb-3">
          Autoridad
        </p>

        <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight transition-colors">
          {autoridad.nombre_autoridad || 'Nombre no disponible'}
        </h3>

        <p
          className="text-sm font-black tracking-[0.18em] uppercase mb-6 leading-relaxed"
          style={{ color: colors.secundario }}
        >
          {autoridad.cargo_autoridad}
        </p>
      </div>
  
      <div className="relative z-10 flex justify-center gap-3 pt-5 border-t border-slate-200/80">
        {autoridad.facebook_autoridad && (
          <SocialBtn icon={Facebook} url={autoridad.facebook_autoridad} color={colors.primario} />
        )}

        {autoridad.twiter_autoridad && (
          <SocialBtn icon={Twitter} url={autoridad.twiter_autoridad} color={colors.terciario} />
        )}

        {autoridad.celular_autoridad && (
          <SocialBtn icon={Phone} url={`tel:${autoridad.celular_autoridad}`} color={colors.secundario} />
        )}
      </div>
    </div>
  );
}
 

function SocialBtn({ icon: Icon, url, color }: { icon: any; url: string; color: string }) {
  const isPhone = url.startsWith('tel:');

  return (
    <a 
      href={url} 
      target={isPhone ? undefined : '_blank'}
      rel={isPhone ? undefined : 'noopener noreferrer'}
      className="relative w-11 h-11 rounded-2xl border bg-white/80 flex items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      style={{
        color,
        borderColor: `${color}30`,
        boxShadow: `0 10px 25px ${color}18`,
      }}
      aria-label="Red social"
    >
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${color}18, rgba(255,255,255,0.8))`,
        }}
      />

      <Icon className="relative z-10 w-5 h-5" />
    </a>
  );
}
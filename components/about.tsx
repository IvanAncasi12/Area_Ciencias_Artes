'use client';

import { useState, useEffect } from 'react';
import { Target, Eye, BookOpen, Award, TrendingUp, Users } from 'lucide-react';
import { api, DescripcionInstitucion } from '@/lib/api';
 
const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function About() {
  const [institucion, setInstitucion] = useState<DescripcionInstitucion | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mision' | 'vision'>('mision');
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
          
          document.documentElement.style.setProperty('--color-primario', c.color_primario);
          document.documentElement.style.setProperty('--color-secundario', c.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', c.color_terciario);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 top-[-8rem] h-[130%] w-[48rem] origin-top -translate-x-[88%] -rotate-[30deg] rounded-full blur-[80px] opacity-65"
            style={{
              background: `linear-gradient(180deg, ${colors.primario}99 0%, ${colors.secundario}55 42%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-8rem] h-[130%] w-[48rem] origin-top -translate-x-[12%] rotate-[30deg] rounded-full blur-[80px] opacity-65"
            style={{
              background: `linear-gradient(180deg, ${colors.terciario}99 0%, ${colors.primario}55 42%, transparent 80%)`,
            }}
          />

          <div className="absolute inset-0 bg-white/45" />
        </div>

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
            <span className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">
              Cargando información
            </p>
            <p className="text-slate-500 text-sm">
              Preparando datos institucionales...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-white">
       
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${colors.primario}28 0%, rgba(255,255,255,0.74) 34%, ${colors.terciario}28 100%)
            `,
          }}
        />

        <div
          className="absolute top-[-10rem] left-[-12rem] w-[34rem] h-[34rem] rounded-full blur-3xl opacity-35"
          style={{ backgroundColor: colors.primario }}
        />

        <div
          className="absolute top-[24rem] right-[-12rem] w-[36rem] h-[36rem] rounded-full blur-3xl opacity-35"
          style={{ backgroundColor: colors.terciario }}
        />

        <div
          className="absolute bottom-20 left-1/2 w-[42rem] h-[42rem] -translate-x-1/2 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: colors.secundario }}
        />

        <div className="absolute inset-0 bg-white/35" />

        <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0 22%, ${colors.primario} 22.15%, transparent 22.3%),
              linear-gradient(0deg, transparent 0 36%, ${colors.terciario} 36.15%, transparent 36.3%),
              linear-gradient(90deg, transparent 0 72%, ${colors.secundario} 72.15%, transparent 72.3%)
            `,
            backgroundSize: '260px 260px, 320px 320px, 420px 420px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
       
        <div className="text-center mb-20 space-y-5">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl bg-white/75"
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
              Sobre la carrera
            </span>
          </div>

          <h2
            className="text-4xl lg:text-6xl font-black tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${colors.primario} 0%, ${colors.terciario} 55%, ${colors.secundario} 100%)`,
              backgroundSize: '220% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            {institucion?.institucion_nombre}
          </h2>

          <div
            className="w-32 h-1.5 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors.primario}, ${colors.secundario}, ${colors.terciario})`,
              boxShadow: `0 0 24px ${colors.primario}55`,
            }}
          />
        </div>
  
        <div className="mb-24">
          <div
            className="group relative overflow-hidden rounded-[2.2rem] p-8 lg:p-12 border backdrop-blur-xl"
            style={{
              background: `
                linear-gradient(135deg, ${hexToRgba(colors.primario, 0.18)} 0%, rgba(255,255,255,0.82) 42%, ${hexToRgba(colors.terciario, 0.20)} 100%)
              `,
              borderColor: `${colors.primario}45`,
              boxShadow: `0 30px 80px rgba(15,23,42,0.12), 0 22px 55px ${colors.primario}18, inset 0 1px 0 rgba(255,255,255,0.90)`,
            }}
          >
            <div
              className="absolute -top-28 -right-28 w-80 h-80 rounded-full blur-3xl opacity-35 group-hover:opacity-50 transition-opacity"
              style={{ backgroundColor: colors.primario }}
            />

            <div
              className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full blur-3xl opacity-30 group-hover:opacity-45 transition-opacity"
              style={{ backgroundColor: colors.terciario }}
            />

            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(15,23,42,0.18) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(15,23,42,0.18) 1px, transparent 1px)
                `,
                backgroundSize: '42px 42px',
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border bg-white/80 shadow-xl"
                  style={{
                    color: colors.primario,
                    borderColor: `${colors.primario}35`,
                    boxShadow: `0 18px 38px ${colors.primario}22`,
                  }}
                >
                  <Award className="w-9 h-9" />
                </div>

                <div>
                  <span
                    className="inline-flex px-3 py-1 rounded-full text-xs font-black tracking-[0.2em] uppercase text-white mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                    }}
                  >
                    Formación profesional
                  </span>

                  <h3 className="text-3xl lg:text-4xl font-black text-slate-900">
                    Perfil Profesional
                  </h3>
                </div>
              </div>

              <div
                className="text-slate-700 leading-relaxed space-y-4 text-lg content-html"
                dangerouslySetInnerHTML={{ __html: institucion?.institucion_objetivos || '' }}
              />
            </div>
          </div> 
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* HISTORIA */}
          <div
            className="group relative overflow-hidden rounded-[2rem] p-8 border backdrop-blur-xl min-h-[420px]"
            style={{
              background: `
                linear-gradient(135deg, ${hexToRgba(colors.terciario, 0.20)} 0%, rgba(255,255,255,0.82) 44%, ${hexToRgba(colors.secundario, 0.18)} 100%)
              `,
              borderColor: `${colors.terciario}42`,
              boxShadow: `0 24px 70px rgba(15,23,42,0.11), 0 18px 45px ${colors.terciario}18, inset 0 1px 0 rgba(255,255,255,0.90)`,
            }}
          >
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 group-hover:opacity-45 transition-opacity"
              style={{ backgroundColor: colors.terciario }}
            />

            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: colors.secundario }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-7">
                <div
                  className="w-14 h-14 rounded-2xl border bg-white/80 flex items-center justify-center shadow-xl"
                  style={{
                    color: colors.terciario,
                    borderColor: `${colors.terciario}35`,
                    boxShadow: `0 16px 35px ${colors.terciario}20`,
                  }}
                >
                  <BookOpen className="w-7 h-7" />
                </div>

                <div>
                  <span
                    className="inline-flex px-3 py-1 rounded-full text-xs font-black tracking-[0.2em] uppercase text-white mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${colors.terciario}, ${colors.secundario})`,
                    }}
                  >
                    Trayectoria
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900">
                    Nuestra Historia
                  </h3>
                </div>
              </div>

              <div
                className="text-slate-700 leading-relaxed content-html"
                dangerouslySetInnerHTML={{ __html: institucion?.institucion_historia || '' }}
              />
            </div>
          </div> 
 
          <div className="space-y-6">
            <div
              className="flex gap-2 p-2 rounded-2xl border backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(colors.primario, 0.14)}, ${hexToRgba(colors.terciario, 0.14)})`,
                borderColor: `${colors.primario}30`,
                boxShadow: `0 18px 45px ${colors.primario}10`,
              }}
            >
              {[
                { id: 'mision', label: 'Misión', icon: Target, color: colors.primario },
                { id: 'vision', label: 'Visión', icon: Eye, color: colors.terciario }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black transition-all duration-300 ${
                    activeTab === tab.id ? 'shadow-lg scale-[1.03]' : 'opacity-80 hover:opacity-100 hover:bg-white/60'
                  }`}
                  style={{
                    background:
                      activeTab === tab.id
                        ? `linear-gradient(135deg, ${tab.color}, ${activeTab === 'mision' ? colors.secundario : colors.primario})`
                        : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : tab.color,
                    boxShadow: activeTab === tab.id ? `0 16px 35px ${tab.color}30` : 'none',
                  }}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              className="relative overflow-hidden rounded-[2rem] p-8 border backdrop-blur-xl min-h-[420px]"
              style={{
                background:
                  activeTab === 'mision'
                    ? `linear-gradient(135deg, ${hexToRgba(colors.primario, 0.22)} 0%, rgba(255,255,255,0.82) 46%, ${hexToRgba(colors.secundario, 0.18)} 100%)`
                    : `linear-gradient(135deg, ${hexToRgba(colors.terciario, 0.22)} 0%, rgba(255,255,255,0.82) 46%, ${hexToRgba(colors.primario, 0.18)} 100%)`,
                borderColor: activeTab === 'mision' ? `${colors.primario}42` : `${colors.terciario}42`,
                boxShadow:
                  activeTab === 'mision'
                    ? `0 24px 70px rgba(15,23,42,0.11), 0 18px 45px ${colors.primario}18, inset 0 1px 0 rgba(255,255,255,0.90)`
                    : `0 24px 70px rgba(15,23,42,0.11), 0 18px 45px ${colors.terciario}18, inset 0 1px 0 rgba(255,255,255,0.90)`,
              }}
            >
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-35"
                style={{
                  backgroundColor: activeTab === 'mision' ? colors.primario : colors.terciario,
                }}
              />

              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25"
                style={{
                  backgroundColor: activeTab === 'mision' ? colors.secundario : colors.primario,
                }}
              />

              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(15,23,42,0.18) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(15,23,42,0.18) 1px, transparent 1px)
                  `,
                  backgroundSize: '42px 42px',
                }}
              />

              <div className="relative z-10">
                {activeTab === 'mision' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl border bg-white/80 flex items-center justify-center shadow-xl"
                        style={{
                          color: colors.primario,
                          borderColor: `${colors.primario}35`,
                          boxShadow: `0 16px 35px ${colors.primario}20`,
                        }}
                      >
                        <Target className="w-7 h-7" />
                      </div>

                      <div>
                        <span
                          className="inline-flex px-3 py-1 rounded-full text-xs font-black tracking-[0.2em] uppercase text-white mb-2"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primario}, ${colors.secundario})`,
                          }}
                        >
                          Propósito
                        </span>

                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900">
                          Misión
                        </h3>
                      </div>
                    </div>

                    <div
                      className="text-slate-700 leading-relaxed content-html"
                      dangerouslySetInnerHTML={{ __html: institucion?.institucion_mision || '' }}
                    />
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl border bg-white/80 flex items-center justify-center shadow-xl"
                        style={{
                          color: colors.terciario,
                          borderColor: `${colors.terciario}35`,
                          boxShadow: `0 16px 35px ${colors.terciario}20`,
                        }}
                      >
                        <Eye className="w-7 h-7" />
                      </div>

                      <div>
                        <span
                          className="inline-flex px-3 py-1 rounded-full text-xs font-black tracking-[0.2em] uppercase text-white mb-2"
                          style={{
                            background: `linear-gradient(135deg, ${colors.terciario}, ${colors.primario})`,
                          }}
                        >
                          Futuro
                        </span>

                        <h3 className="text-2xl lg:text-3xl font-black text-slate-900">
                          Visión
                        </h3>
                      </div>
                    </div>

                    <div
                      className="text-slate-700 leading-relaxed content-html"
                      dangerouslySetInnerHTML={{ __html: institucion?.institucion_vision || '' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {[
            { label: 'Años de Trayectoria', value: '+43', icon: Award, color: colors.primario },
            { label: 'Egresados', value: '5000+', icon: Users, color: colors.secundario },
            { label: 'Proyectos', value: '200+', icon: TrendingUp, color: colors.terciario },
            { label: 'Especialidades', value: '5', icon: BookOpen, color: colors.primario }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[2rem] p-6 text-center border backdrop-blur-xl hover:-translate-y-2 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(stat.color, 0.18)}, rgba(255,255,255,0.80))`,
                borderColor: `${stat.color}35`,
                boxShadow: `0 22px 55px rgba(15,23,42,0.10), 0 16px 35px ${stat.color}16`,
              }}
            >
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity"
                style={{ backgroundColor: stat.color }}
              />

              <div className="relative z-10">
                <stat.icon
                  className="w-8 h-8 mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ color: stat.color }}
                />

                <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>

                <div className="text-sm text-slate-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
 
        <VideoSection colors={colors} institucion={institucion} />
      </div>
    </section>
  );
}
  

function VideoSection({ colors, institucion }: { colors: any, institucion: DescripcionInstitucion | null }) {
  const videoUrl = institucion?.institucion_link_video_vision;

  if (!videoUrl) return null;
 
  const getYouTubeId = (url: string) => {
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1].split('?')[0];
    }

    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  if (!videoId) return null;

  return (
    <div className="mt-24">
      <div className="text-center mb-12 space-y-4">
        <h3
          className="text-3xl lg:text-4xl font-black"
          style={{
            background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario}, ${colors.secundario})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Nuestra Visión en Acción
        </h3>

        <p className="text-slate-600 max-w-2xl mx-auto">
          Descubre nuestro compromiso con la excelencia y la innovación.
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        <div
          className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 bg-white"
          style={{
            borderColor: hexToRgba(colors.primario, 0.35),
            boxShadow: `0 30px 85px rgba(15,23,42,0.18), 0 22px 55px ${hexToRgba(colors.primario, 0.22)}`,
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
            title="Video Institucional"
            className="absolute inset-0 w-full h-full"
            allow="fullscreen"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
 
        <div
          className="absolute -inset-4 rounded-[2.5rem] opacity-20 blur-xl -z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors.primario} 0%, ${colors.terciario} 45%, transparent 75%)`,
          }}
        />
      </div>
    </div>
  );
}
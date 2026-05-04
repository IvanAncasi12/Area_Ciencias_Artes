'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, ArrowRight, Award } from 'lucide-react';
import { api, OfertaAcademica } from '@/lib/api';

export default function Gallery() {
  const [ofertas, setOfertas] = useState<OfertaAcademica[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOferta, setSelectedOferta] = useState<OfertaAcademica | null>(null);
  const [colors, setColors] = useState({ 
    primario: '#10b981', 
    secundario: '#f59e0b', 
    terciario: '#06b6d4' 
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try { 
        const instData = await api.institution.getCurrentPrincipal();

        if (instData.colorinstitucion?.[0]) {
          const c = instData.colorinstitucion[0];

          setColors({
            primario: c.color_primario,
            secundario: c.color_secundario,
            terciario: c.color_terciario
          });
        }
  
        const data = await api.events.getOfertasAcademicas(); 
        const activas = data.filter((o: OfertaAcademica) => o.ofertas_estado === 1);

        setOfertas(activas);
      } catch (error) {
        console.error('Error cargando ofertas:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);
 
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Por definir';

    return new Date(dateString).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-24 bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
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

          <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:72px_72px]" />
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
            <Award className="w-7 h-7 animate-pulse" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">
              Cargando ofertas académicas
            </p>
            <p className="text-slate-500 text-sm">
              Preparando programas disponibles...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden bg-white">
       
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${colors.primario}24 0%, rgba(255,255,255,0.78) 36%, ${colors.terciario}24 100%)
            `,
          }}
        />
 
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-[-10rem] h-[150%] w-[54rem] origin-top -translate-x-[92%] -rotate-[31deg] rounded-full blur-[78px] opacity-90"
            style={{
              background: `linear-gradient(180deg, ${colors.primario}bb 0%, ${colors.secundario}75 42%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-10rem] h-[150%] w-[54rem] origin-top -translate-x-[8%] rotate-[31deg] rounded-full blur-[78px] opacity-90"
            style={{
              background: `linear-gradient(180deg, ${colors.terciario}bb 0%, ${colors.primario}75 42%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[12%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-[95px] opacity-65"
            style={{
              background: `radial-gradient(circle, ${colors.secundario}99 0%, ${colors.primario}45 38%, transparent 72%)`,
            }}
          />
        </div>

        <div
          className="absolute top-10 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: colors.primario }}
        />

        <div
          className="absolute bottom-10 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: colors.terciario }}
        />

        <div className="absolute inset-0 bg-white/38" />

        <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0 22%, ${colors.primario} 22.15%, transparent 22.3%),
              linear-gradient(0deg, transparent 0 36%, ${colors.terciario} 36.15%, transparent 36.3%),
              linear-gradient(90deg, transparent 0 72%, ${colors.secundario} 72.15%, transparent 72.3%)
            `,
            backgroundSize: '260px 260px, 320px 320px, 420px 420px',
          }}
        />

        <div className="absolute left-8 top-8 w-12 h-12 border-l-2 border-t-2 border-slate-400/45" />
        <div className="absolute right-8 top-8 w-12 h-12 border-r-2 border-t-2 border-slate-400/45" />
        <div className="absolute left-8 bottom-8 w-12 h-12 border-l-2 border-b-2 border-slate-400/45" />
        <div className="absolute right-8 bottom-8 w-12 h-12 border-r-2 border-b-2 border-slate-400/45" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* ENCABEZADO */}
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
              Formación académica
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
            Ofertas Académicas
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
              Programas
            </span>

            <div
              className="h-px w-20 sm:w-32"
              style={{
                background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
              }}
            />
          </div>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mt-7 leading-relaxed">
            Cursos, diplomados y programas de especialización para fortalecer tu desarrollo profesional.
          </p>
        </div>
  
        {ofertas.length === 0 ? (
          <div className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-16 text-center shadow-2xl shadow-slate-300/30">
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
              style={{ backgroundColor: colors.primario }}
            />

            <Award
              className="w-16 h-16 mx-auto mb-5 opacity-70"
              style={{ color: colors.primario }}
            />

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              No hay ofertas académicas disponibles
            </h3>

            <p className="text-slate-500">
              Pronto publicaremos nuevas oportunidades académicas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {ofertas.map((oferta, index) => (
              <div
                key={oferta.ofertas_id}
                onClick={() => setSelectedOferta(oferta)}
                className="group cursor-pointer relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3"
                style={{
                  borderColor: `${colors.primario}28`,
                  boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                }}
              >
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

                <div
                  className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                  style={{ backgroundColor: colors.terciario }}
                />

                <div
                  className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: colors.primario }}
                />

                <span
                  className="absolute top-5 right-5 z-20 text-5xl font-black leading-none opacity-10"
                  style={{ color: colors.primario }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div
                  className="relative h-64 overflow-hidden bg-white"
                  style={{
                    borderBottom: `1px solid ${colors.primario}22`,
                  }}
                >
                  {oferta.ofertas_imagen ? (
                    <img
                      src={oferta.ofertas_imagen}
                      alt={oferta.ofertas_titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primario}18, ${colors.terciario}14)`,
                      }}
                    >
                      <Calendar
                        className="w-16 h-16 opacity-60"
                        style={{ color: colors.primario }}
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

                  <span
                    className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-black text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                      boxShadow: `0 12px 28px ${colors.primario}28`,
                    }}
                  >
                    Oferta Académica
                  </span>
                </div>

                <div className="relative z-10 p-6 space-y-4">
                  <h3 className="text-xl font-black text-slate-900 line-clamp-2 leading-tight">
                    {oferta.ofertas_titulo}
                  </h3>

                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {oferta.ofertas_descripcion}
                  </p>
               
                  <div className="pt-4 border-t border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border"
                        style={{
                          color: colors.primario,
                          borderColor: `${colors.primario}30`,
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                      </span>

                      <span>
                        <b className="text-slate-800">Inicio:</b> {formatDate(oferta.ofertas_inscripciones_ini)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border"
                        style={{
                          color: colors.terciario,
                          borderColor: `${colors.terciario}30`,
                        }}
                      >
                        <Clock className="w-4 h-4" />
                      </span>

                      <span>
                        <b className="text-slate-800">Fin:</b> {formatDate(oferta.ofertas_inscripciones_fin)}
                      </span>
                    </div>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 text-sm font-black"
                    style={{ color: colors.primario }}
                  >
                    Ver detalle <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
 
        {/* MODAL */}
        {selectedOferta && (
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOferta(null)}
          >
            <div
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[2rem] border bg-white/95 backdrop-blur-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
              style={{
                borderColor: `${colors.primario}35`,
                boxShadow: `0 30px 90px rgba(15,23,42,0.35), 0 20px 55px ${colors.primario}18`,
              }}
            >
              <button
                onClick={() => setSelectedOferta(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-xl border border-slate-200"
                aria-label="Cerrar detalle"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>

              <div className="relative h-72 overflow-hidden">
                {selectedOferta.ofertas_imagen ? (
                  <img
                    src={selectedOferta.ofertas_imagen}
                    alt={selectedOferta.ofertas_titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primario}18, ${colors.terciario}14)`,
                    }}
                  >
                    <Calendar
                      className="w-20 h-20 opacity-60"
                      style={{ color: colors.primario }}
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                <span
                  className="absolute bottom-5 left-5 px-4 py-2 rounded-full text-xs font-black text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                    boxShadow: `0 12px 28px ${colors.primario}28`,
                  }}
                >
                  Oferta Académica
                </span>
              </div>

              <div className="p-8 space-y-6">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  {selectedOferta.ofertas_titulo}
                </h2>
                
                <div className="space-y-3">
                  <h3
                    className="text-lg font-black"
                    style={{ color: colors.primario }}
                  >
                    Descripción
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {selectedOferta.ofertas_descripcion}
                  </p>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-2xl border bg-white"
                    style={{
                      borderColor: `${colors.primario}30`,
                      boxShadow: `0 14px 32px ${colors.primario}12`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5" style={{ color: colors.primario }} />
                      <span className="font-black" style={{ color: colors.primario }}>
                        Inscripciones
                      </span>
                    </div>

                    <p className="text-sm text-slate-700">
                      {formatDate(selectedOferta.ofertas_inscripciones_ini)}
                    </p>

                    <p className="text-xs text-slate-500">
                      Hasta: {formatDate(selectedOferta.ofertas_inscripciones_fin)}
                    </p>
                  </div>

                  {selectedOferta.ofertas_fecha_examen && (
                    <div
                      className="p-4 rounded-2xl border bg-white"
                      style={{
                        borderColor: `${colors.terciario}30`,
                        boxShadow: `0 14px 32px ${colors.terciario}12`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5" style={{ color: colors.terciario }} />
                        <span className="font-black" style={{ color: colors.terciario }}>
                          Examen
                        </span>
                      </div>

                      <p className="text-sm text-slate-700">
                        {formatDate(selectedOferta.ofertas_fecha_examen)}
                      </p>
                    </div>
                  )}
                </div>
 
                {selectedOferta.ofertas_referencia && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-5 h-5" style={{ color: colors.primario }} />
                    <span>{selectedOferta.ofertas_referencia}</span>
                  </div>
                )}
 
                <button
                  onClick={() => window.open(`mailto:info@upea.bo?subject=Información sobre ${selectedOferta.ofertas_titulo}`, '_blank')}
                  className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all hover:scale-105 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                    boxShadow: `0 14px 28px ${colors.primario}25`,
                  }}
                >
                  Más Información
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
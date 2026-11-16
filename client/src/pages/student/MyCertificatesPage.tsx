import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Certificate } from '../../types';
import { Award, ShieldCheck, ExternalLink, Calendar, Trophy } from 'lucide-react';

export const MyCertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const res = await api.getMyCertificates();
      if (res.success && res.data) {
        setCertificates(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Verifiable Certificates</h1>
        <p className="text-xs text-slate-500 mt-1">
          Officially authenticated digital certificates issued by CT University Directorate of Student Welfare with unique cryptographic QR verification codes.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No Certificates Issued Yet</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Certificates are issued automatically upon conclusion of competitions and verification of official ranks by DSW.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => {
            const isWinner = cert.type === 'WINNER';

            return (
              <div
                key={cert._id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-xl transition-all relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                      {cert.certificateNumber}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isWinner
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isWinner ? '🏆 Merit Winner' : 'Participation'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{cert.competitionTitle}</h3>
                    <p className="text-xs font-bold text-amber-600 mt-1 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{cert.achievement}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cert.schoolName || 'CT University'}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to={`/verify-certificate/${cert.certificateNumber}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View & Print Official Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

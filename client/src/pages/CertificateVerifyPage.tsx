import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ShieldCheck, AlertCircle, ArrowLeft, Printer, Award, CheckCircle2 } from 'lucide-react';

export const CertificateVerifyPage: React.FC = () => {
  const { certNumber } = useParams<{ certNumber: string }>();
  const [certData, setCertData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (certNumber) {
      verify(certNumber);
    }
  }, [certNumber]);

  const verify = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.verifyCertificate(id);
      if (res.success && res.data) {
        setCertData(res.data);
      } else {
        setError(res.message || 'Certificate verification failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Certificate could not be verified.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between no-print">
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Competition Portal</span>
        </Link>
        {certData && (
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Certificate</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-3" />
          <p className="text-xs text-slate-400">Verifying certificate cryptographic signatures with CT University database...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-rose-200 shadow-sm space-y-3">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Certificate Verification Failed</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">{error}</p>
          <p className="text-[11px] text-slate-400">
            Please ensure you have entered the exact Certificate Number or scanned the authentic QR code.
          </p>
        </div>
      ) : certData ? (
        <div className="space-y-6">
          {/* Verification Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between no-print">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-950">Officially Authenticated Certificate</h3>
                <p className="text-xs text-emerald-700">
                  Verified as genuine in the CT University Competition Registry.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-900">{certData.certificateNumber}</span>
              <p className="text-[10px] text-emerald-600">Issued: {new Date(certData.issueDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Authentic Printable Certificate Preview */}
          <div
            id="printable-certificate"
            className="bg-white rounded-3xl border-8 border-double border-slate-300 p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <div className="text-9xl font-extrabold tracking-widest text-slate-900">CTU</div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* University Header */}
              <div className="space-y-1">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-ctu-navy text-white flex items-center justify-center text-xl font-black shadow-md">
                  CTU
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                  CT UNIVERSITY
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Ludhiana, Punjab, India • Directorate of Student Welfare
                </p>
              </div>

              <div className="h-0.5 w-32 bg-amber-500 mx-auto my-4" />

              <p className="text-xs uppercase font-extrabold tracking-widest text-blue-900">
                {certData.achievement}
              </p>

              {/* Recipient */}
              <div className="space-y-1 py-2">
                <p className="text-xs italic text-slate-500">This is proudly presented to</p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
                  {certData.recipientName}
                </h2>
                <p className="text-xs font-semibold text-slate-600">{certData.schoolName || 'CT University'}</p>
              </div>

              {/* Competition details */}
              <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                for distinguished achievement and meritorious excellence in{' '}
                <span className="font-bold text-slate-900">"{certData.competitionTitle}"</span> organized under the
                auspices of the Directorate of Student Welfare, CT University.
              </p>

              {/* Signatures & Verification footer */}
              <div className="pt-8 sm:pt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end border-t border-slate-100 mt-8 text-xs">
                <div className="space-y-1 text-center">
                  <div className="font-serif italic text-base text-slate-800">Dr. Gurpreet Singh</div>
                  <div className="h-0.5 w-24 bg-slate-400 mx-auto" />
                  <p className="text-[11px] font-bold text-slate-700">Director Student Welfare</p>
                  <p className="text-[9px] text-slate-400">CT University</p>
                </div>

                <div className="space-y-1 text-center hidden sm:block">
                  <div className="w-14 h-14 mx-auto rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] font-extrabold text-amber-700 bg-amber-50/50">
                    SEAL
                  </div>
                  <p className="text-[10px] font-mono font-bold text-slate-500">{certData.certificateNumber}</p>
                </div>

                <div className="space-y-1 text-center">
                  <div className="font-serif italic text-base text-slate-800">Dr. Satish Kumar</div>
                  <div className="h-0.5 w-24 bg-slate-400 mx-auto" />
                  <p className="text-[11px] font-bold text-slate-700">Vice Chancellor</p>
                  <p className="text-[9px] text-slate-400">CT University</p>
                </div>
              </div>

              <div className="pt-4 text-[10px] text-slate-400 font-mono">
                Verification Security ID: {certData.verificationCode} • Issue Date: {new Date(certData.issueDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

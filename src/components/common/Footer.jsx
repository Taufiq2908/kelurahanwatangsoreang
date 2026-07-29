import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  const siteName = 'Kelurahan Watang Soreang';
  const address = settings?.contact?.address || 'Jl. Bau Massepe No. 1, Kel. Watang Soreang\nKec. Soreang, Kota Parepare\nSulawesi Selatan 91131';
  const opHours = settings?.contact?.op_hours || 'Senin – Jumat, 08.00 – 16.00 WITA';
  const phone = settings?.contact?.phone || '(0421) 21234';
  const whatsapp = settings?.contact?.whatsapp || '6282198765432';
  const email = settings?.contact?.email || 'watangsoreang@parepare.go.id';
  const instagram = settings?.social?.instagram || 'https://instagram.com';
  const facebook = settings?.social?.facebook || 'https://facebook.com';
  const youtube = settings?.social?.youtube || 'https://youtube.com';
  const copyright = `© 2026 Kelurahan Watang Soreang. Dikembangkan oleh KKN-T Gelombang 115 dan 116 Universitas Hasanuddin. Dikelola oleh Pemerintah Kelurahan Watang Soreang.`;

  return (
    <footer className="bg-surface-900 text-white pt-16 pb-12 md:pt-20 md:pb-12 border-t-[6px] border-emerald-700">
      <div className="container-editorial px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-white/30" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                Website Resmi Pemerintah
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 leading-tight">
              {siteName}
            </h3>
            
            <div className="text-xs md:text-sm text-surface-400 font-medium leading-loose border-l border-white/10 pl-5 mt-6 whitespace-pre-line">
              {address}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20 w-full lg:w-auto">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.2em] mb-3">Jam Operasional</h4>
                <p className="text-[11px] md:text-xs text-surface-400 font-medium">{opHours}</p>
              </div>
              <div>
                <h4 className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.2em] mb-3">Kontak Resmi</h4>
                <div className="flex flex-col gap-2.5">
                  <p className="text-xs md:text-sm font-bold text-white">Telepon: {phone}</p>
                  {whatsapp && whatsapp !== '-' && (
                    <a href={`https://wa.me/${String(whatsapp).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                      WhatsApp Kelurahan ↗
                    </a>
                  )}
                  {email && email !== '-' && (
                    <a href={`mailto:${email}`} className="text-xs md:text-sm font-medium text-surface-300 hover:text-white transition-colors mt-0.5">
                      {email}
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.2em] mb-3">Media Sosial</h4>
                <div className="flex flex-col gap-3">
                  {instagram && instagram !== '-' && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-surface-300 hover:text-white transition-colors flex items-center gap-2">
                      Instagram
                    </a>
                  )}
                  {facebook && facebook !== '-' && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-surface-300 hover:text-white transition-colors flex items-center gap-2">
                      Facebook
                    </a>
                  )}
                  {youtube && youtube !== '-' && (
                    <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-surface-300 hover:text-white transition-colors flex items-center gap-2">
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="text-[9px] md:text-[10px] text-surface-500 font-bold uppercase tracking-[0.15em] leading-relaxed">
            {copyright}
          </p>
        </div>
        
      </div>
    </footer>
  );
}

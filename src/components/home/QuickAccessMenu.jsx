import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Bell, Phone, MessageSquareWarning, HelpCircle, Info, ChevronRight } from 'lucide-react'
import { fadeUpStaggerItemVariants, staggerContainerVariants } from '@/design/motion'

export default function QuickAccessMenu() {
  const menuItems = [
    { id: 'layanan', label: 'Layanan Administrasi', desc: 'Surat Pengantar & Keterangan', icon: FileText, path: '/layanan' },
    { id: 'pengumuman', label: 'Pengumuman Resmi', desc: 'Informasi Kelurahan', icon: Bell, path: '/pengumuman' },
    { id: 'kontak', label: 'Direktori Kontak', desc: 'Aparatur & Darurat', icon: Phone, path: '/kontak' },
    { id: 'aspirasi', label: 'Lapor & Aspirasi', desc: 'Sampaikan Keluhan', icon: MessageSquareWarning, path: '/aspirasi' },
    { id: 'faq', label: 'Tanya Jawab (FAQ)', desc: 'Pertanyaan Umum', icon: HelpCircle, path: '/faq' },
    { id: 'profil', label: 'Profil Kelurahan', desc: 'Sejarah & Visi Misi', icon: Info, path: '/profil' },
  ]

  return (
    <section className="bg-white pt-10 pb-12 md:pt-16 md:pb-16 border-b border-surface-200">
      <div className="container-editorial px-6 md:px-12">
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4"
        >
          {menuItems.map((item) => (
            <motion.div key={item.id} variants={fadeUpStaggerItemVariants}>
              <Link
                to={item.path}
                className="group flex flex-col justify-center p-4 md:p-5 bg-white border border-surface-200 hover:border-emerald-600/30 rounded-xl hover:bg-emerald-50/30 hover:shadow-[0_2px_12px_-4px_rgba(16,185,129,0.1)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
                style={{ minHeight: '84px' }}
              >
                <div className="flex items-start justify-between mb-1.5 md:mb-2">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-emerald-700/80 group-hover:text-emerald-600 transition-colors duration-300" strokeWidth={2.5} />
                    <h3 className="text-[13px] md:text-[15px] font-bold text-surface-900 group-hover:text-emerald-800 transition-colors duration-300 leading-tight">
                      {item.label}
                    </h3>
                  </div>
                </div>
                <p className="text-[11px] md:text-xs font-medium text-surface-500 pl-7 leading-snug">
                  {item.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

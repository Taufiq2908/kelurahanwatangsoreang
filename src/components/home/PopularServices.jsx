import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, AlertCircle } from 'lucide-react'
import { fadeUpStaggerItemVariants, staggerContainerVariants } from '@/design/motion'
import SectionHeader from '@/components/common/SectionHeader'
import { useServices } from '@/hooks/useServices'

export default function PopularServices() {
  const { services, loading, error } = useServices()
  
  const popularServices = services
    .filter(s => s.featured === true || String(s.featured).toUpperCase() === 'TRUE')
    .slice(0, 4)

  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 bg-surface-50 border-b border-surface-200">
      <div className="container-editorial px-6 md:px-12">
        <SectionHeader 
          label="Layanan Publik"
          title="Direktori Layanan"
          description="Dokumen administrasi kependudukan yang paling sering diurus warga."
          linkText="Lihat Semua Layanan"
          linkTo="/layanan"
          icon={FileText}
        />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-12 text-rose-600">
            <AlertCircle className="w-8 h-8 mb-3" />
            <p className="text-sm font-medium">Gagal memuat layanan populer.</p>
          </div>
        ) : popularServices.length > 0 ? (
          <motion.div 
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
          >
            {popularServices.map((service) => (
              <motion.div key={service.id} variants={fadeUpStaggerItemVariants}>
              <Link
                to="/layanan"
                className="group flex flex-col justify-center p-5 md:p-6 bg-white border border-surface-200 rounded-xl hover:border-surface-300 hover:shadow-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
                style={{ minHeight: '96px' }}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-700/80 group-hover:text-emerald-600 transition-colors duration-300" strokeWidth={2.5} />
                    <h3 className="text-sm md:text-base font-bold text-surface-900 group-hover:text-emerald-800 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-surface-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all duration-300 mt-1" strokeWidth={2.5} />
                </div>
                
                <p className="text-[11px] md:text-xs font-medium text-surface-500 pl-7 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

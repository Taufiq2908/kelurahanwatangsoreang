import { Component } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // In a real app, log to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/' // Force a clean reload to home
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-surface-200 shadow-xl text-center">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-100">
              <AlertTriangle className="w-8 h-8 text-rose-500" strokeWidth={2} />
            </div>
            
            <h1 className="text-2xl font-extrabold text-surface-900 mb-3 tracking-tight">
              Terjadi kendala saat memuat halaman.
            </h1>
            
            <p className="text-surface-600 mb-8 leading-relaxed font-medium">
              Silakan muat ulang halaman atau kembali ke Beranda.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-100 hover:bg-surface-200 text-surface-800 font-bold text-sm transition-colors"
              >
                <RefreshCcw className="w-4 h-4" /> Muat Ulang
              </button>
              
              <button 
                onClick={this.handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>

            {/* Development-only error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left bg-surface-100 p-4 rounded-xl overflow-auto text-xs max-h-48 border border-surface-200">
                <p className="font-bold text-rose-700 mb-2">{this.state.error.toString()}</p>
                <pre className="text-surface-600">{this.state.errorInfo?.componentStack}</pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

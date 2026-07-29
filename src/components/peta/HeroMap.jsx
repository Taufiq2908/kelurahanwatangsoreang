import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapPin, ArrowRight, Navigation } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet Default Icon Issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Custom Premium Marker
function CustomMarkerIcon(isSelected = false) {
  const hex = isSelected ? '#0f172a' : '#64748b' // surface-900 or surface-500
  const size = isSelected ? 40 : 32
  const anchor = isSelected ? 20 : 16
  const zIndexOffset = isSelected ? 1000 : 0
  
  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        background: ${hex}; 
        border: 3px solid white; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg) ${isSelected ? 'scale(1.05)' : 'scale(1)'}; 
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: ${zIndexOffset};
      ">
        <div style="
          width: ${isSelected ? '10px' : '8px'}; 
          height: ${isSelected ? '10px' : '8px'}; 
          background: white; 
          border-radius: 50%; 
          transition: all 0.3s ease;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [anchor, size],
    popupAnchor: [0, -size + 4]
  })
}

// Sub-component to gracefully fly to the selected location
function MapCenterer({ position, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { duration: 1.2, easeLinearity: 0.25 })
    }
  }, [position, zoom, map])
  return null
}

const getCoverImage = (imagesStr) => {
  try {
    const arr = JSON.parse(imagesStr || '[]')
    return arr.length > 0 ? arr[0] : null
  } catch { return null }
}

export default function HeroMap({ 
  locations = [], 
  selectedLocation = null, 
  onSelectLocation,
  categoriesData = [],
  defaultCenter = [-3.993, 119.633] 
}) {
  const mapRef = useRef(null)

  const getCatDetails = (catId) => (categoriesData || []).find(c => c.id === catId) || { name: 'Lainnya' }

  return (
    <div className="relative w-full h-[300px] md:h-[340px] z-0 overflow-hidden bg-surface-50 border border-surface-200 rounded-2xl shadow-sm">

      <MapContainer 
        center={defaultCenter} 
        zoom={14} 
        zoomControl={false}
        className="w-full h-full z-0"
        ref={mapRef}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <div className="absolute bottom-4 right-4 z-[1000]">
          <ZoomControl position="bottomright" />
        </div>

        {selectedLocation && (
          <MapCenterer 
            position={[parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude)]} 
            zoom={17}
          />
        )}

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={40}
          spiderfyOnMaxZoom={true}
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount()
            return L.divIcon({
              html: `<div class="w-9 h-9 bg-surface-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">${count}</div>`,
              className: 'bg-transparent border-none',
              iconSize: L.point(36, 36, true),
            })
          }}
        >
          {locations.map(loc => {
            const lat = parseFloat(loc.latitude)
            const lng = parseFloat(loc.longitude)
            if (isNaN(lat) || isNaN(lng)) return null
            
            const cat = getCatDetails(loc.category_id)
            const isSelected = selectedLocation?.id === loc.id
            const img = getCoverImage(loc.images)

            return (
              <Marker 
                key={loc.id} 
                position={[lat, lng]}
                icon={CustomMarkerIcon(isSelected)}
                eventHandlers={{
                  click: () => onSelectLocation(loc)
                }}
              >
                <Popup className="premium-popup" closeButton={false} offset={[0, isSelected ? -10 : -8]}>
                  <div className="w-[260px] p-0 flex flex-col">
                    {/* Photo Header */}
                    <div className="h-28 bg-surface-50 relative border-b border-surface-100 flex items-center justify-center overflow-hidden">
                      {img ? (
                        <img src={img} alt={loc.name} className="w-full h-full object-cover" />
                      ) : (
                        <MapPin className="w-8 h-8 text-surface-300" />
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-sm text-surface-700 border border-surface-200/50 shadow-sm">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                    
                    {/* Popup Body */}
                    <div className="p-4 bg-white flex flex-col gap-3">
                      <div>
                        <h3 className="font-bold text-surface-900 text-[15px] leading-snug mb-1">{loc.name}</h3>
                        <p className="text-surface-500 text-xs leading-relaxed line-clamp-2">
                          {loc.address}
                        </p>
                      </div>
                      
                      <div className="pt-2 mt-1 border-t border-surface-100">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-surface-50 hover:bg-surface-100 text-surface-700 border border-surface-200 hover:border-surface-300 text-[11px] font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          Petunjuk Arah
                          <ArrowRight className="w-3.5 h-3.5 text-surface-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Global CSS Overrides for Leaflet Popup & Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Premium Popup Styling - Matching Design System Tokens */
        .premium-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }
        .premium-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .premium-popup .leaflet-popup-tip-container {
          margin-top: -1px;
        }
        .premium-popup .leaflet-popup-tip {
          box-shadow: none;
          background: #ffffff;
          border-left: 1px solid #e2e8f0;
          border-top: 1px solid #e2e8f0;
        }
        
        /* Leaflet Overrides */
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;
          border-radius: 0.75rem !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background-color: white !important;
          color: #334155 !important;
          border-bottom-color: #f1f5f9 !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }
      `}} />
    </div>
  )
}

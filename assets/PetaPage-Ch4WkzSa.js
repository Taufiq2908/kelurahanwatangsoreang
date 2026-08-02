import{j as e,m as N}from"./vendor-motion-D9aiYoSW.js";import{r as m}from"./vendor-react-BMJIrySD.js";import{S as M}from"./SEO-Dnc9jKGQ.js";import{P as z}from"./PageHeader-DBOReMwN.js";import{S as P}from"./SearchBar-DkRLhpls.js";import{C as E}from"./CategoryFilter-D6lmqgEb.js";import{E as I}from"./EmptyState-DRYzHC-U.js";import{S as $}from"./Skeleton-CvMGqnSP.js";import{M as R,T as O,Z as U,i as _,a as D,P as A,L as h,u as F}from"./vendor-leaflet-9F9coWBi.js";import{o as w,A as k,O as K,Q as H}from"./vendor-icons-DdnRruJf.js";import{u as C}from"./useApiData-CyfBiVYF.js";import"./index-BTl98jW8.js";delete h.Icon.Default.prototype._getIconUrl;h.Icon.Default.mergeOptions({iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"});function Z(a=!1){const r=a?"#0f172a":"#64748b",s=a?40:32,d=a?20:16,p=a?1e3:0;return h.divIcon({className:"bg-transparent border-none",html:`
      <div style="
        width: ${s}px; 
        height: ${s}px; 
        background: ${r}; 
        border: 3px solid white; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg) ${a?"scale(1.05)":"scale(1)"}; 
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: ${p};
      ">
        <div style="
          width: ${a?"10px":"8px"}; 
          height: ${a?"10px":"8px"}; 
          background: white; 
          border-radius: 50%; 
          transition: all 0.3s ease;
        "></div>
      </div>
    `,iconSize:[s,s],iconAnchor:[d,s],popupAnchor:[0,-s+4]})}function W({position:a,zoom:r}){const s=F();return m.useEffect(()=>{a&&s.flyTo(a,r,{duration:1.2,easeLinearity:.25})},[a,r,s]),null}const B=a=>{try{const r=JSON.parse(a||"[]");return r.length>0?r[0]:null}catch{return null}};function J({locations:a=[],selectedLocation:r=null,onSelectLocation:s,categoriesData:d=[],defaultCenter:p=[-3.993,119.633]}){const v=m.useRef(null),g=o=>(d||[]).find(i=>i.id===o)||{name:"Lainnya"};return e.jsxs("div",{className:"relative w-full h-[300px] md:h-[340px] z-0 overflow-hidden bg-surface-50 border border-surface-200 rounded-2xl shadow-sm",children:[e.jsxs(R,{center:p,zoom:14,zoomControl:!1,className:"w-full h-full z-0",ref:v,scrollWheelZoom:!1,children:[e.jsx(O,{attribution:'© <a href="https://carto.com/attributions">CARTO</a>',url:"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"}),e.jsx("div",{className:"absolute bottom-4 right-4 z-[1000]",children:e.jsx(U,{position:"bottomright"})}),r&&e.jsx(W,{position:[parseFloat(r.latitude),parseFloat(r.longitude)],zoom:17}),e.jsx(_,{chunkedLoading:!0,maxClusterRadius:40,spiderfyOnMaxZoom:!0,iconCreateFunction:o=>{const i=o.getChildCount();return h.divIcon({html:`<div class="w-9 h-9 bg-surface-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">${i}</div>`,className:"bg-transparent border-none",iconSize:h.point(36,36,!0)})},children:a.map(o=>{const i=parseFloat(o.latitude),u=parseFloat(o.longitude);if(isNaN(i)||isNaN(u))return null;const b=g(o.category_id),x=r?.id===o.id,j=B(o.images);return e.jsx(D,{position:[i,u],icon:Z(x),eventHandlers:{click:()=>s(o)},children:e.jsx(A,{className:"premium-popup",closeButton:!1,offset:[0,x?-10:-8],children:e.jsxs("div",{className:"w-[260px] p-0 flex flex-col",children:[e.jsxs("div",{className:"h-28 bg-surface-50 relative border-b border-surface-100 flex items-center justify-center overflow-hidden",children:[j?e.jsx("img",{src:j,alt:o.name,className:"w-full h-full object-cover"}):e.jsx(w,{className:"w-8 h-8 text-surface-300"}),e.jsx("div",{className:"absolute top-3 left-3",children:e.jsx("span",{className:"px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-sm text-surface-700 border border-surface-200/50 shadow-sm",children:b.name})})]}),e.jsxs("div",{className:"p-4 bg-white flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold text-surface-900 text-[15px] leading-snug mb-1",children:o.name}),e.jsx("p",{className:"text-surface-500 text-xs leading-relaxed line-clamp-2",children:o.address})]}),e.jsx("div",{className:"pt-2 mt-1 border-t border-surface-100",children:e.jsxs("a",{href:`https://www.google.com/maps/dir/?api=1&destination=${i},${u}`,target:"_blank",rel:"noopener noreferrer",className:"w-full bg-surface-50 hover:bg-surface-100 text-surface-700 border border-surface-200 hover:border-surface-300 text-[11px] font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors",children:["Petunjuk Arah",e.jsx(k,{className:"w-3.5 h-3.5 text-surface-400"})]})})]})]})})},o.id)})})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function Q(){const{data:a,loading:r,error:s,refetch:d}=C("getPeta");return{locations:a||[],loading:r,error:s,refetch:d}}function ie(){const{locations:a,loading:r,error:s}=Q(),{data:d}=C("getPetaKategori"),[p,v]=m.useState(""),[g,o]=m.useState(""),[i,u]=m.useState("semua"),[b,x]=m.useState(null),j=m.useMemo(()=>{const t=d||[],n=new Set(a.map(l=>l.category_id)),c=t.filter(l=>n.has(l.id));return[{id:"semua",label:"Semua Lokasi"},...c.map(l=>({id:l.id,label:l.name}))]},[d,a]);m.useEffect(()=>{const t=setTimeout(()=>o(p),150);return()=>clearTimeout(t)},[p]);const f=m.useMemo(()=>a.filter(t=>{if(t.status&&String(t.status).toLowerCase()!=="publish")return!1;const n=i==="semua"||String(t.category_id)===String(i),c=g.toLowerCase(),l=!c||t.name&&String(t.name).toLowerCase().includes(c)||t.address&&String(t.address).toLowerCase().includes(c)||t.description&&String(t.description).toLowerCase().includes(c);return n&&l}).sort((t,n)=>t.featured==="TRUE"&&n.featured!=="TRUE"?-1:t.featured!=="TRUE"&&n.featured==="TRUE"?1:(parseInt(t.display_order)||0)-(parseInt(n.display_order)||0)),[a,i,g]),S=t=>(d||[]).find(n=>n.id===t)||{name:"Lainnya"},L=t=>{try{const n=JSON.parse(t||"[]");return n.length>0?n[0]:null}catch{return null}},T=t=>{x(t),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs("div",{className:"w-full bg-white",children:[e.jsx(M,{title:"Direktori Lokasi",description:"Temukan informasi alamat, layanan publik, dan UMKM di wilayah Kelurahan Watang Soreang.",path:"/peta"}),e.jsx(z,{title:"Direktori Lokasi",subtitle:"Temukan berbagai fasilitas publik, sekolah, kantor, hingga UMKM lokal di Kelurahan Watang Soreang.",icon:K}),e.jsx("section",{className:"pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50",children:e.jsx("div",{className:"container-editorial px-6 md:px-12",children:e.jsxs("div",{className:"max-w-6xl mx-auto flex flex-col",children:[e.jsx("div",{className:"mb-8 md:mb-10",children:e.jsx(J,{locations:f,selectedLocation:b,onSelectLocation:x,categoriesData:d})}),e.jsxs("div",{className:"mb-8 md:mb-10 space-y-5",children:[e.jsx(P,{value:p,onChange:v,placeholder:"Cari nama lokasi atau alamat..."}),e.jsx(E,{categories:j,active:i,onChange:u})]}),e.jsxs("div",{className:"flex flex-col",children:[r&&e.jsx($,{count:4}),!r&&s&&e.jsx("div",{className:"py-8 text-center text-red-500 bg-red-50 rounded-2xl border border-red-100",children:e.jsx("p",{className:"text-sm font-medium",children:s})}),!r&&!s&&f.length===0&&e.jsx(I,{title:"Tidak ada lokasi",description:"Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.",icon:H}),!r&&!s&&f.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsxs("span",{className:"text-[10px] md:text-xs font-bold uppercase tracking-widest text-surface-500",children:["Menampilkan ",f.length," Lokasi"]})}),e.jsx(N.div,{initial:{opacity:0},animate:{opacity:1},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:f.map(t=>{const n=S(t.category_id),c=L(t.images),l=b?.id===t.id;return e.jsx(N.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.3},children:e.jsxs("button",{onClick:()=>T(t),className:`text-left w-full h-full flex flex-col bg-white border ${l?"border-surface-400 shadow-md ring-1 ring-surface-400/20":"border-surface-200 hover:border-surface-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:outline-none"} rounded-2xl transition-all duration-300 group overflow-hidden`,children:[e.jsxs("div",{className:"relative w-full h-48 sm:h-44 shrink-0 bg-surface-50 border-b border-surface-100 flex items-center justify-center overflow-hidden",children:[c?e.jsx("img",{src:c,alt:t.name,className:"w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]",onError:y=>{y.target.style.display="none",y.target.nextSibling.style.display="flex"}}):null,e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",style:{display:c?"none":"flex"},children:e.jsx(w,{className:"w-10 h-10 text-surface-300 group-hover:text-emerald-500/40 transition-colors duration-300"})}),t.featured==="TRUE"&&e.jsx("div",{className:"absolute top-3 left-3 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100/50 shadow-sm",children:"TOP"})]}),e.jsxs("div",{className:"p-5 flex flex-col flex-1 min-w-0",children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-3",children:e.jsx("span",{className:"inline-block text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100/50",children:n.name})}),e.jsx("h3",{className:`text-base md:text-lg font-bold leading-snug line-clamp-2 transition-colors mb-2 ${l?"text-surface-900":"text-surface-900 group-hover:text-emerald-700"}`,children:t.name}),t.address&&e.jsxs("p",{className:"text-xs md:text-sm text-surface-500 mb-3 font-medium flex items-start gap-1.5",children:[e.jsx(w,{className:"w-3.5 h-3.5 shrink-0 mt-0.5 text-surface-400"}),e.jsx("span",{className:"line-clamp-2 leading-relaxed",children:t.address})]})]}),e.jsx("div",{className:"flex items-center justify-start mt-auto pt-4",children:e.jsxs("span",{className:`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${l?"text-surface-900":"text-surface-400 group-hover:text-emerald-600"}`,children:["Lihat di Peta ",e.jsx(k,{className:"w-3 h-3 group-hover:translate-x-0.5 transition-transform"})]})})]})]})},t.id)})})]})]})]})})})]})}export{ie as default};

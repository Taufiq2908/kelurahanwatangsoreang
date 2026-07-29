import { useApiData } from './useApiData'

export function useProfile() {
  const { data, loading, error, refetch } = useApiData('getProfilData')
  
  // getProfilData returns an array of objects or an object. Assuming it returns an array of key-value pairs
  // e.g. [{key: 'lurah_name', value: 'Reskianti, S.Sos'}, ...]
  // We'll map it to a flat object if it's an array for easier usage in components.
  
  let profileData = {}
  
  const formatPhone = (phone) => {
    if (!phone) return phone;
    let str = String(phone).trim();
    if (str.startsWith('8') && str.length > 5) {
      return '0' + str;
    }
    return str;
  };

  if (Array.isArray(data)) {
    data.forEach(item => {
      profileData[item.key] = item.value
    })
  } else if (data && typeof data === 'object') {
    profileData = {
      ...data,
      // Map English backend keys to Indonesian frontend keys
      lurah_name: data.leader_name,
      lurah_position: data.leader_position,
      sambutan: data.leader_sambutan,
      lurah_photo: data.leader_photoMeta ? data.leader_photoMeta.url : data.leader_photo,
      visi: data.profile_vision,
      misi: data.profile_mission,
      sejarah: data.profile_history,
      demografi_penduduk: data.stat_population,
      demografi_kk: data.stat_households,
      demografi_rt: data.stat_rt,
      demografi_rw: data.stat_rw,
      
      // HomePage mappings
      office_name: 'Kelurahan Watang Soreang', // Hardcoded as it's not in the API
      office_address: data.op_address,
      operational_hours: (data.op_days || '') + ', ' + (data.op_hours || ''),
      office_phone: formatPhone(data.op_phone),
      office_email: data.op_email,
      
      // Socials (Assuming they are added to DB later, otherwise they fall back gracefully)
      whatsapp: formatPhone(data.op_whatsapp || data.whatsapp),
      instagram: data.soc_instagram || data.instagram,
      facebook: data.soc_facebook || data.facebook,
      youtube: data.soc_youtube || data.youtube
    }
  }

  return { profile: profileData, loading, error, refetch }
}

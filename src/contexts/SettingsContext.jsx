import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings } from '@/services/googleSheetApi';

const SettingsContext = createContext(null);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        if (mounted) {
          const formatPhone = (phone) => {
            if (!phone) return phone;
            let str = String(phone).trim();
            // If it starts with '8' and is reasonably long, prepend '0'
            if (str.startsWith('8') && str.length > 5) {
              return '0' + str;
            }
            return str;
          };

          const mappedSettings = {
            general: {
              site_title: data?.site_title,
              site_description: data?.site_description,
              leader_name: data?.leader_name,
              leader_position: data?.leader_position,
              leader_photo: data?.leader_photo
            },
            contact: {
              address: data?.op_address,
              email: data?.op_email,
              phone: formatPhone(data?.op_phone),
              whatsapp: formatPhone(data?.op_whatsapp),
              op_hours: data?.op_days && data?.op_hours ? `${data.op_days}, Pukul ${data.op_hours}` : data?.op_hours
            },
            social: {
              facebook: data?.soc_facebook,
              instagram: data?.soc_instagram,
              youtube: data?.soc_youtube
            }
          };
          setSettings(mappedSettings);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.error('[SettingsContext] Error fetching settings:', err);
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchSettings();
    return () => { mounted = false; };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, error }}>
      {children}
    </SettingsContext.Provider>
  );
};

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function FarmMap({ farm, onClose }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!MAPBOX_TOKEN) {
        setStatus('error');
        setErrorMsg('Mapbox token not configured (VITE_MAPBOX_TOKEN missing in client/.env).');
        return;
      }

      const query = [farm.location?.village, farm.location?.district, farm.location?.state]
        .filter(Boolean)
        .join(', ');

      if (!query) {
        setStatus('error');
        setErrorMsg('This farm has no location set, so it cannot be shown on the map.');
        return;
      }

      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_TOKEN}&country=IN&limit=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
        const data = await res.json();
        const feature = data.features?.[0];
        if (!feature) throw new Error('Location not found on the map');
        if (cancelled) return;

        const [lng, lat] = feature.center;

        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapRef.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [lng, lat],
          zoom: 13,
        });
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        new mapboxgl.Marker({ color: '#22c55e' })
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setText(farm.name))
          .addTo(mapRef.current);

        setStatus('ready');
      } catch (err) {
        if (!cancelled) {
          setStatus('error');
          setErrorMsg(err.message || 'Could not load the map');
        }
      }
    }

    init();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-leaf-100 px-5 py-3">
          <h3 className="font-display font-semibold text-earth-900">🛰️ {farm.name} — Satellite View</h3>
          <button onClick={onClose} className="text-earth-500 hover:text-earth-800">
            ✕
          </button>
        </div>
        <div className="relative h-96 w-full bg-leaf-50">
          {status === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf-200 border-t-leaf-600" />
            </div>
          )}
          {status === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-earth-600">
              {errorMsg}
            </div>
          )}
          <div ref={mapContainer} className="h-full w-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

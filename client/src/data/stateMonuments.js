// Real monument photos + captions sourced from Wikipedia/Wikimedia Commons.
// The captured URLs below are small search-result thumbnails (~250-330px).
// Requesting a bigger size directly from the upload.wikimedia.org/thumb/ path is
// unreliable (fails for widths Wikimedia hasn't already cached for that file).
// Special:FilePath?width=N is the officially supported way to request a
// specific rendition and reliably generates/caches it server-side.
export function hiRes(url, width = 1000) {
  const match = url.match(/\/commons\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\//);
  if (!match) return url;
  // match[1] is already percent-encoded (it came straight from the URL path) — use as-is.
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${match[1]}?width=${width}`;
}

export const STATE_MONUMENTS = {
  Bihar: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/250px-Mahabodhitemple.jpg', name: 'Mahabodhi Temple', city: 'Bodh Gaya' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Nalanda_University_ruins.JPG/250px-Nalanda_University_ruins.JPG', name: 'Ruins of Nalanda Mahavihara', city: 'Nalanda' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Shershah_Tomb_Surrounded_by_lake_water.jpg/250px-Shershah_Tomb_Surrounded_by_lake_water.jpg', name: 'Sher Shah Suri Tomb', city: 'Sasaram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sun-temple_DEO_Aurangabad_Bihar%2CIndia.jpg/250px-Sun-temple_DEO_Aurangabad_Bihar%2CIndia.jpg', name: 'Deo Sun Temple', city: 'Aurangabad' },
  ],
  'Uttar Pradesh': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tajmahal_dec_2008.JPG/250px-Tajmahal_dec_2008.JPG', name: 'Taj Mahal', city: 'Agra' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Agra_03-2016_10_Agra_Fort.jpg/250px-Agra_03-2016_10_Agra_Fort.jpg', name: 'Agra Fort', city: 'Agra' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg/250px-Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg', name: 'Sarnath', city: 'Varanasi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/250px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg', name: 'Ahilya Ghat', city: 'Varanasi' },
  ],
  Punjab: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Hamandir_Sahib_%28Golden_Temple%29.jpg/250px-Hamandir_Sahib_%28Golden_Temple%29.jpg', name: 'Golden Temple (Harmandir Sahib)', city: 'Amritsar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Virasat-e-Khalsa-Roxy.jpg/250px-Virasat-e-Khalsa-Roxy.jpg', name: 'Virasat-e-Khalsa', city: 'Anandpur Sahib' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Toshakhana%2C_Gobindgarh_Fort%2C_Amritsar.jpg/250px-Toshakhana%2C_Gobindgarh_Fort%2C_Amritsar.jpg', name: 'Gobindgarh Fort', city: 'Amritsar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bird_-_Harike_Wetlands%2C_Punjab.jpg/250px-Bird_-_Harike_Wetlands%2C_Punjab.jpg', name: 'Harike Wetlands', city: 'Tarn Taran' },
  ],
  Maharashtra: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Panoramic_view_of_Taj_Palace_Hotel_and_Taj_Tower_with_the_iconic_Gateway_of_India_in_the_background.jpg/330px-Panoramic_view_of_Taj_Palace_Hotel_and_Taj_Tower_with_the_iconic_Gateway_of_India_in_the_background.jpg', name: 'Gateway of India', city: 'Mumbai' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Ajanta_Cave_Buddha.jpg/330px-Ajanta_Cave_Buddha.jpg', name: 'Ajanta Caves', city: 'Aurangabad' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ellora_Caves101.jpg/330px-Ellora_Caves101.jpg', name: 'Kailasa Temple, Ellora Caves', city: 'Aurangabad' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Shaniwarwada_gate.JPG/330px-Shaniwarwada_gate.JPG', name: 'Shaniwar Wada', city: 'Pune' },
  ],
  'Tamil Nadu': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/02Thanjavur_PeruvudaiyarKovil.jpg/250px-02Thanjavur_PeruvudaiyarKovil.jpg', name: 'Brihadisvara Temple', city: 'Thanjavur' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Mahabalipuram_pano2.jpg/250px-Mahabalipuram_pano2.jpg', name: 'Descent of the Ganges, Mahabalipuram', city: 'Mahabalipuram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Palani_Hill.JPG/250px-Palani_Hill.JPG', name: 'Palani Murugan Temple', city: 'Palani' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/%27Kodaikanal%27_Upper_Lake_View_Rural_Tamil_Nadu_India_November_2013.jpg/250px-%27Kodaikanal%27_Upper_Lake_View_Rural_Tamil_Nadu_India_November_2013.jpg', name: 'Kodaikanal Lake', city: 'Kodaikanal' },
  ],
  Rajasthan: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/250px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg', name: 'Hawa Mahal', city: 'Jaipur' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Amber_Fort_from_the_approach_road.jpg/250px-Amber_Fort_from_the_approach_road.jpg', name: 'Amber Fort', city: 'Jaipur' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mehrangarh_Fort.jpg/250px-Mehrangarh_Fort.jpg', name: 'Mehrangarh Fort', city: 'Jodhpur' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Udaipur%2C_India%2C_Lake_Palace_on_Lake_Pichola_2.jpg/250px-Udaipur%2C_India%2C_Lake_Palace_on_Lake_Pichola_2.jpg', name: 'Lake Palace', city: 'Udaipur' },
  ],
  'West Bengal': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/250px-Victoria_Memorial_situated_in_Kolkata.jpg', name: 'Victoria Memorial', city: 'Kolkata' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Darjeelinghimalayanrailway.jpg/250px-Darjeelinghimalayanrailway.jpg', name: 'Darjeeling Himalayan Railway', city: 'Darjeeling' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Maa_Bhavatarini%27s_face_%40_Dakshineshwar_Kali_Temple.JPG/250px-Maa_Bhavatarini%27s_face_%40_Dakshineshwar_Kali_Temple.JPG', name: 'Dakshineshwar Kali Temple', city: 'Kolkata' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Mandarmani_Sea_Beach.jpg/250px-Mandarmani_Sea_Beach.jpg', name: 'Mandarmani Sea Beach', city: 'Mandarmani' },
  ],
  Gujarat: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Statue_of_Unity%2C_as_dedicated_on_October_31%2C_2018_%28cropped%29.jpg/330px-Statue_of_Unity%2C_as_dedicated_on_October_31%2C_2018_%28cropped%29.jpg', name: 'Statue of Unity', city: 'Kevadia' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/View_of_Rani_ki_Vav%2C_Patan.jpg/330px-View_of_Rani_ki_Vav%2C_Patan.jpg', name: 'Rani ki Vav', city: 'Patan' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Somanath_mandir_%28cropped%29.jpg/330px-Somanath_mandir_%28cropped%29.jpg', name: 'Somnath Temple', city: 'Somnath' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GANDHI_ASHRAM_03.jpg/330px-GANDHI_ASHRAM_03.jpg', name: 'Sabarmati Ashram', city: 'Ahmedabad' },
  ],
  Karnataka: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Vittala_temple_charriot_and_gopuram%2C_Hampi.JPG/250px-Vittala_temple_charriot_and_gopuram%2C_Hampi.JPG', name: 'Ruins of Hampi', city: 'Hampi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/GolGumbaz2.jpg/250px-GolGumbaz2.jpg', name: 'Gol Gumbaz', city: 'Bijapur' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rear_View_of_Keshava_Temple_at_Somanathapura.jpg/250px-Rear_View_of_Keshava_Temple_at_Somanathapura.jpg', name: 'Chennakeshava Temple', city: 'Somanathapura' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Pattadakal_000.JPG/250px-Pattadakal_000.JPG', name: 'Temples of Pattadakal', city: 'Pattadakal' },
  ],
  'Madhya Pradesh': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Khajuraho.KandariyaMahadeva.jpg/250px-Khajuraho.KandariyaMahadeva.jpg', name: 'Kandariya Mahadeva Temple', city: 'Khajuraho' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Stupa_1%2C_Sanchi_02.jpg/250px-Stupa_1%2C_Sanchi_02.jpg', name: 'Sanchi Stupa', city: 'Sanchi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gwalior_Fort_front.jpg/250px-Gwalior_Fort_front.jpg', name: 'Gwalior Fort', city: 'Gwalior' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Orchha_Fort_complex_in_Orchha%2C_Madhya_Pradesh_35.jpg/250px-Orchha_Fort_complex_in_Orchha%2C_Madhya_Pradesh_35.jpg', name: 'Orchha Fort', city: 'Orchha' },
  ],
  Kerala: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kovalam_beach_trivandrum_kerala.jpg/500px-Kovalam_beach_trivandrum_kerala.jpg', name: 'Kovalam Beach', city: 'Thiruvananthapuram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Munnar_Top_station.jpg/250px-Munnar_Top_station.jpg', name: 'Munnar Hills', city: 'Munnar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Padmanabhaswamy_Temple_Trivandrum-_Morning_view.jpg/250px-Padmanabhaswamy_Temple_Trivandrum-_Morning_view.jpg', name: 'Padmanabhaswamy Temple', city: 'Thiruvananthapuram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/%E0%B4%95%E0%B5%86%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%B5%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BE-%E0%B4%95%E0%B5%81%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A8%E0%B4%BE%E0%B4%9F%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B5%81%E0%B4%96%E0%B4%AE%E0%B5%81%E0%B4%A6%E0%B5%8D%E0%B4%B0.jpg/250px-%E0%B4%95%E0%B5%86%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%81%E0%B4%B5%E0%B4%B3%E0%B5%8D%E0%B4%B3%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BE-%E0%B4%95%E0%B5%81%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A8%E0%B4%BE%E0%B4%9F%E0%B4%BF%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86_%E0%B4%AE%E0%B5%81%E0%B4%96%E0%B4%AE%E0%B5%81%E0%B4%A6%E0%B5%8D%E0%B4%B0.jpg', name: 'Backwater Houseboat', city: 'Alappuzha' },
  ],
  Assam: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kaziranga_Rhino.jpg/250px-Kaziranga_Rhino.jpg', name: 'Kaziranga National Park', city: 'Golaghat' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Kamakhya_Temple%2C_Guwahati.jpg/250px-Kamakhya_Temple%2C_Guwahati.jpg', name: 'Kamakhya Temple', city: 'Guwahati' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Majuli_Island.jpg/250px-Majuli_Island.jpg', name: 'Majuli River Island', city: 'Majuli' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Rang_Ghar_Pavilions%2C_Joysagar%2C_Sibsagar_02.jpg/250px-Rang_Ghar_Pavilions%2C_Joysagar%2C_Sibsagar_02.jpg', name: 'Rang Ghar', city: 'Sivasagar' },
  ],
  'Arunachal Pradesh': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Tawang_Monastery_second_largest_monastery_in_Asia_Arunachal_Pradesh_India.jpg/330px-Tawang_Monastery_second_largest_monastery_in_Asia_Arunachal_Pradesh_India.jpg', name: 'Tawang Monastery', city: 'Tawang' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Clean_ziro_green_ziro.jpeg/250px-Clean_ziro_green_ziro.jpeg', name: 'Ziro Valley', city: 'Ziro' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Mountains_of_Arunachal_Pradesh.jpg/250px-Mountains_of_Arunachal_Pradesh.jpg', name: 'Se La Pass', city: 'Tawang district' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Parshuram_Kund_.jpg/250px-Parshuram_Kund_.jpg', name: 'Parshuram Kund', city: 'Lohit district' },
  ],
  Manipur: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/The_Kangla_Gate.JPG/250px-The_Kangla_Gate.JPG', name: 'Kangla Fort Gate', city: 'Imphal' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/1_Loktak_Lake.jpg/250px-1_Loktak_Lake.jpg', name: 'Loktak Lake', city: 'Bishnupur' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/The_Dzukou_Valley.JPG/250px-The_Dzukou_Valley.JPG', name: 'Dzüko Valley', city: 'Senapati' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/St._Joseph%27s_Cathedral.jpg/250px-St._Joseph%27s_Cathedral.jpg', name: "St. Joseph's Cathedral", city: 'Imphal' },
  ],
  Meghalaya: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Single_Decker_Living_Root_Bridge_at_Riwai.jpg/500px-Single_Decker_Living_Root_Bridge_at_Riwai.jpg', name: 'Living Root Bridge', city: 'Riwai' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Cherrapunji.jpg/250px-Cherrapunji.jpg', name: 'Cherrapunji', city: 'Cherrapunji' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Aerial_view_of_Shillong_Meghalaya_India.jpg/250px-Aerial_view_of_Shillong_Meghalaya_India.jpg', name: 'Shillong City', city: 'Shillong' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Meghalaya_Abode_of_the_Clouds_India_Nature_in_Laitmawsiang_Landscape.jpg/250px-Meghalaya_Abode_of_the_Clouds_India_Nature_in_Laitmawsiang_Landscape.jpg', name: 'Laitmawsiang Landscape', city: 'Laitmawsiang' },
  ],
  Mizoram: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Solomon%27s_Temple_on_a_cloudy_day.jpg/250px-Solomon%27s_Temple_on_a_cloudy_day.jpg', name: "Solomon's Temple", city: 'Aizawl' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Tuirihiau_falls%2C_Mizoram_2.jpg/250px-Tuirihiau_falls%2C_Mizoram_2.jpg', name: 'Tuirihiau Falls', city: 'Mizoram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kawtchhuah_Ropui_Vangchhia_Mapuia_Hnamte_%282%29.JPG/250px-Kawtchhuah_Ropui_Vangchhia_Mapuia_Hnamte_%282%29.JPG', name: 'Vangchhia Necropolis', city: 'Vangchhia' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Mizo-Village-Zawlbuk.jpg/250px-Mizo-Village-Zawlbuk.jpg', name: 'Zawlbuk (Traditional Dormitory)', city: 'Rural Mizoram' },
  ],
  Nagaland: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Kohima_War_Cemetery%2C_Kohima%2C_Nagaland_%2889%29.jpeg/250px-Kohima_War_Cemetery%2C_Kohima%2C_Nagaland_%2889%29.jpeg', name: 'Kohima War Cemetery', city: 'Kohima' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/KOHIMA_CATHEDRAL.jpg/250px-KOHIMA_CATHEDRAL.jpg', name: 'Kohima Cathedral', city: 'Kohima' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Terrace_cultivation%2C_Pfutsero%2C_Nagaland_%286328134243%29.jpg/250px-Terrace_cultivation%2C_Pfutsero%2C_Nagaland_%286328134243%29.jpg', name: 'Terrace Farming', city: 'Pfütsero' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mokokchung.jpg/250px-Mokokchung.jpg', name: 'Mokokchung Town', city: 'Mokokchung' },
  ],
  Tripura: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Agartala_Palace%2C_Tripura.jpg/250px-Agartala_Palace%2C_Tripura.jpg', name: 'Ujjayanta Palace', city: 'Agartala' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Neermahal192.jpg/250px-Neermahal192.jpg', name: 'Neermahal Palace', city: 'Melaghar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Unakoti_5.jpg/250px-Unakoti_5.jpg', name: 'Unakoti Rock Carvings', city: 'Unakoti' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tripura_Sundari_Temple%2C_Udaipur.jpg/250px-Tripura_Sundari_Temple%2C_Udaipur.jpg', name: 'Tripura Sundari Temple', city: 'Udaipur, Tripura' },
  ],
  'Andhra Pradesh': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/250px-Tirumala_090615.jpg', name: 'Venkateswara Temple', city: 'Tirumala' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amaravathi_mahachaitya.jpg/250px-Amaravathi_mahachaitya.jpg', name: 'Ruins of Amaravati Stupa', city: 'Amaravati' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Borra_caves%2C_Viskhapatnam.jpg/330px-Borra_caves%2C_Viskhapatnam.jpg', name: 'Borra Caves', city: 'Visakhapatnam' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Foggy_mornings_of_Araku.jpg/250px-Foggy_mornings_of_Araku.jpg', name: 'Araku Valley', city: 'Araku' },
  ],
  Chhattisgarh: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Chitrakot_waterfalls.JPG/250px-Chitrakot_waterfalls.JPG', name: 'Chitrakot Waterfalls', city: 'Bastar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tirathgarh%2C_Jagdalpur%2C_Bastar.jpg/250px-Tirathgarh%2C_Jagdalpur%2C_Bastar.jpg', name: 'Tirathgarh Falls', city: 'Bastar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Ramgarh_Caves%2C_Surguja.jpg/250px-Ramgarh_Caves%2C_Surguja.jpg', name: 'Sita Bengra Cave, Ramgarh Hills', city: 'Surguja' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Baloda-bazar.jpg/250px-Baloda-bazar.jpg', name: 'Giraudhpuri Jaitkham', city: 'Baloda Bazar' },
  ],
  Goa: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/India_-_Goa_-_010_-_Touristy_Baga_Beach.jpg/250px-India_-_Goa_-_010_-_Touristy_Baga_Beach.jpg', name: 'Baga Beach', city: 'North Goa' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Fort_Aguada5.jpg/250px-Fort_Aguada5.jpg', name: 'Fort Aguada', city: 'North Goa' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bom_Jesus_Basilica%2C_Goa.JPG/250px-Bom_Jesus_Basilica%2C_Goa.JPG', name: 'Basilica of Bom Jesus', city: 'Old Goa' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Colva_Beach%2C_Goa_%282%29.jpg/250px-Colva_Beach%2C_Goa_%282%29.jpg', name: 'Colva Beach', city: 'South Goa' },
  ],
  Haryana: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Harsha_Ka_Tila.jpg/250px-Harsha_Ka_Tila.jpg', name: 'Harsha Ka Tila', city: 'Thanesar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kaushalya_Dam.jpg/250px-Kaushalya_Dam.jpg', name: 'Kaushalya Dam', city: 'Pinjore' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Green_farms_of_Jats_in_Haryana.jpg/250px-Green_farms_of_Jats_in_Haryana.jpg', name: 'Green Farms of Haryana', city: 'Rural Haryana' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mustard_field_near_Chandigarh.jpg/250px-Mustard_field_near_Chandigarh.jpg', name: 'Mustard Fields', city: 'Near Chandigarh' },
  ],
  'Himachal Pradesh': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Christ_Church%2C_Shimla.jpg/250px-Christ_Church%2C_Shimla.jpg', name: 'Christ Church', city: 'Shimla' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/HidambaDevi_temple_01.jpg/250px-HidambaDevi_temple_01.jpg', name: 'Hidimba Devi Temple', city: 'Manali' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mountains%2C_Manali%2C_Himachal_Pradesh.jpg/250px-Mountains%2C_Manali%2C_Himachal_Pradesh.jpg', name: 'Manali Mountains', city: 'Manali' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Parvati_River_in_Himachal_Pradesh_16.jpg/250px-Parvati_River_in_Himachal_Pradesh_16.jpg', name: 'Parvati River', city: 'Kullu' },
  ],
  Jharkhand: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Baba_Baidyanath_Jyotirlinga_Temple.jpg/250px-Baba_Baidyanath_Jyotirlinga_Temple.jpg', name: 'Baidyanath Temple', city: 'Deoghar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/17th_century_Jagannath_temple_Ranchi_Jharkhand_-_8.jpg/250px-17th_century_Jagannath_temple_Ranchi_Jharkhand_-_8.jpg', name: 'Jagannath Temple', city: 'Ranchi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lodh_Fall.png/250px-Lodh_Fall.png', name: 'Lodh Falls', city: 'Latehar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Pine_trees_of_Netarhat_Hill_station.jpg/250px-Pine_trees_of_Netarhat_Hill_station.jpg', name: 'Netarhat Hill Station', city: 'Netarhat' },
  ],
  Odisha: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Konark_Sun_Temple_Front_view.jpg/330px-Konark_Sun_Temple_Front_view.jpg', name: 'Konark Sun Temple', city: 'Konark' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Temple-Jagannath.jpg/330px-Temple-Jagannath.jpg', name: 'Jagannath Temple', city: 'Puri' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Boat_ride_on_Chilika_Lake%2C_Balugaon%2C_Odisha%2C_India.jpg/250px-Boat_ride_on_Chilika_Lake%2C_Balugaon%2C_Odisha%2C_India.jpg', name: 'Chilika Lake', city: 'Balugaon' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Puri_Sea_Beach_viewed_from_the_light_house.jpg/330px-Puri_Sea_Beach_viewed_from_the_light_house.jpg', name: 'Puri Beach', city: 'Puri' },
  ],
  Sikkim: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Guru_rimpoche_at_samdruptse.jpg/250px-Guru_rimpoche_at_samdruptse.jpg', name: 'Guru Rinpoche Statue', city: 'Samdruptse' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Nathu_La_-_Indo_China_Border.jpg/250px-Nathu_La_-_Indo_China_Border.jpg', name: 'Nathu La Pass', city: 'Indo-China Border' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kanchenjunga_waterfalls%2C_Pelling.jpg/250px-Kanchenjunga_waterfalls%2C_Pelling.jpg', name: 'Kanchenjunga Waterfalls', city: 'Pelling' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Riverteesta.jpg/250px-Riverteesta.jpg', name: 'Teesta River', city: 'Sikkim' },
  ],
  Telangana: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Charminar-Pride_of_Hyderabad.jpg/250px-Charminar-Pride_of_Hyderabad.jpg', name: 'Charminar', city: 'Hyderabad' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Warangal_fort.jpg/250px-Warangal_fort.jpg', name: 'Kakatiya Kala Thoranam', city: 'Warangal' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bhongir_Fort_-_Entrance_view.JPG/250px-Bhongir_Fort_-_Entrance_view.JPG', name: 'Bhongir Fort', city: 'Bhongir' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Birla_Temple_no_1.jpg/250px-Birla_Temple_no_1.jpg', name: 'Birla Mandir', city: 'Hyderabad' },
  ],
  Uttarakhand: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Kedarnath_2.jpg/250px-Kedarnath_2.jpg', name: 'Kedarnath Temple', city: 'Kedarnath' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Har_ki_pauri_panoramic_view1.jpg/500px-Har_ki_pauri_panoramic_view1.jpg', name: 'Har ki Pauri', city: 'Haridwar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Rishikesh_view_across_bridge.jpg/250px-Rishikesh_view_across_bridge.jpg', name: 'Lakshman Jhula', city: 'Rishikesh' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Nainital_lake_in_the_morning.jpg/250px-Nainital_lake_in_the_morning.jpg', name: 'Nainital Lake', city: 'Nainital' },
  ],
  'Andaman and Nicobar Islands': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/CellularJail_Wings.JPG/250px-CellularJail_Wings.JPG', name: 'Cellular Jail', city: 'Port Blair' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Andaman_ross_is.jpg/250px-Andaman_ross_is.jpg', name: 'Ross Island', city: 'Port Blair' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Havelock_Island_by_Vikramjit_Kakati.jpg/250px-Havelock_Island_by_Vikramjit_Kakati.jpg', name: 'Havelock Island', city: 'Havelock' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Gallows_on_Viper_Island.jpg/250px-Gallows_on_Viper_Island.jpg', name: 'Viper Island', city: 'Port Blair' },
  ],
  Chandigarh: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Nek_Chand_Garden_%286175284222%29.jpg/250px-Nek_Chand_Garden_%286175284222%29.jpg', name: 'Rock Garden', city: 'Chandigarh' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Pedalos_-_Sukhna_Lake_-_Chandigarh_2016-08-07_9003.JPG/250px-Pedalos_-_Sukhna_Lake_-_Chandigarh_2016-08-07_9003.JPG', name: 'Sukhna Lake', city: 'Chandigarh' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Chandigarh_High_Court.jpg/250px-Chandigarh_High_Court.jpg', name: 'Punjab and Haryana High Court', city: 'Chandigarh' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Fine_Arts_Museum%2C_Panjab_University.jpg/250px-Fine_Arts_Museum%2C_Panjab_University.jpg', name: 'Fine Arts Museum, Panjab University', city: 'Chandigarh' },
  ],
  'Dadra and Nagar Haveli and Daman and Diu': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Diu_Fortress%2C_seawall%2C_Nov._2005.jpg/250px-Diu_Fortress%2C_seawall%2C_Nov._2005.jpg', name: 'Diu Fortress', city: 'Diu' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Diu3.jpg/250px-Diu3.jpg', name: 'Diu Fortress Lighthouse', city: 'Diu' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Diu_Fortress_cannons%2C_Nov._2005-1.jpg/250px-Diu_Fortress_cannons%2C_Nov._2005-1.jpg', name: 'Diu Fortress Cannons', city: 'Diu' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Cannon_of_Suleyman_founded_by_Mohammed_ibn_Hamza_in_1530_1531_for_a_Turkish_invasion_of_India_taken_in_the_capture_of_Aden_in_1839_by_Cap_H_Smith_of_HMS_Volage_with_inscriptions.jpg/250px-thumbnail.jpg', name: 'Historic Ottoman Cannon', city: 'Diu' },
  ],
  Delhi: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Qminar.jpg/250px-Qminar.jpg', name: 'Qutub Minar', city: 'New Delhi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Delhi%2C_India%2C_Red_Fort_Facade.jpg/250px-Delhi%2C_India%2C_Red_Fort_Facade.jpg', name: 'Red Fort', city: 'New Delhi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Akshardham_Delhi.jpg/250px-Akshardham_Delhi.jpg', name: 'Akshardham Temple', city: 'New Delhi' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Jama_Masjid%2C_Delhi.jpg/250px-Jama_Masjid%2C_Delhi.jpg', name: 'Jama Masjid', city: 'New Delhi' },
  ],
  'Jammu and Kashmir': [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Dal_Lake%2C_Srinagar%2C_Jammu_and_Kashmir.jpg/250px-Dal_Lake%2C_Srinagar%2C_Jammu_and_Kashmir.jpg', name: 'Dal Lake Houseboats', city: 'Srinagar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/WLM%40J%26K-Pari_Mahal.jpg/250px-WLM%40J%26K-Pari_Mahal.jpg', name: 'Pari Mahal', city: 'Srinagar' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pahalgam_Valley.jpg/250px-Pahalgam_Valley.jpg', name: 'Lidder Valley', city: 'Pahalgam' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Kashmir_Spring.jpg/250px-Kashmir_Spring.jpg', name: 'Kashmir Valley in Spring', city: 'Kashmir Valley' },
  ],
  Ladakh: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Leh.palace.jpg/250px-Leh.palace.jpg', name: 'Leh Palace', city: 'Leh' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Farming_in_Leh_Valley%2C_Ladakh.jpg/250px-Farming_in_Leh_Valley%2C_Ladakh.jpg', name: 'Farming in Leh Valley', city: 'Leh' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Zanskar_padum_Padum.jpg/250px-Zanskar_padum_Padum.jpg', name: 'Zanskar Valley', city: 'Padum' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Lake_India.jpg/250px-Lake_India.jpg', name: 'Ladakh Landscape', city: 'Ladakh' },
  ],
  Lakshadweep: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/LakshadweepIsland.jpg/250px-LakshadweepIsland.jpg', name: 'Bangaram Atoll', city: 'Bangaram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Fishermen_at_Kavarathi%2C_Lakshadweep%2C_India_%28edit%29.jpg/250px-Fishermen_at_Kavarathi%2C_Lakshadweep%2C_India_%28edit%29.jpg', name: 'Fishermen at Kavaratti', city: 'Kavaratti' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bangaram_Island%2C_Lakshadweep_20160325-_DSC1780.jpg/250px-Bangaram_Island%2C_Lakshadweep_20160325-_DSC1780.jpg', name: 'Bangaram Island Beach', city: 'Bangaram' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/India_Tree.jpg/250px-India_Tree.jpg', name: 'Coconut Palms', city: 'Lakshadweep' },
  ],
  Puducherry: [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Long_exposure_shot_of_Beach_road_near_Pondicherry_harbour.jpg/250px-Long_exposure_shot_of_Beach_road_near_Pondicherry_harbour.jpg', name: 'Beach Road', city: 'Puducherry' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/%22White_Monument_at_Evening%22.jpg/250px-%22White_Monument_at_Evening%22.jpg', name: 'Aayi Mandapam, Bharathi Park', city: 'Puducherry' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/The_French_Consulate_building.JPG/250px-The_French_Consulate_building.JPG', name: 'French Consulate Building', city: 'Puducherry' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Puducherry_train_station.JPG/250px-Puducherry_train_station.JPG', name: 'Puducherry Railway Station', city: 'Puducherry' },
  ],
};

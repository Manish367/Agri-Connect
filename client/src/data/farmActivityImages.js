// General agricultural activity photography — sowing, irrigation, growing crops,
// harvesting — sourced from Unsplash, reused across states/seasons.
const url = (id) => `https://images.unsplash.com/${id}?w=500&q=70&auto=format&fit=crop`;

const IDS = [
  'photo-1574943320219-553eb213f72d',
  'photo-1624547481160-d564f43324f9',
  'photo-1696371269645-7297d31dd4d6',
  'photo-1532929900024-6413d2ed39c8',
  'photo-1622385161916-27f0c8746f4e',
  'photo-1709200305574-602261ab60f3',
  'photo-1709638554974-df40abe8daf1',
  'photo-1745850783543-a29c3f3869ee',
  'photo-1622932595076-94a9f993b969',
  'photo-1642863742910-9a8556b30ab7',
  'photo-1709200305031-77927de0f5cc',
  'photo-1578857827184-ca164c636f7c',
  'photo-1578945095743-f0761142ffad',
  'photo-1723585647220-731072d1c0c9',
];

// Deterministically slice out 4 distinct images per season so each season shows
// a different set without repeats across Kharif/Rabi/Zaid.
export function getSeasonImages(seasonIndex) {
  const start = (seasonIndex * 4) % IDS.length;
  const slice = [];
  for (let i = 0; i < 4; i++) {
    slice.push(IDS[(start + i) % IDS.length]);
  }
  return slice.map(url);
}

const IMAGE_IDS_ROW1 = [
  'photo-1560493676-04071c5f467b',
  'photo-1625246333195-78d9c38ad449',
  'photo-1563514227147-6d2ff665a6a0',
  'photo-1499529112087-3cb3b73cec95',
  'photo-1535379453347-1ffd615e2e08',
  'photo-1627920769541-daa658ed6b59',
];

const IMAGE_IDS_ROW2 = [
  'photo-1529313780224-1a12b68bed16',
  'photo-1615811361523-6bd03d7748e7',
  'photo-1508175688576-0c076b47b5b5',
  'photo-1586771107445-d3ca888129ff',
  'photo-1507662228758-08d030c4820b',
  'photo-1483871788521-4f224a86e166',
];

const IMAGE_IDS_ROW3 = [
  'photo-1574943320219-553eb213f72d',
  'photo-1624547481160-d564f43324f9',
  'photo-1696371269645-7297d31dd4d6',
  'photo-1532929900024-6413d2ed39c8',
  'photo-1622385161916-27f0c8746f4e',
  'photo-1709200305574-602261ab60f3',
];

const url = (id) => `https://images.unsplash.com/${id}?w=480&q=75&auto=format&fit=crop`;

function Row({ ids, direction }) {
  const images = [...ids, ...ids]; // duplicate for seamless loop
  return (
    <div
      className="flex w-max gap-4"
      style={{ animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} 32s linear infinite` }}
    >
      {images.map((id, i) => (
        <img
          key={`${id}-${i}`}
          src={url(id)}
          alt="Indian agriculture"
          loading="lazy"
          className="h-24 w-40 flex-shrink-0 rounded-2xl object-cover shadow-md sm:h-28 sm:w-48"
        />
      ))}
    </div>
  );
}

export default function FarmImageMarquee() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-leaf-100 bg-gradient-to-br from-leaf-50 to-sky-50 p-5 shadow-2xl sm:h-[480px]">
      <div className="flex h-full flex-col justify-center gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <Row ids={IMAGE_IDS_ROW1} direction="left" />
        <Row ids={IMAGE_IDS_ROW2} direction="right" />
        <Row ids={IMAGE_IDS_ROW3} direction="left" />
      </div>
    </div>
  );
}

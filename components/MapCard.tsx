import { ExternalIcon, MapPinIcon } from "@/components/icons";
import { mapsDirectionsUrl, mapsEmbedUrl, mapsPlaceUrl } from "@/lib/site";

// Rounded, on-brand map card. The iframe is lazy-loaded and responsive.
// `compact` uses a shorter 16:9 map + a tighter button row to reduce scroll.
export function MapCard({
  address,
  label,
  compact = false,
}: {
  address: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-clay bg-white shadow-[0_18px_40px_-18px_rgba(214,31,117,0.35)] ring-4 ring-blush/50">
      <div className={`relative w-full ${compact ? "aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/9]"}`}>
        <iframe
          title={`Map to ${label}`}
          src={mapsEmbedUrl(address)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className={`flex gap-2 ${compact ? "p-2.5" : "flex-col p-4 sm:flex-row"}`}>
        <a
          href={mapsDirectionsUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-rose-deep px-3 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
         <p className="text-white">
     
          Directions
         </p>
        </a>
        <a
          href={mapsPlaceUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label} in Google Maps`}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-lavender px-3 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <ExternalIcon width={16} height={16} />
          {compact ? "Open" : "Open in Google Maps"}
        </a>
      </div>
    </div>
  );
}

import bridge from "@/assets/ny-bridge.jpg.asset.json";
import nyStreet from "@/assets/ny-street.jpg.asset.json";
import nySkyline from "@/assets/ny-skyline.jpg.asset.json";
import london from "@/assets/london.jpg.asset.json";
import londonStreet from "@/assets/london-street.jpg.asset.json";
import londonRiver from "@/assets/london-river.jpg.asset.json";
import berlin from "@/assets/berlin.jpg.asset.json";
import lagos from "@/assets/lagos.jpg.asset.json";
import paris from "@/assets/paris.jpg.asset.json";
import toronto from "@/assets/toronto.jpg.asset.json";
import amsterdam from "@/assets/amsterdam.jpg.asset.json";
import tokyo from "@/assets/tokyo.jpg.asset.json";
import dubai from "@/assets/dubai.jpg.asset.json";
import sydney from "@/assets/sydney.jpg.asset.json";
import sanFrancisco from "@/assets/san-francisco.jpg.asset.json";
import cafe from "@/assets/cafe.jpg.asset.json";
import food from "@/assets/food.jpg.asset.json";
import fallback from "@/assets/fallback.jpg.asset.json";
import fallbackStreet from "@/assets/fallback-street.jpg.asset.json";
import panel from "@/assets/city-panel.jpg.asset.json";

export const CITY_PHOTOS: Record<string, string[]> = {
  "New York City": [bridge.url, nyStreet.url, nySkyline.url, panel.url],
  London: [london.url, londonStreet.url, londonRiver.url],
  Berlin: [berlin.url],
  Lagos: [lagos.url],
  Paris: [paris.url],
  Toronto: [toronto.url],
  Amsterdam: [amsterdam.url],
  Tokyo: [tokyo.url],
  Dubai: [dubai.url],
  Sydney: [sydney.url],
  "San Francisco": [sanFrancisco.url],
};
export const HERO_PHOTOS = [
  { src: fallbackStreet.url, label: "A new city awaits" },
  { src: londonStreet.url, label: "London" },
  { src: cafe.url, label: "A familiar ritual" },
  { src: lagos.url, label: "Lagos" },
  { src: amsterdam.url, label: "Amsterdam" },
];
export const DEFAULT_PANEL_PHOTO = fallbackStreet.url;
export const CAFE_PHOTO = cafe.url;
export const FOOD_PHOTO = food.url;
export function cityPhoto(city: string, index = 0): string {
  const images = CITY_PHOTOS[city] ?? [fallback.url, fallbackStreet.url];
  return images[index % images.length] ?? fallback.url;
}

export type NeighborhoodPhoto = {
  src: string;
  alt: string;
  source?: string;
  photographer?: string;
};
const NEIGHBORHOOD_PHOTOS: Record<string, NeighborhoodPhoto> = {};

export function neighborhoodPhoto(city: string, neighborhood: string, index = 0): NeighborhoodPhoto {
  return NEIGHBORHOOD_PHOTOS[`${city}:${neighborhood}`] ?? {
    src: cityPhoto(city, index),
    alt: `${city} city view`,
  };
}

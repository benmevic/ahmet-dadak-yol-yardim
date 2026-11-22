import type { ImageMetadata } from 'astro';
import maserati from '../assets/jobs/maserati.jpg';
import dolmusYagmur from '../assets/jobs/dolmus-yagmur.jpg';
import partner from '../assets/jobs/partner.jpg';
import dolmusCadde from '../assets/jobs/dolmus-cadde.jpg';
import sedanSokak from '../assets/jobs/sedan-sokak.jpg';
import sedanApartman from '../assets/jobs/sedan-apartman.jpg';
import caddyViraj from '../assets/jobs/caddy-viraj.jpg';
import parkBornova from '../assets/jobs/park-bornova.jpg';

export interface Job {
  id: string;
  image: ImageMetadata;
  vehicle: string;
  place: string;
  alt: string;
}

export const jobs: Job[] = [
  {
    id: 'maserati',
    image: maserati,
    vehicle: 'Maserati Ghibli',
    place: 'Otoyol, Çeşme yönü',
    alt: 'Otoyolda Maserati Ghibli, Dadak Yol Yardım çekicisinin kasasında.',
  },
  {
    id: 'dolmus-yagmur',
    image: dolmusYagmur,
    vehicle: 'Karşıyaka–Bornova dolmuşu',
    place: 'Yağmurlu bir akşam',
    alt: 'Yağmurlu akşamda Karşıyaka–Bornova dolmuşu çekiciye alınmış.',
  },
  {
    id: 'partner',
    image: partner,
    vehicle: 'Peugeot Partner',
    place: 'Köprü altı',
    alt: 'Köprü altında Peugeot Partner, çekicinin arkasında.',
  },
  {
    id: 'dolmus-cadde',
    image: dolmusCadde,
    vehicle: 'Dolmuş',
    place: 'Şehir merkezi',
    alt: 'Şehir merkezinde bir dolmuş çekiciyle taşınıyor.',
  },
  {
    id: 'sedan-sokak',
    image: sedanSokak,
    vehicle: 'Sedan',
    place: 'Mahalle arası, dar sokak',
    alt: 'Mahalle arasındaki dar sokakta gri bir sedan çekiciye alınmış.',
  },
  {
    id: 'sedan-apartman',
    image: sedanApartman,
    vehicle: 'Beyaz sedan',
    place: 'Apartman önü',
    alt: 'Apartman önünde beyaz bir sedan çekiciye alınmış.',
  },
  {
    id: 'caddy-viraj',
    image: caddyViraj,
    vehicle: 'Kırmızı hafif ticari',
    place: 'Virajlı yol',
    alt: 'Virajlı yolda kırmızı hafif ticari araç çekicide.',
  },
  {
    id: 'park-bornova',
    image: parkBornova,
    vehicle: 'Peugeot 206',
    place: 'Park Bornova önü',
    alt: 'Gün batımında Park Bornova önü: siyah Peugeot 206, Dadak Yol Yardım çekicisinin kasasına bağlanmış.',
  },
];

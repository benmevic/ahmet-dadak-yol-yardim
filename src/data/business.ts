export type District = 'Kemalpaşa' | 'Bornova';

export interface Address {
  district: District;
  street: string;
  city: 'İzmir';
  postalLine: string;
}

export interface Business {
  name: 'Ahmet Dadak Yol Yardım';
  phoneDisplay: string;
  phoneE164: '+905401230335';
  instagramHandle: 'dadakyolyardim';
  instagramUrl: string;
  addresses: Address[];
  hours: '7/24';
}

export const business: Business = {
  name: 'Ahmet Dadak Yol Yardım',
  phoneDisplay: '0540 123 0335',
  phoneE164: '+905401230335',
  instagramHandle: 'dadakyolyardim',
  instagramUrl: 'https://www.instagram.com/dadakyolyardim/',
  addresses: [
    {
      district: 'Kemalpaşa',
      street: 'Çambel Mah. 2005 Sk. No:4',
      city: 'İzmir',
      postalLine: 'Çambel Mah. 2005 Sk. No:4, Kemalpaşa / İzmir',
    },
    {
      district: 'Bornova',
      street: 'Mevlana Mah. 1713 Sk. No:3',
      city: 'İzmir',
      postalLine: 'Mevlana Mah. 1713 Sk. No:3, Bornova / İzmir',
    },
  ],
  hours: '7/24',
};

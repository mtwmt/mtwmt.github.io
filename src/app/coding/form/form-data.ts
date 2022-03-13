export interface formData {
  id: number;
  name: string;
  combination: Combination[];
}

export interface Combination {
  id: number;
  type: number;
  value: string;
}

export const data: formData = {
  id: 1451,
  name: 'placement',
  combination: [
    {
      id: 1451,
      type: 0,
      value: 'placement1',
    },
    {
      id: 1452,
      type: 3,
      value: 'placement2',
    },
    {
      id: 1453,
      type: 2,
      value: 'placement1',
    },
  ],
};

interface option {
  label: string;
  id: number;
}
export const options: option[] = [
  {
    label: 'apple',
    id: 0,
  },
  {
    label: 'kiwi',
    id: 1,
  },
  {
    label: 'banana',
    id: 2,
  },
  {
    label: 'cherry',
    id: 3,
  },
];

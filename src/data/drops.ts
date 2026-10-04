export interface TikTokDrop {
  id: string;
  title: string;
  quote: string;
  fullScript: string;
  creator: string;
  views: string;
  likesCount: number;
  commentsCount: string;
  sharesCount: string;
  audioTrack: string;
  category: 'Discipline' | 'Mindset' | 'Solitude' | 'Focus';
  date: string;
  posterBg: string;
}

export const TIKTOK_DROPS: TikTokDrop[] = [
  {
    id: 'drop-01',
    title: 'The Burden of Discipline',
    quote: 'The pain of discipline weighs ounces. The pain of regret weighs tons. Choose your burden.',
    fullScript: 'Every morning you wake up with two choices: pay the small price of showing up right now, or pay the devastating interest on regret twenty years from today. Do not trade your future for temporary comfort.',
    creator: '@nowastedpotential',
    views: '2.4M',
    likesCount: 342100,
    commentsCount: '4.8K',
    sharesCount: '28.1K',
    audioTrack: 'Original Sound — NO WASTED POTENTIAL',
    category: 'Discipline',
    date: '2 days ago',
    posterBg: 'linear-gradient(180deg, rgba(20,20,20,0.85) 0%, rgba(0,0,0,0.95) 100%)',
  },
  {
    id: 'drop-02',
    title: 'Nobody Is Coming To Save You',
    quote: 'Nobody is coming to push you. That is not bad news. That is your superpower.',
    fullScript: 'Stop waiting for an apology, a sign from the universe, or someone to hold your hand. The moment you realize your rescue is an inside job is the exact moment your real life begins.',
    creator: '@nowastedpotential',
    views: '1.8M',
    likesCount: 219400,
    commentsCount: '3.1K',
    sharesCount: '19.4K',
    audioTrack: 'Solitude in the Dark (Slowed + Reverb)',
    category: 'Solitude',
    date: '4 days ago',
    posterBg: 'linear-gradient(180deg, rgba(28,28,28,0.85) 0%, rgba(5,5,5,0.95) 100%)',
  },
  {
    id: 'drop-03',
    title: 'Let Results Speak',
    quote: 'They laugh at your silence until your results start speaking for you.',
    fullScript: 'Move in absolute silence. Do not broadcast your hunger to people who are satisfied with scraps. Build in the shadows until your reality denies their doubts.',
    creator: '@nowastedpotential',
    views: '890K',
    likesCount: 114200,
    commentsCount: '1.9K',
    sharesCount: '11.2K',
    audioTrack: 'Heavy Echo Monologue - Vol. 3',
    category: 'Focus',
    date: '6 days ago',
    posterBg: 'linear-gradient(180deg, rgba(18,18,18,0.85) 0%, rgba(0,0,0,0.98) 100%)',
  },
  {
    id: 'drop-04',
    title: 'Stop Negotiating With Laziness',
    quote: 'You promised yourself you would finish. Stop renegotiating the contract.',
    fullScript: 'When you set a standard and break it the moment your mood changes, you teach your subconscious that your word is worthless. Honor your commitments to yourself first.',
    creator: '@nowastedpotential',
    views: '3.1M',
    likesCount: 480900,
    commentsCount: '7.2K',
    sharesCount: '44.3K',
    audioTrack: 'Dark Cinematic Resonance — NWP',
    category: 'Discipline',
    date: '1 week ago',
    posterBg: 'linear-gradient(180deg, rgba(24,24,24,0.85) 0%, rgba(0,0,0,0.95) 100%)',
  },
  {
    id: 'drop-05',
    title: 'Forged In The Dark',
    quote: 'You are not behind. You are being forged in the dark for a weight you cannot yet see.',
    fullScript: 'The seasons where nothing seems to move are not wasted time. Roots grow deep in silence before the tree breaks through the earth. Trust the forging process.',
    creator: '@nowastedpotential',
    views: '1.2M',
    likesCount: 198000,
    commentsCount: '2.4K',
    sharesCount: '16.7K',
    audioTrack: 'Rain on Concrete & Piano Loop',
    category: 'Mindset',
    date: '1 week ago',
    posterBg: 'linear-gradient(180deg, rgba(15,15,15,0.85) 0%, rgba(0,0,0,0.96) 100%)',
  },
  {
    id: 'drop-06',
    title: 'One Year of Obsession',
    quote: 'One year of quiet, obsessive focus will change the trajectory of your entire life.',
    fullScript: 'Disappear for twelve months. Say no to cheap dopamine, gossip, and hollow validation. Come back unrecognizable, unshakeable, and undeniable.',
    creator: '@nowastedpotential',
    views: '2.9M',
    likesCount: 395000,
    commentsCount: '5.8K',
    sharesCount: '38.6K',
    audioTrack: 'Sub Bass Pulse & Spoken Word',
    category: 'Focus',
    date: '2 weeks ago',
    posterBg: 'linear-gradient(180deg, rgba(22,22,22,0.85) 0%, rgba(2,2,2,0.95) 100%)',
  },
];

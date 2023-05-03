import Heading from '@/components/Heading';

import PhotoCard from './PhotoCard';
import styles from './page.module.css';

import akihabara from './assets/akihabara.jpg';
import tokyoview from './assets/tokyoview.jpg';
import fuji from './assets/fuji.jpg';
import inari from './assets/inari.jpg';
import kinkakuji from './assets/kinkakuji.jpg';

export default function FancyCardsPage() {
  return (
    <>
      <Heading
        title="Photo Cards"
        text="These content cards are an experiment on using filters on a photo to achieve a dynamic background effect. The image used as the main element of the card is blurred and dimmed to act as a background."
      />

      <div className={styles.stack}>
        <PhotoCard
          src={akihabara}
          alt="Akihabara side street"
          title="Akihabara"
          description="Experience the vibrant energy of Tokyo's electronic town"
          action="Learn More"
          highlight="Tokyo JP"
        />

        <PhotoCard
          src={tokyoview}
          alt="View of tokyo from above. Mt. Fuji is visible on the horizon."
          title="Tokyo Skytree"
          description="Step into the clouds and see Tokyo like never before"
          action="Learn More"
          highlight="Tokyo JP"
        />

        <PhotoCard
          src={fuji}
          alt="View of Mt. Fuji"
          title="Mt. Fuji"
          description="Experience the awe-inspiring beauty of Japan's highest peak"
          action="Learn More"
          highlight="Fujinomiya JP"
        />

        <PhotoCard
          src={inari}
          alt="Fushimi Inari shrine 'toorii' gates"
          title="Fushimi Inari"
          description="Discover a unique blend of nature, spirituality, and culture"
          action="Learn More"
          highlight="Kyoto JP"
        />

        <PhotoCard
          src={kinkakuji}
          alt="Kinkaku-ji temple"
          title="Kinkaku-Ji"
          description="Take in the stunning views of the temple and its surroundings from various vantage points"
          action="Learn More"
          highlight="Kyoto JP"
        />
      </div>
    </>
  );
}

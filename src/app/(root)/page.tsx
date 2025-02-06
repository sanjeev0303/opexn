
import ExihibitionCard from '@/components/global/exihibition-card'
import { HeroSlider } from '@/components/global/home'
import React from 'react'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <section>
        <HeroSlider />
        <ExihibitionCard />
    </section>
  )
}

export default HomePage

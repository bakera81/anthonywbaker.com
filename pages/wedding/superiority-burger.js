import Layout from "../../components/wedding/layout";
import PageTitle from "../../components/wedding/pagetitle";
import P from '../../components/paragraph'
import Image from "next/image";
import Link from "next/link";

import burgerImg from '../../public/images/wedding/superiority_burger_2.webp'

export default function() {
  return(
    <Layout title='Rehearsal Dinner / cocktail party'>
      <PageTitle>"Rehearsal dinner" / cocktail party</PageTitle>
      <P>The "Rehearsal dinner" of sorts (it's a casual affair with bites and drinks) will be at <Link href='https://www.superiorityburger.com/'>Superiority Burger</Link> at 7:00pm on Wednesday, October 30. It's a kooky vegetarian diner in the East Village, so buckle up...</P>
      <P>It's also one of <Link href='https://www.nytimes.com/2023/06/27/dining/restaurant-review-superiority-burger-east-village.html'>the best restaraunts in NYC.</Link></P>
      <P>Fun fact: <Link href='https://www.nytimes.com/2024/03/14/style/superiority-burger-ashwin-deshmukh.html'>Wren's old boss is a high-profile con artist</Link> who used to do promotions for Superiorty Burger!</P>
      <Image
        src={burgerImg}
        width={600} 
      />
      </Layout>
  )
}
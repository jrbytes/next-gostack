import { GetServerSideProps } from 'next'
import math from '../lib/math'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string
  title: string
}

interface HomeProps {
  recommendedProducts: IProduct[]
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import('../lib/math')).default
    console.log(process.env.NEXT_PUBLIC_API_URL)
    alert(math.sum(3, 5))
  }

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}

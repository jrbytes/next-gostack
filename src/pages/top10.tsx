import { GetStaticProps } from "next"

interface IProducts {
  id: string
  title: string
}

interface Top10Props {
  products: IProducts[]
}

export default function Top10({ products }: Top10Props) {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        <ul>
          {products.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products')
  const products = await response.json()

  return {
    props: {
      products,
    },
    revalidate: 60
  }
}

import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import dummyImg from '../public/images/servicepic.jpg'

export default async function Home() {
const session = await  getServerSession(authOptions)
  return (
    <main>
     <h1>{session && session.user!.name}</h1>
     <Link href='/users'>User</Link>
     <ProductCard />
     {/* <Image src={dummyImg} alt="dummy"/> */}
     <Image src="https://bit.ly/react-cover" alt="dummy" fill style={{objectFit:'cover'}}/>
    </main>
  )
}

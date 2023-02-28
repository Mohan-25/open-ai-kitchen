import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [text, setText] = useState("");
  const [dish, setDish] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const dataRes = await axios.post("/api/chat", { dish: dish })
      if (dataRes.data.error) {
        throw new Error(dataRes.data)
      }
      setText(dataRes.data.aiResponse.choices[0].text)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setText('');
      alert("Something went wrong");
      console.log('error', error);
    }
  }
  return (
    <>
      <div className='flex flex-col items-center mt-8'>
        {/* <div>
          <img src="/logo.png" width={140} />
        </div> */}
        <div className='mt-6 text-center'>
          <h1 className='font-serif text-4xl'>
            Give me step by step Instructions to prepare
          </h1>
        </div>
        <div className='mt-6'>
          <input
            type="text"
            className='p-1 mr-2 text-3xl text-center border-b-2 border-slate-500 bg-amber-50'
            onChange={(e) => setDish(e.target.value)}
            value={dish}
          />
        </div>
        <div className='mt-6'>
          <button onClick={handleSubmit} className='p-2 bg-orange-400 rounded' disabled={isLoading}>Get me..</button>
        </div>
        {isLoading ? <h1>Loading...</h1> : <div className='w-2/3 p-4 mt-6 rounded-lg'>
          <p style={{ whiteSpace: "pre-line" }}>
            {text}
          </p>
        </div>}
      </div>
    </>
  )
}

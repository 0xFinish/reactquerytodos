import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TodosList } from '../components/TodosList'

export default function Home() {
  return (
    <TodosList></TodosList>
  )
}

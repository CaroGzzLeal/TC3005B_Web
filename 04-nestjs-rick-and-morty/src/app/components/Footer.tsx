'use client'
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import React from 'react'

export default function Footer() {
  return (
    <footer className=' p-4 text-center'>
      <p>Created by Carolina Gonzalez Leal ©</p>
      <p>Feel free to contact me:</p>
      <div className='flex justify-center space-x-4'>
        <a
          href='https://www.linkedin.com/in/carolina-nicole-gonzalez-leal-4b961524b/'
          className='text-blue-600'
        >
          <FaLinkedin size={24} />
        </a>
        <a href='https://github.com/CaroGzzLeal' className='text-gray-800'>
          <FaGithub size={24} />
        </a>
        <a
          href='https://www.instagram.com/caroleal03/'
          className='text-pink-600'
        >
          <FaInstagram size={24} />
        </a>
        <a
          href='https://wa.me/528117640863'
          className='flex items-center space-x-2 text-green-500'
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </footer>
  )
}

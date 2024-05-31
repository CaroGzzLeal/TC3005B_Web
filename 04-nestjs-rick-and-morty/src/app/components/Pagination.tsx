'use client'

import React from 'react'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className='my-4 flex justify-center'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='rounded bg-green-300 px-4 py-2 font-bold text-white hover:bg-green-500'
      >
        Previous
      </button>
      <span className='mx-1 px-4 py-2'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='rounded bg-green-300 px-4 py-2 font-bold text-white hover:bg-green-500'
      >
        Next
      </button>
    </div>
  )
}

'use client'
import { useState } from 'react'
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const years = Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear())

type OnDateChange = (date: { day: number; month: number; year: number }) => void

function Calendar({ onChange }: { onChange: OnDateChange }) {
  const [day, setDay] = useState(new Date().getDate())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  return (
    <div className='space-y-12'>
      <div className='border-b border-white/10 pb-12'>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12'>
          <div className='sm:col-span-3'>
            <label
              htmlFor='country'
              className='block text-sm font-medium leading-6 text-black'
            >
              Day
            </label>
            <div className='mt-2'>
              <select
                name='day'
                className='block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                onChange={(e) => {
                  onChange({ day: parseInt(e.target.value), month, year })
                  setDay(parseInt(e.target.value))
                }}
                value={day}
              >
                {days.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='sm:col-span-3'>
            <label
              htmlFor='country'
              className='block text-sm font-medium leading-6 text-black'
            >
              Month
            </label>
            <div className='mt-2'>
              <select
                name='month'
                className='block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                onChange={(e) => {
                  onChange({ day, month: parseInt(e.target.value), year })
                  setMonth(parseInt(e.target.value))
                }}
                value={month}
              >
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='sm:col-span-3'>
            <label
              htmlFor='country'
              className='block text-sm font-medium leading-6 text-black'
            >
              Year
            </label>
            <div className='mt-2'>
              <select
                name='day'
                className='block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                onChange={(e) => {
                  onChange({ day, month, year: parseInt(e.target.value) })
                  setYear(parseInt(e.target.value))
                }}
                value={year}
              >
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Calendar }

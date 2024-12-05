'use client'

export default function AuxiliaryItem({ item }) {
  return (
    <div className='p-3 flex bg-gray-100 p-2 rounded-md shadow-sm'>
      <div className='flex flex-col w-[130px] bg-orange-700 text-white p-1 rounded-md mr-4'>
        <span className='text-lg font-bold'>{item.firstName.slice(0, 14)}</span>
        <span className=''>{item.lastName.slice(0, 14)}</span>
      </div>
      <div className='flex justify-center items-center text-sm'>
        <span className='text-orange-700 p-1 rounded-md'>{item.email}</span>
      </div>
    </div>
  )
}
